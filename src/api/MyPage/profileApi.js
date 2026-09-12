import axiosInstance from "../axiosInstance";
import { ENDPOINTS } from "../../config/api";

export const getProfile = () => {
  return axiosInstance.get(ENDPOINTS.PROFILE);
};

export const updateProfile = (data) => {
  return axiosInstance.patch(ENDPOINTS.PROFILE, data);
};
