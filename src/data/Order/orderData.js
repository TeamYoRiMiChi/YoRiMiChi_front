import {
  faCreditCard,
  faBuildingColumns,
  faComment,
  faN,
} from '@fortawesome/free-solid-svg-icons';

/**
 * 주문/결제 페이지 고정 데이터
 *
 * 배송지·상품·금액은 서버에서 받아옵니다.
 * 여기에는 화면 선택지처럼 서버와 무관한 값만 둡니다.
 */

/* 배송 메모 선택지 */
export const DELIVERY_MEMOS = [
  '배송 시 요청사항을 선택해주세요.',
  '부재 시 경비실에 맡겨주세요.',
  '부재 시 문 앞에 놓아주세요.',
  '배송 전 연락 부탁드립니다.',
  '파손 위험 상품이니 조심히 다뤄주세요.',
  '직접 입력',
];

/* 결제 수단 */
export const PAYMENT_METHODS = [
  { key: 'CARD', label: '신용카드', icon: faCreditCard },
  { key: 'KAKAOPAY', label: '카카오페이', icon: faComment },
  { key: 'NAVERPAY', label: '네이버페이', icon: faN },
  { key: 'TRANSFER', label: '계좌이체', icon: faBuildingColumns },
];

/**
 * 쿠폰 · 포인트
 *
 * COUPON / POINT 테이블이 아직 없어서 화면 확인용 임시 데이터입니다.
 * 서버가 준비되면 API 응답으로 교체하세요.
 * 지금은 화면에서만 차감되고 실제 결제 금액에는 반영되지 않습니다.
 */
export const MOCK_COUPONS = [
  { id: 0, name: '쿠폰을 선택해주세요', discount: 0 },
  { id: 1, name: '10,000원 할인 쿠폰', discount: 10000 },
  { id: 2, name: '5,000원 할인 쿠폰', discount: 5000 },
  { id: 3, name: '첫 구매 3,000원 할인', discount: 3000 },
];

export const MOCK_AVAILABLE_POINT = 2000;
