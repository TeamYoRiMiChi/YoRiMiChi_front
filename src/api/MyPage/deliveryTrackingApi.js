import axiosInstance from "../axiosInstance";
import { ENDPOINTS } from "../../config/api";

export const getDeliveryTrackings = ({ page = 1, size = 5 } = {}) => {
  return axiosInstance.get(ENDPOINTS.DELIVERYTRACKING, {
    params: { page, size },
  });
};
