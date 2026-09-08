/**
 * API 공통 설정
 */

/* API 엔드포인트 (백엔드 명세와 맞춰서 관리) */
export const ENDPOINTS = {
  // 회원
  USERS: '/users',
  LOGIN: '/users/login',

  // 상품
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  GB_CATEGORIES: '/gb-categories',





  // 찜
  WISHLIST: '/wishlist',

  // 장바구니
  CART: '/cart',

  // 주문
  ORDERS: '/orders',

  // 주문 내역
  ORDERHISTORY: '/orderhistory',
};

/**
 * 목 데이터 사용 여부
 *
 * 찜(WISHLIST) API가 백엔드에 구현되어 false로 두었습니다.
 */
export const USE_MOCK_WISHLIST = false;

/* 목 응답 지연 흉내 (ms) */
export const MOCK_DELAY = 300;
