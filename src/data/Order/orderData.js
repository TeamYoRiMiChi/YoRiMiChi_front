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
  '配送時のご要望を選択してください。',
  '不在時は警備室に預けてください。',
  '不在時は玄関前に置いてください。',
  '配送前にご連絡をお願いします。',
  '破損しやすい商品なので丁寧に扱ってください。',
  '直接入力',
];

/* 결제 수단 */
export const PAYMENT_METHODS = [
  { key: 'CARD', label: 'クレジットカード', icon: faCreditCard },
  { key: 'KAKAOPAY', label: 'カカオペイ', icon: faComment },
  { key: 'NAVERPAY', label: 'ネイバーペイ', icon: faN },
  { key: 'TRANSFER', label: '銀行振込', icon: faBuildingColumns },
];
