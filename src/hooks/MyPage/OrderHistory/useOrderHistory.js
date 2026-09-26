import { useState, useEffect } from "react";
import { cancelOrder, getOrders } from "../../../api/MyPage/orderHistoryApi";
import usePagination from "../../common/usePagination";

export function useOrderHistory(fallback = []) {
  const [orders, setOrders] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const ORDER_PER_PAGE = 5;
  const pagination = usePagination(orders, ORDER_PER_PAGE, {
    scrollTo: ".mp_panel",
    serverTotal: totalOrders,
  });

  useEffect(() => {
    let ignore = false; // 컴포넌트가 사라진 뒤 setState 하는 걸 막습니다

    async function load() {
      setIsLoading(true);

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
            err.response?.data?.message ?? "オーダー記録の取得に失敗しました。",
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
  }, [pagination.currentPage, reloadTrigger]);

  const handleCancelOrder = async (orderId) => {
    if (cancellingOrderId !== null) {
      return false;
    }

    const confirmed = window.confirm("この注文をキャンセルしますか？");

    if (!confirmed) {
      return false;
    }

    setCancellingOrderId(orderId);

    try {
      const res = await cancelOrder(orderId);

      alert(res.data.message ?? "注文をキャンセルしました。");
      setReloadTrigger((current) => !current);

      return true;
    } catch (err) {
      alert(err.response?.data?.message ?? "注文のキャンセルに失敗しました。");

      return false;
    } finally {
      setCancellingOrderId(null);
    }
  };

  return {
    pagination,
    isLoading,
    error,
    cancellingOrderId,
    handleCancelOrder,
  };
}

export default useOrderHistory;
