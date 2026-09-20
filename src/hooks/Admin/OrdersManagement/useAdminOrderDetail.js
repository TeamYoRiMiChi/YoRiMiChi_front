import { useState } from "react";

import { getAdminOrderDetail } from "../../../api/Admin/OrdersManagement/adminOrderApi";

function useAdminOrderDetail() {
  const [orderDetail, setOrderDetail] = useState(null);
  const [isOrderDetailLoading, setIsOrderDetailLoading] = useState(false);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

  const openOrderDetail = async (orderId) => {
    setIsOrderDetailOpen(true);
    setIsOrderDetailLoading(true);
    setOrderDetail(null);

    try {
      const response = await getAdminOrderDetail(orderId);

      setOrderDetail(response.data.data);
    } catch (err) {
      setIsOrderDetailOpen(false);

      alert(
        err.response?.data?.message ?? "주문 상세정보를 불러오지 못했습니다.",
      );
    } finally {
      setIsOrderDetailLoading(false);
    }
  };

  const closeOrderDetail = () => {
    setIsOrderDetailOpen(false);
    setOrderDetail(null);
  };

  return {
    orderDetail,
    isOrderDetailLoading,
    isOrderDetailOpen,
    openOrderDetail,
    closeOrderDetail,
  };
}

export default useAdminOrderDetail;
