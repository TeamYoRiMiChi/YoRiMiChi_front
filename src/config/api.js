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

  // 찜
  WISHLIST: '/wishlist',

  // 주문 내역
  ORDERHISTORY: '/orderhistory',
};

/**
 * 찜(WISHLIST) API는 아직 백엔드에 없어서 목 데이터로 동작합니다.
 * 서버가 준비되면 false로 바꾸세요.
 */
export const USE_MOCK_WISHLIST = true;

/* 목 응답 지연 흉내 (ms) */
export const MOCK_DELAY = 300;
