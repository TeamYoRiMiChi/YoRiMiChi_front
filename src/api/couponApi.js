import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../config/api';

/**
 * Coupon(쿠폰) 도메인 API - 고객용
 *
 * 모두 로그인이 필요합니다. 회원 식별은 서버가 토큰에서 꺼내므로 memberId를 보내지 않습니다.
 * 관리자 쿠폰 관리 API는 api/Admin/CouponManagement/adminCouponApi.js를 따로 씁니다.
 *
 * 응답은 wishlistApi.js와 동일하게 data가 배열로 바로 오는 형태를 가정합니다.
 * (목록이 많지 않은 도메인이라 페이징 없이 전체를 내려준다고 가정)
 */

/** 내가 보유한 쿠폰 전체 (사용 가능 / 사용 완료 / 만료 포함) */
export const getMyCoupons = () => {
  return axiosInstance.get(ENDPOINTS.MY_COUPONS);
};

/** 지금 받을 수 있는 이벤트 쿠폰 목록 (아직 발급받지 않은 것만) */
export const getClaimableCoupons = () => {
  return axiosInstance.get(ENDPOINTS.CLAIMABLE_COUPONS);
};

/** 이벤트 쿠폰 받기 (회원이 스스로 발급받음) */
export const claimCoupon = (couponId) => {
  return axiosInstance.post(ENDPOINTS.COUPON_CLAIM(couponId));
};

/** 서버 DTO → 화면용 형태 (보유 쿠폰) */
export function toMyCouponView(dto) {
  return {
    memberCouponId: dto.memberCouponId,
    couponId: dto.couponId,
    couponName: dto.couponName ?? '',
    couponCode: dto.couponCode ?? '',
    discountType: dto.discountType,
    discountValue: Number(dto.discountValue ?? 0),
    minOrderAmount: Number(dto.minOrderAmount ?? 0),
    maxDiscountAmount: Number(dto.maxDiscountAmount ?? 0),
    validTo: dto.validTo,
    status: dto.status, // AVAILABLE | USED | EXPIRED
  };
}

/** 서버 DTO → 화면용 형태 (받을 수 있는 이벤트 쿠폰) */
export function toClaimableCouponView(dto) {
  return {
    couponId: dto.couponId,
    couponName: dto.couponName ?? '',
    discountType: dto.discountType,
    discountValue: Number(dto.discountValue ?? 0),
    minOrderAmount: Number(dto.minOrderAmount ?? 0),
    maxDiscountAmount: Number(dto.maxDiscountAmount ?? 0),
    validTo: dto.validTo,
  };
}
