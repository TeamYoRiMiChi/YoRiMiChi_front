import { useCallback, useEffect, useState } from "react";

import { getAdminOrderSummary } from "../../../api/Admin/OrdersManagement/adminOrderApi";

const initialSummary = {
  totalCount: 0,
  paidCount: 0,
  preparingCount: 0,
  shippingCount: 0,
  deliveredCount: 0,
  cancelledCount: 0,
  refundedCount: 0,
};

function useAdminOrderSummary() {
  const [summary, setSummary] = useState(initialSummary);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState(null);

  const fetchOrderSummary = useCallback(async () => {
    setIsSummaryLoading(true);
    setSummaryError(null);

    try {
      const response = await getAdminOrderSummary();

      setSummary(response.data.data ?? initialSummary);
    } catch (err) {
      setSummary(initialSummary);

      setSummaryError(
        err.response?.data?.message ?? "注文状況の取得に失敗しました。",
      );
    } finally {
      setIsSummaryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrderSummary();
  }, [fetchOrderSummary]);

  return {
    summary,
    isSummaryLoading,
    summaryError,
    refetchOrderSummary: fetchOrderSummary,
  };
}

export default useAdminOrderSummary;
