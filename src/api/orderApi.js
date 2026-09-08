import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../config/api';

/**
 * Order 도메인 API
 *
 * 모두 로그인이 필요합니다.
 * 금액은 서버가 계산해서 내려주므로 프론트가 보내지 않습니다.
 *
 * 주문 방식이 두 가지입니다.
 *   - 바로구매 : productId 지정 → 그 상품만
 *   - 장바구니 : productId 없음 → 담긴 상품 전체
 */

/** 주문서 데이터 (배송지 · 통관부호 · 상품 · 금액) */
export const getCheckout = ({ productId, quantity } = {}) => {
  return axiosInstance.get(`${ENDPOINTS.ORDERS}/checkout`, {
    params: {
      ...(productId ? { productId } : {}),
      ...(productId ? { quantity: quantity ?? 1 } : {}),
    },
  });
};

/**
 * 주문 생성
 *
 * @param {Object} payload
 * @param {number} payload.productId    바로구매 상품 (없으면 장바구니 주문)
 * @param {number} payload.quantity     바로구매 수량
 * @param {number} payload.addressId    저장된 배송지 (없으면 아래 직접 입력값 사용)
 * @param {Object} payload.manualAddress 직접 입력한 배송지
 * @param {string} payload.customsCode  통관고유부호 (회원 정보에 없을 때만)
 * @param {string} payload.deliveryMemo 배송 메모
 * @param {string} payload.paymentMethod 결제 수단
 */
export const createOrder = ({
  productId,
  quantity,
  addressId,
  manualAddress,
  customsCode,
  deliveryMemo,
  paymentMethod,
}) => {
  return axiosInstance.post(ENDPOINTS.ORDERS, {
    productId: productId ?? null,
    quantity: productId ? (quantity ?? 1) : null,

    addressId: addressId ?? null,
    receiverName: manualAddress?.receiverName ?? null,
    receiverPhone: manualAddress?.receiverPhone ?? null,
    postalCode: manualAddress?.postalCode ?? null,
    address: manualAddress?.address ?? null,
    addressDetail: manualAddress?.addressDetail ?? null,

    personalCustomsCode: customsCode ?? null,
    deliveryMemo: deliveryMemo ?? null,
    paymentMethod,
  });
};

/** 주문 상세 */
export const getOrder = (orderId) => {
  return axiosInstance.get(`${ENDPOINTS.ORDERS}/${orderId}`);
};

/**
 * 서버 응답 → 화면용 형태
 *
 * 숫자를 그대로 두고, 화면에서 toLocaleString()으로 포맷합니다.
 * 금액 계산이 필요한 곳이 있어서 문자열로 바꾸지 않습니다.
 */
export function toCheckoutView(dto) {
  return {
    address: dto.address
      ? {
          addressId: dto.address.addressId,
          receiverName: dto.address.receiverName,
          receiverPhone: dto.address.receiverPhone,
          postalCode: dto.address.postalCode,
          address: dto.address.address,
          addressDetail: dto.address.addressDetail ?? '',
        }
      : null,

    customsCode: dto.personalCustomsCode ?? null,

    items: (dto.items ?? []).map((it) => ({
      productId: it.productId,
      brand: it.brand ?? '',
      name: it.productName ?? '',
      thumbnailUrl: it.thumbnailUrl ?? null,
      priceKrw: Number(it.priceKrw ?? 0),
      priceJpy: Number(it.priceJpy ?? 0),
      quantity: it.quantity ?? 1,
      overseasShipping: Number(it.overseasShipping ?? 0),
      domesticShipping: Number(it.domesticShipping ?? 0),
    })),

    exchangeRate: Number(dto.exchangeRate ?? 0),

    /* 서버가 계산한 금액 */
    serverAmounts: {
      productAmount: Number(dto.productAmount ?? 0),
      overseasShipping: Number(dto.overseasShipping ?? 0),
      domesticShipping: Number(dto.domesticShipping ?? 0),
      customsDuty: Number(dto.customsDuty ?? 0),
      total: Number(dto.totalAmount ?? 0),
    },
  };
}
