import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../config/api';

/**
 * Cart 도메인 API
 *
 * 모두 로그인이 필요합니다.
 * 회원 식별은 서버가 토큰에서 꺼내므로 memberId를 보내지 않습니다.
 *
 * 응답은 항상 장바구니 전체 상태입니다.
 * 담기·삭제 후 따로 조회하지 않아도 되도록 서버가 최신 상태를 돌려줍니다.
 */

/** 내 장바구니 조회 */
export const getCart = () => {
  return axiosInstance.get(ENDPOINTS.CART);
};

/** 장바구니에 담기 */
export const addCartItem = (productId, quantity) => {
  return axiosInstance.post(`${ENDPOINTS.CART}/items`, { productId, quantity });
};

/** 수량 변경 */
export const updateCartItem = (cartItemId, quantity) => {
  return axiosInstance.patch(`${ENDPOINTS.CART}/items/${cartItemId}`, { quantity });
};

/** 한 건 삭제 */
export const removeCartItem = (cartItemId) => {
  return axiosInstance.delete(`${ENDPOINTS.CART}/items/${cartItemId}`);
};

/** 전체 비우기 */
export const clearCart = () => {
  return axiosInstance.delete(`${ENDPOINTS.CART}/items`);
};

/**
 * 서버 DTO → 화면용 형태
 * 가격 포맷 같은 보여주기용 가공을 여기서 합니다.
 */
export function toCartItemView(dto) {
  const price = Number(dto.priceJpy ?? 0);
  const subtotal = Number(dto.subtotal ?? 0);

  return {
    cartItemId: dto.cartItemId,
    productId: dto.productId,
    brand: dto.brand ?? '',
    name: dto.productName ?? '',
    thumbnailUrl: dto.thumbnailUrl ?? null,

    priceNum: price,
    price: `¥${price.toLocaleString()}`,
    subtotalNum: subtotal,
    subtotal: `¥${subtotal.toLocaleString()}`,

    quantity: dto.quantity ?? 1,
    stock: dto.stock ?? 0,
    available: dto.available ?? true,
  };
}
