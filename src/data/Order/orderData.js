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
