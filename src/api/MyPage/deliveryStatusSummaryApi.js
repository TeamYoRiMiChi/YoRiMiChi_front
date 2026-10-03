import axiosInstance from "../axiosInstance";
import { ENDPOINTS } from "../../config/api";

export const getDeliveryStatusSummary = () => {
  return axiosInstance.get(ENDPOINTS.DELIVERY_STATUS_SUMMARY);
};
