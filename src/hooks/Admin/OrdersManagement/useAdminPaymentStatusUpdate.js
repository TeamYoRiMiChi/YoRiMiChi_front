import { useRef, useState } from "react";

import { updateAdminPaymentStatus } from "../../../api/Admin/OrdersManagement/adminOrderApi";

function useAdminPaymentStatusUpdate({ refetchOrders, refetchOrderSummary }) {
  const [isPaymentStatusUpdating, setIsPaymentStatusUpdating] = useState(false);

  const updatingRef = useRef(false);

  const handlePaymentStatusUpdate = async (orderId, paymentStatus) => {
    if (updatingRef.current) {
      return;
    }

    updatingRef.current = true;
    setIsPaymentStatusUpdating(true);

    try {
      const response = await updateAdminPaymentStatus(orderId, paymentStatus);

      await refetchOrders();
      await refetchOrderSummary();

      alert(response.data.message ?? "決済ステータスを変更しました。");
    } catch (err) {
      alert(
        err.response?.data?.message ?? "決済ステータスの変更に失敗しました。",
      );
    } finally {
      updatingRef.current = false;
      setIsPaymentStatusUpdating(false);
    }
  };

  return {
    handlePaymentStatusUpdate,
    isPaymentStatusUpdating,
  };
}

export default useAdminPaymentStatusUpdate;
