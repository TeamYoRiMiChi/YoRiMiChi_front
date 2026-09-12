import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../config/api';

/**
 * Wishlist(찜) 도메인 API
 *
 * 모두 로그인이 필요합니다.
 * 회원 식별은 서버가 토큰에서 꺼내므로 memberId를 보내지 않습니다.
 *
 * 참고: /api/wishlist (GET) 은 마이페이지 전용 조회라 따로 있습니다.
 *       상품 화면에서 쓰는 토글용은 아래 경로를 씁니다.
 */

/**
 * 찜한 상품 id 목록
 *
 * 상품 목록·상세에서 하트가 켜졌는지만 판단하면 되므로
 * 상품 정보 없이 id 배열만 받아옵니다.
 */
export const getWishlist = () => {
  return axiosInstance.get(`${ENDPOINTS.WISHLIST}/ids`);
};

/** 찜 목록 (상품 정보 포함) */
export const getWishlistItems = () => {
  return axiosInstance.get(`${ENDPOINTS.WISHLIST}/products`);
};

/** 찜 추가 */
export const addWishlist = (productId) => {
  return axiosInstance.post(`${ENDPOINTS.WISHLIST}/products`, { productId });
};

/** 찜 삭제 */
export const removeWishlist = (productId) => {
  return axiosInstance.delete(`${ENDPOINTS.WISHLIST}/products/${productId}`);
};

/**
 * 서버 DTO → 화면용 형태
 * 가격 포맷 같은 보여주기용 가공
 */
export function toWishlistItemView(dto) {
  const price = Number(dto.priceJpy ?? 0);
  const originalPrice =
    dto.originalPriceJpy != null ? Number(dto.originalPriceJpy) : null;

  return {
    wishlistId: dto.wishlistId,
    productId: dto.productId,
    groupBuyId: dto.groupBuyId ?? null,
    groupBuyStatus: dto.groupBuyStatus ?? null,
    groupBuyClosed: dto.groupBuyClosed ?? false,
    productStatus: dto.productStatus ?? null,
    saleType: dto.saleType ?? (dto.groupBuyId != null ? 'GROUP_BUY' : 'OVERSEAS'),
    brand: dto.brand ?? '',
    name: dto.productName ?? '',
    thumbnailUrl: dto.thumbnailUrl ?? null,

    priceNum: price,
    price: `¥${price.toLocaleString()}`,
    originalPrice: originalPrice ? `¥${originalPrice.toLocaleString()}` : null,

    stock: dto.stock ?? 0,
    available: dto.available ?? true,
  };
}
