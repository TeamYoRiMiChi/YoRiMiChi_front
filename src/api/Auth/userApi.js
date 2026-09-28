import axiosInstance from '../axiosInstance';
import { ENDPOINTS } from '../../config/api';

/**
 * User 도메인 API
 *
 * 서버 응답은 항상 ApiResponse 형태입니다.
 * { success: true, data: {...}, message: "..." }
 */

/** 내 정보 조회 (로그인 필요) */
export const getMyInfo = () => {
  return axiosInstance.get(`${ENDPOINTS.USERS}/me`);
};

/** Cognito 인증 완료 후 서비스 회원 정보를 생성 */
export const onboard = (data) => {
  return axiosInstance.post(`${ENDPOINTS.USERS}/onboarding`, data);
};
