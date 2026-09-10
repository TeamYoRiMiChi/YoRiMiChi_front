import axiosInstance from '../axiosInstance';
import { ENDPOINTS } from '../../config/api';

/* 로그인 회원의 마이페이지 장바구니 조회 */

export const getMypageCart = () => {
    return axiosInstance.get(ENDPOINTS.MYPAGE_CART);
};