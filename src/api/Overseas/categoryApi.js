import axiosInstance from '../axiosInstance';
import { ENDPOINTS } from '../../config/api';

/**
 * Category 도메인 API
 *
 * 컴포넌트는 이 함수만 부르고,
 * 주소나 헤더 같은 통신 세부사항은 여기서만 다룹니다.
 */

/** 전체 카테고리 조회 */
export const getCategories = () => {
  return axiosInstance.get(ENDPOINTS.CATEGORIES);
};
