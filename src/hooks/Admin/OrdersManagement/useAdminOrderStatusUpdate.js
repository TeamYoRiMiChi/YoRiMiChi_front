import { useRef, useState } from "react";

import { updateAdminOrderStatus } from "../../../api/Admin/OrdersManagement/adminOrderApi";

function useAdminOrderStatusUpdate({ refetchOrders, refetchOrderSummary }) {
  const [isOrderStatusUpdating, setIsOrderStatusUpdating] = useState(false);

  const updatingRef = useRef(false);

  const handleOrderStatusUpdate = async (orderId, orderStatus) => {
    if (updatingRef.current) {
      return;
    }

    updatingRef.current = true;
    setIsOrderStatusUpdating(true);

    try {
      const response = await updateAdminOrderStatus(orderId, orderStatus);

      await refetchOrders();
      await refetchOrderSummary();

      alert(response.data.message ?? "注文ステータスを変更しました。");
    } catch (err) {
      alert(
        err.response?.data?.message ?? "注文ステータスの変更に失敗しました。",
      );
    } finally {
      updatingRef.current = false;
      setIsOrderStatusUpdating(false);
    }
  };

  return {
    handleOrderStatusUpdate,
    isOrderStatusUpdating,
  };
}

export default useAdminOrderStatusUpdate;
