import axiosInstance from "../../axiosInstance";
import { ENDPOINTS } from "../../../config/api";

/**
 * 관리자 - 쿠폰 관리 API
 *
 * 백엔드 "관리자 쿠폰 패키지"(컨트롤러/서비스/DTO/엔티티/레파지토리/매퍼-MyBatis)와
 * 연결되는 자리입니다. 엔드포인트 경로는 config/api.js의 ENDPOINTS에서
 * 한 곳에서만 관리하므로, 실제 백엔드 경로가 다르면 그 파일만 고치면 됩니다.
 *
 * 서버 응답 형태 (다른 도메인과 동일한 공통 래퍼를 따른다고 가정합니다):
 * {
 *   success: true,
 *   data: {
 *     content: [ ...쿠폰/회원쿠폰 배열 ],
 *     page: 1,
 *     size: 8,
 *     totalElements: 21,
 *     totalPages: 3,
 *     first: true,
 *     last: false
 *   }
 * }
 *
 * 페이지 번호는 다른 도메인(overseasProductApi 등)과 동일하게 1부터 시작합니다.
 */

const DEFAULT_PAGE_SIZE = 8;

/** 쿠폰 목록 조회 파라미터 생성 */
function buildCouponParams({
  keyword,
  discountType,
  status,
  page = 1,
  size = DEFAULT_PAGE_SIZE,
} = {}) {
  return {
    ...(keyword?.trim() ? { keyword: keyword.trim() } : {}),
    ...(discountType ? { discountType } : {}),
    ...(status ? { status } : {}),
    page,
    size,
  };
}

/** 회원쿠폰(발급 내역) 목록 조회 파라미터 생성 */
function buildMemberCouponParams({
  keyword,
  status,
  page = 1,
  size = DEFAULT_PAGE_SIZE,
} = {}) {
  return {
    ...(keyword?.trim() ? { keyword: keyword.trim() } : {}),
    ...(status ? { status } : {}),
    page,
    size,
  };
}

/** 쿠폰 목록 조회 (검색어 · 할인방식 · 상태 · 페이징) */
export const getAdminCoupons = (params = {}) => {
  return axiosInstance.get(ENDPOINTS.ADMIN_COUPONS, {
    params: buildCouponParams(params),
  });
};

/** 회원쿠폰(발급 내역) 목록 조회 (검색어 · 상태 · 페이징) */
export const getAdminMemberCoupons = (params = {}) => {
  return axiosInstance.get(ENDPOINTS.ADMIN_MEMBER_COUPONS, {
    params: buildMemberCouponParams(params),
  });
};

/** 쿠폰 요약 통계 (전체 / 사용가능 / 만료 / 회원 발급 건수) */
export const getAdminCouponSummary = () => {
  return axiosInstance.get(ENDPOINTS.ADMIN_COUPON_SUMMARY);
};

/**
 * 쿠폰 등록
 *
 * @param {Object} payload
 * @param {string} payload.couponCode
 * @param {string} payload.couponName
 * @param {"PERCENT"|"FIXED"} payload.discountType
 * @param {number} payload.discountValue
 * @param {number} payload.minOrderAmount
 * @param {number} payload.maxDiscountAmount
 * @param {"AUTO"|"MANUAL"|"EVENT"} payload.issueType
 * @param {string} payload.validFrom  ISO 문자열 (예: 2026-09-01T00:00:00)
 * @param {string} payload.validTo    ISO 문자열 (예: 2026-09-30T23:59:59)
 * @param {number} payload.usageLimit
 */
export const createAdminCoupon = (payload) => {
  return axiosInstance.post(ENDPOINTS.ADMIN_COUPONS, {
    couponCode: payload.couponCode,
    couponName: payload.couponName,
    discountType: payload.discountType,
    discountValue: Number(payload.discountValue),
    minOrderAmount: Number(payload.minOrderAmount || 0),
    maxDiscountAmount: Number(payload.maxDiscountAmount || 0),
    issueType: payload.issueType,
    validFrom: payload.validFrom,
    validTo: payload.validTo,
    usageLimit: Number(payload.usageLimit),
  });
};

/**
 * 쿠폰 수동 발급 (관리자가 특정 회원 또는 전체 회원에게 지급)
 *
 * @param {number} couponId
 * @param {Object} payload
 * @param {string[]} [payload.emails]    발급 대상 회원 이메일 목록 (issueToAll이 false일 때)
 * @param {boolean} [payload.issueToAll] true면 전체 회원에게 발급 (emails 무시)
 */
export const issueAdminCoupon = (couponId, payload = {}) => {
  return axiosInstance.post(ENDPOINTS.ADMIN_COUPON_ISSUE(couponId), {
    emails: payload.issueToAll ? null : (payload.emails ?? []),
    issueToAll: payload.issueToAll ?? false,
  });
};

/**
 * 쿠폰 중지 (삭제 대신 status만 STOPPED로 변경 — 이미 발급된 내역은 그대로 유지됨)
 *
 * @param {number} couponId
 */
export const stopAdminCoupon = (couponId) => {
  return axiosInstance.post(ENDPOINTS.ADMIN_COUPON_STOP(couponId));
};

/** 서버 DTO → 화면에서 쓰는 형태 (쿠폰) */
export function toAdminCouponView(dto) {
  return {
    couponId: dto.couponId,
    couponCode: dto.couponCode ?? "",
    couponName: dto.couponName ?? "",
    discountType: dto.discountType,
    discountValue: Number(dto.discountValue ?? 0),
    minOrderAmount: Number(dto.minOrderAmount ?? 0),
    maxDiscountAmount: Number(dto.maxDiscountAmount ?? 0),
    issueType: dto.issueType,
    validFrom: dto.validFrom,
    validTo: dto.validTo,
    // usageLimit이 null이면 무제한 쿠폰 — 0으로 바꿔버리면 "0개 한도"처럼 보여서 null을 그대로 둡니다.
    usageLimit: dto.usageLimit != null ? Number(dto.usageLimit) : null,
    issuedCount: Number(dto.issuedCount ?? 0),
    status: dto.status,
  };
}

/**
 * 서버 DTO → 화면에서 쓰는 형태 (회원쿠폰)
 *
 * 회원쿠폰(MEMBER_COUPON) 테이블 자체에는 쿠폰명/코드가 없으므로,
 * 목록 화면에서 매번 따로 조회하지 않도록 백엔드가 COUPON과 조인해서
 * couponName / couponCode까지 함께 내려준다고 가정합니다.
 */
export function toAdminMemberCouponView(dto) {
  return {
    memberCouponId: dto.memberCouponId,
    couponId: dto.couponId,
    couponName: dto.couponName ?? null,
    couponCode: dto.couponCode ?? null,
    memberId: dto.memberId,
    orderId: dto.orderId ?? null,
    issuedAt: dto.issuedAt,
    usedAt: dto.usedAt ?? null,
    status: dto.status,
  };
}
