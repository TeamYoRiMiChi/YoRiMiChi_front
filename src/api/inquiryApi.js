import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../config/api';

export const createInquiry = (request) => {
  return axiosInstance.post(ENDPOINTS.INQUIRIES, request);
};

export const getMyInquiries = () => {
  return axiosInstance.get(`${ENDPOINTS.INQUIRIES}/my`);
};

export const getAdminInquiries = () => {
  return axiosInstance.get(`${ENDPOINTS.INQUIRIES}/admin`);
};

export const answerInquiry = (inquiryId, answer) => {
  return axiosInstance.patch(`${ENDPOINTS.INQUIRIES}/admin/${inquiryId}/answer`, { answer });
};
