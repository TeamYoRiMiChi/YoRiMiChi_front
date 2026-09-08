import axiosInstance from '../axiosInstance';
import { ENDPOINTS } from '../../config/api';

export const getOrderDetail = (orderId) => {
  return axiosInstance.get(ENDPOINTS.ORDERDETAIL(orderId));
};
