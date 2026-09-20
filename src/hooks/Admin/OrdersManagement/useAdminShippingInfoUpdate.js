import { useRef, useState } from "react";

import { updateAdminShippingInfo } from "../../../api/Admin/OrdersManagement/adminOrderApi";

function useAdminShippingInfoUpdate({ refetchOrders }) {
  const [isShippingInfoUpdating, setIsShippingInfoUpdating] = useState(false);

  const updatingRef = useRef(false);

  const handleShippingInfoUpdate = async (orderId, shippingInfo) => {
    if (updatingRef.current) {
      return;
    }

    const carrier = shippingInfo.carrier.trim();
    const trackingNumber = shippingInfo.trackingNumber.trim();

    if (!carrier) {
      alert("配送会社を入力してください。");
      return;
    }

    if (!trackingNumber) {
      alert("送り状番号を入力してください。");
      return;
    }

    updatingRef.current = true;
    setIsShippingInfoUpdating(true);

    try {
      const response = await updateAdminShippingInfo(
        orderId,
        carrier,
        trackingNumber,
      );

      await refetchOrders();

      alert(response.data.message ?? "配送情報を登録しました。");
    } catch (err) {
      alert(err.response?.data?.message ?? "配送情報の登録に失敗しました。");
    } finally {
      updatingRef.current = false;
      setIsShippingInfoUpdating(false);
    }
  };

  return {
    handleShippingInfoUpdate,
    isShippingInfoUpdating,
  };
}

export default useAdminShippingInfoUpdate;
