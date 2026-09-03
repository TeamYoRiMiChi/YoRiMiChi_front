import axiosInstance from '../axiosInstance';
import { ENDPOINTS } from '../../config/api';

/**
 * User 도메인 API
 *
 * 서버 응답은 항상 ApiResponse 형태입니다.
 * { success: true, data: {...}, message: "..." }
 */

/** 회원가입 */
export const signup = (data) => {
  // data: { email, password, name, phone }
  return axiosInstance.post(ENDPOINTS.USERS, data);
};

/** 로그인 */
export const login = (data) => {
  // data: { email, password }
  return axiosInstance.post(ENDPOINTS.LOGIN, data);
};

/** 이메일 중복 확인 */
export const checkEmail = (email) => {
  return axiosInstance.get(`${ENDPOINTS.USERS}/check-email`, { params: { email } });
};

/** 내 정보 조회 (로그인 필요) */
export const getMyInfo = () => {
  return axiosInstance.get(`${ENDPOINTS.USERS}/me`);
};

/** 회원 단건 조회 */
export const getUser = (memberId) => {
  return axiosInstance.get(`${ENDPOINTS.USERS}/${memberId}`);
};
