import { useState, useEffect } from "react";
import { getDeliveryTrackings } from "../../../api/MyPage/deliveryTrackingApi";
import usePagination from "../../common/usePagination";

export function useDeliveryTracking(fallback = []) {
  const [deliveryTrackings, setDeliveryTrackings] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalDeliveryTrackings, setTotalDeliveryTrackings] = useState(0);

  const DELIVERY_PER_PAGE = 5;

  const pagination = usePagination(deliveryTrackings, DELIVERY_PER_PAGE, {
    scrollTo: ".mp_panel",
    serverTotal: totalDeliveryTrackings,
  });

  useEffect(() => {
    let ignore = false;

    async function load() {
      setIsLoading(true);

      try {
        const res = await getDeliveryTrackings({
          page: pagination.currentPage,
          size: DELIVERY_PER_PAGE,
        });

        const pageData = res.data.data ?? {};
        const list = pageData.content ?? [];

        if (!ignore) {
          setDeliveryTrackings(list);
          setTotalDeliveryTrackings(pageData.totalElements ?? 0);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message ?? "配送情報の取得に失敗しました。",
          );
          setDeliveryTrackings(fallback);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [pagination.currentPage]);

  return {
    pagination,
    isLoading,
    error,
  };
}

export default useDeliveryTracking;
