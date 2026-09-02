/**
 * API 공통 설정
 *
 * 백엔드 API가 준비되기 전까지는 USE_MOCK을 true로 두고
 * 목 데이터로 화면을 개발합니다.
 * 서버 API가 완성되면 false로만 바꾸면 실제 통신으로 전환됩니다.
 */

/* 상품 API가 아직 백엔드에 없어서 목 데이터 사용 중 */
export const USE_MOCK = false;

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
};

/* 서버 응답 지연 흉내 (목 모드에서만 사용) */
export const MOCK_DELAY = 300;
