import axiosInstance from "../../axiosInstance";
import { ENDPOINTS } from "../../../config/api";

const DEFAULT_PAGE_SIZE = 10;

export const getAdminOrders = ({
  keyword,
  orderType,
  orderStatus,
  shippingStatus,
  page = 1,
  size = DEFAULT_PAGE_SIZE,
} = {}) => {
  const params = {
    page,
    size,
  };

  if (keyword?.trim()) {
    params.keyword = keyword.trim();
  }

  if (orderType) {
    params.orderType = orderType;
  }

  if (orderStatus) {
    params.orderStatus = orderStatus;
  }

  if (shippingStatus) {
    params.shippingStatus = shippingStatus;
  }

  return axiosInstance.get(ENDPOINTS.ADMIN_ORDERS, {
    params,
  });
};

export const getAdminOrderSummary = () => {
  return axiosInstance.get(ENDPOINTS.ADMIN_ORDER_SUMMARY);
};

export const updateAdminOrderStatus = (orderId, orderStatus) => {
  return axiosInstance.patch(ENDPOINTS.ADMIN_ORDER_STATUS_UPDATE(orderId), {
    orderStatus,
  });
};

export const updateAdminPaymentStatus = (orderId, paymentStatus) => {
  return axiosInstance.patch(
    ENDPOINTS.ADMIN_ORDER_PAYMENT_STATUS_UPDATE(orderId),
    {
      paymentStatus,
    },
  );
};

export const updateAdminShippingInfo = (orderId, carrier, trackingNumber) => {
  return axiosInstance.patch(
    ENDPOINTS.ADMIN_ORDER_SHIPPING_INFO_UPDATE(orderId),
    {
      carrier,
      trackingNumber,
    },
  );
};

export const getAdminOrderDetail = (orderId) => {
  return axiosInstance.get(ENDPOINTS.ADMIN_ORDER_DETAIL(orderId));
};
