import { useState, useEffect } from 'react';
import { getOrderDetail } from '../../../api/MyPage/orderDetailApi';

export function useOrderDetail(orderId) {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // 컴포넌트가 사라진 뒤 setState 하는 걸 막습니다

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getOrderDetail(orderId);

        // 서버 응답: { success, data: [...], message }
        const view = res.data.data ?? {};

        if (!ignore) {
          setDetail(view);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message ?? '注文詳細の取得に失敗しました。',
          );
          setDetail(null); // 실패해도 화면은 보이도록
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
  }, [orderId]);

  return { detail, isLoading, error };
}
