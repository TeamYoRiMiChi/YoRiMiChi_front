import axiosInstance from "../axiosInstance";
import { ENDPOINTS } from "../../config/api";

export const getMyPageProfile = () => {
  return axiosInstance.get(ENDPOINTS.MYPAGE_PROFILE);
};
