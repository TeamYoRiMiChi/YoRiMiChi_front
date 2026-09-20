/**
 * API 공통 설정
 */

/* API 엔드포인트 (백엔드 명세와 맞춰서 관리) */
export const ENDPOINTS = {
  // 회원
  USERS: "/users",
  LOGIN: "/users/login",

  // 상품
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  GB_CATEGORIES: "/gb-categories",
  GROUP_BUYS: "/group-buys",

  // 찜
  WISHLIST: "/wishlist",

  // 장바구니
  CART: "/cart",
  MYPAGE_CART: "/mypage/cart",

  // 주문
  ORDERS: "/orders",

  // 1:1 문의
  INQUIRIES: "/inquiries",

  // 주문 내역
  ORDERHISTORY: "/orderhistory",
  ORDERDETAIL: (orderId) => `/orderhistory/${orderId}`,

  PROFILE: "/myprofile",
  PROFILE_WITHDRAWAL: "/myprofile/withdrawal",
  /**
   * 관리자 - 쿠폰
   *
   * 백엔드에 관리자 쿠폰 패키지(컨트롤러/서비스/DTO/엔티티/레파지토리/매퍼)가
   * 아직 구현되지 않아 임시로 정한 경로입니다.
   * 실제 구현 시 경로가 다르면 이 파일만 고치면 됩니다.
   */
  ADMIN_COUPONS: "/admin/coupons",
  ADMIN_COUPON: (couponId) => `/admin/coupons/${couponId}`,
  ADMIN_COUPON_SUMMARY: "/admin/coupons/summary",
  ADMIN_COUPON_ISSUE: (couponId) => `/admin/coupons/${couponId}/issue`,
  ADMIN_COUPON_STOP: (couponId) => `/admin/coupons/${couponId}/stop`,
  ADMIN_MEMBER_COUPONS: "/admin/member-coupons",

  /**
   * 쿠폰 (고객)
   *
   * 백엔드: domain/mypage/controller/CouponController.java
   */
  MY_COUPONS: "/coupons/me",
  CLAIMABLE_COUPONS: "/coupons/claimable",
  COUPON_CLAIM: (couponId) => `/coupons/${couponId}/claim`,

  /**
   * 배송지 관리 (고객)
   *
   * 백엔드: domain/mypage/controller/AddressController.java
   */
  MY_ADDRESSES: "/addresses",
  ADDRESS: (addressId) => `/addresses/${addressId}`,
  ADDRESS_DEFAULT: (addressId) => `/addresses/${addressId}/default`,

  /**
   * 우편번호 검색 (zipcloud 프록시)
   *
   * 백엔드: domain/postal/controller/PostalCodeController.java
   */
  POSTAL_CODE: (zipcode) => `/postal-code/${zipcode}`,


  ADMIN_PRODUCTS: "/admin/products",

  // 관리자 - 카테고리
  ADMIN_CATEGORIES: "/admin/categories",
  
  // 관리자(회원고나리)
  ADMIN_MEMBERS: "/admin/members",
  ADMIN_MEMBER_STATUS: (memberId) => `/admin/members/${memberId}/status`,
  ADMIN_MEMBER_DEMOTE: (memberId) => `/admin/members/${memberId}/demote`,
};

/**
 * 목 데이터 사용 여부
 *
 * 찜(WISHLIST) API가 백엔드에 구현되어 false로 두었습니다.
 */
export const USE_MOCK_WISHLIST = false;

/* 목 응답 지연 흉내 (ms) */
export const MOCK_DELAY = 300;
