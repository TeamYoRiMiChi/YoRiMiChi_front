import axiosInstance from "../axiosInstance";
import { ENDPOINTS } from "../../config/api";

export const getOrders = ({ page = 1, size = 5 } = {}) => {
  return axiosInstance.get(ENDPOINTS.ORDERHISTORY, {
    params: { page, size },
  });
};

export const cancelOrder = (orderId) => {
  return axiosInstance.patch(ENDPOINTS.ORDERCANCEL(orderId));
};
