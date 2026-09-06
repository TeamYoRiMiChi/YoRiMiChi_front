import axiosInstance from '../axiosInstance';
import { ENDPOINTS } from '../../config/api';

export const getOrders = () => {
  return axiosInstance.get(ENDPOINTS.ORDERHISTORY);
};
