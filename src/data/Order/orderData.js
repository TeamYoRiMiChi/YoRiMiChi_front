import {
  faCreditCard,
  faBuildingColumns,
  faComment,
  faN,
} from '@fortawesome/free-solid-svg-icons';

/**
 * 주문/결제 페이지 임시 데이터
 *
 * 백엔드 연동 전까지 화면 개발용으로 사용합니다.
 * API가 준비되면 이 파일 대신 서버 응답을 쓰면 됩니다.
 */

/* 배송지 (ADDRESS 테이블 기준) */
export const MOCK_ADDRESS = {
  addressId: 1,
  receiverName: '김지윤',
  receiverPhone: '010-1234-5678',
  postalCode: '06234',
  address: '서울특별시 강남구 테헤란로 123',
  addressDetail: '',
  isDefault: true,
};

/* 개인통관고유부호 (MEMBER.personal_customs_code) */
export const MOCK_CUSTOMS_CODE = 'P123456789012';

/* 주문 상품 (CART_ITEM → ORDER_ITEM 으로 넘어갈 데이터) */
export const MOCK_ORDER_ITEMS = [
  {
    productId: 1,
    brand: 'SK-II',
    name: 'SK-II 피테라 에센스 230ml',
    thumbnailUrl: null,
    priceKrw: 126500,
    quantity: 1,
    overseasShipping: 8000,
    domesticShipping: 3000,
  },
];

/* 배송 메모 선택지 */
export const DELIVERY_MEMOS = [
  '배송 시 요청사항을 선택해주세요.',
  '부재 시 경비실에 맡겨주세요.',
  '부재 시 문 앞에 놓아주세요.',
  '배송 전 연락 부탁드립니다.',
  '파손 위험 상품이니 조심히 다뤄주세요.',
  '직접 입력',
];

/* 사용 가능한 쿠폰 */
export const MOCK_COUPONS = [
  { id: 0, name: '쿠폰을 선택해주세요', discount: 0 },
  { id: 1, name: '10,000원 할인 쿠폰', discount: 10000 },
  { id: 2, name: '5,000원 할인 쿠폰', discount: 5000 },
  { id: 3, name: '첫 구매 3,000원 할인', discount: 3000 },
];

/* 보유 포인트 */
export const MOCK_AVAILABLE_POINT = 2000;

/* 결제 수단 */
export const PAYMENT_METHODS = [
  { key: 'CARD', label: '신용카드', icon: faCreditCard },
  { key: 'KAKAOPAY', label: '카카오페이', icon: faComment },
  { key: 'NAVERPAY', label: '네이버페이', icon: faN },
  { key: 'TRANSFER', label: '계좌이체', icon: faBuildingColumns },
];
