import axiosInstance from './axiosInstance';
import { USE_MOCK, ENDPOINTS, MOCK_DELAY } from '../config/api';

/**
 * Wishlist(찜) 도메인 API
 *
 * 로그인한 회원만 사용할 수 있습니다.
 * 토큰은 axiosInstance 인터셉터가 자동으로 붙여줍니다.
 */

/* 목 모드에서 쓰는 임시 저장소 (새로고침하면 초기화) */
const mockWishlist = new Set();

function mockRespond(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { success: true, data, message: null } });
    }, MOCK_DELAY);
  });
}

/** 내 찜 목록 조회 → productId 배열 */
export const getWishlist = () => {
  if (USE_MOCK) return mockRespond([...mockWishlist]);
  return axiosInstance.get(ENDPOINTS.WISHLIST);
};

/** 찜 추가 */
export const addWishlist = (productId) => {
  if (USE_MOCK) {
    mockWishlist.add(productId);
    return mockRespond({ productId });
  }
  return axiosInstance.post(ENDPOINTS.WISHLIST, { productId });
};

/** 찜 삭제 */
export const removeWishlist = (productId) => {
  if (USE_MOCK) {
    mockWishlist.delete(productId);
    return mockRespond({ productId });
  }
  return axiosInstance.delete(`${ENDPOINTS.WISHLIST}/${productId}`);
};
