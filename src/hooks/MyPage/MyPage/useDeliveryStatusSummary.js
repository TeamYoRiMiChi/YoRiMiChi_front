import { useState, useEffect } from "react";
import { getDeliveryStatusSummary } from "../../../api/MyPage/deliveryStatusSummaryApi";

const EMPTY_SUMMARY = {
  preparingCount: 0,
  shippingCount: 0,
  deliveredCount: 0,
  cancelledCount: 0,
};

export function useDeliveryStatusSummary() {
  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await getDeliveryStatusSummary();

        if (!ignore) {
          setSummary({ ...EMPTY_SUMMARY, ...(res.data.data ?? {}) });
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message ?? "配送状況の取得に失敗しました。",
          );
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
  }, []);

  return { summary, isLoading, error };
}

export default useDeliveryStatusSummary;
