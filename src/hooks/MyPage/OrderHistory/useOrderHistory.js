import { useState, useEffect } from 'react';
import { getOrders } from '../../../api/MyPage/orderHistoryApi';
import usePagination from '../../common/usePagination';

export function useOrderHistory(fallback = []) {
  const [orders, setOrders] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);

  const ORDER_PER_PAGE = 5;
  const pagination = usePagination(orders, ORDER_PER_PAGE, {
    scrollTo: '.mp_panel',
    serverTotal: totalOrders,
  });

  useEffect(() => {
    let ignore = false; // 컴포넌트가 사라진 뒤 setState 하는 걸 막습니다

    async function load() {
      try {
        const res = await getOrders({
          page: pagination.currentPage,
          size: ORDER_PER_PAGE,
        });

        // 서버 응답: { success, data: [...], message }
        const pageData = res.data.data ?? {};
        const list = pageData.content ?? [];

        if (!ignore) {
          setOrders(list);
          setTotalOrders(pageData.totalElements ?? 0);
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
  }, [pagination.currentPage]);

  return { pagination, isLoading, error };
}

export default useOrderHistory;
