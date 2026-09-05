import { useState, useEffect } from 'react';
import { getOrders } from '../../../api/MyPage/orderHistoryApi';

export function useOrderHistory(fallback = []) {
  const [orders, setOrders] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // 컴포넌트가 사라진 뒤 setState 하는 걸 막습니다

    async function load() {
      try {
        const res = await getOrders();

        // 서버 응답: { success, data: [...], message }
        const list = res.data.data ?? [];

        // DB 값 + 화면용 아이콘을 합칩니다
        const withIcons = list.map((c) => ({
          order_id: c.order_id,
          member_id: c.member_id,
          group_buy_id: c.group_buy_id,
          order_number: c.order_number,
          order_type: c.order_type,
          applied_exchange_rate: c.applied_exchange_rate,
          product_amount: c.product_amount,
          shipping_fee: c.shipping_fee,
          customs_duty: c.customs_duty,
          total_amount: c.total_amount,
          order_status: c.order_status,
        }));

        if (!ignore) {
          setOrders(withIcons);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message ?? 'オーダー記録の取得に失敗しました。',
          );
          setOrders(fallback); // 실패해도 화면은 보이도록
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { orders, isLoading, error };
}

export default useOrderHistory;
