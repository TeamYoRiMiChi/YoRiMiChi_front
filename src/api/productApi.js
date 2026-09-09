import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../config/api';

/**
 * Product 공용 모듈
 *
 * 해외직구·공동구매 어느 쪽에도 속하지 않는 공통 코드만 둡니다.
 *
 * 목록 조회는 각 페이지 전용 파일을 쓰세요.
 *   해외직구 → api/Overseas/overseasProductApi.js
 *   공동구매 → api/Group_purchase/groupBuyProductApi.js
 *
 * 그래야 한쪽을 고칠 때 다른 쪽 파일을 건드리지 않아
 * 병합 충돌이 생기지 않습니다.
 */

/** 판매 방식 — PRODUCT.sale_type 값과 같습니다 */
export const SALE_TYPE = {
  OVERSEAS: 'OVERSEAS',    // 해외직구 (바로 구매)
  GROUP_BUY: 'GROUP_BUY',  // 공동구매 전용 (모집을 통해서만)
};

/** 화면에 표시할 라벨 */
export const SALE_TYPE_LABEL = {
  OVERSEAS: '海外直購',
  GROUP_BUY: '共同購入',
};

/**
 * 서버 DTO → 화면에서 쓰는 형태로 변환
 *
 * 가격 포맷(¥12,650)처럼 보여주기용 가공은 여기서 합니다.
 * 백엔드 필드명이 바뀌어도 이 함수만 고치면 화면은 그대로입니다.
 *
 * 두 페이지가 같은 상품 구조를 쓰므로 변환은 공유합니다.
 */
export function toProductView(dto) {
  const price = Number(dto.priceJpy ?? 0);
  const originalPrice = dto.originalPriceJpy != null
    ? Number(dto.originalPriceJpy) : null;

  return {
    // 상품 기본 정보
    id: dto.productId,
    categoryId: dto.categoryId,
    saleType: dto.saleType ?? SALE_TYPE.OVERSEAS,
    brand: dto.brand ?? '',
    name: dto.productName ?? '',
    nameJp: dto.productNameJp ?? '',

    // 화면 출력용 가격 정보
    priceNum: price,
    price: `¥${price.toLocaleString()}`,

    // 할인 전 가격이 있는 경우에만 문자열로 반환합니다
    originalPrice: originalPrice ? `¥${originalPrice.toLocaleString()}` : null,
    discount: dto.discountRate > 0 ? `${dto.discountRate}%` : null,

    // 상품 이미지
    thumbnailUrl: dto.thumbnailUrl ?? null,

    // 이미지 없을 때 임시 문구
    placeholder: dto.brand || dto.productName || '',

    // 상품 재고 및 판매 정보
    stock: dto.stock ?? 0,
    inStock: dto.inStock ?? true,
    sales: dto.salesCount ?? 0,

    // 상품 판매 상태
    status: dto.status ?? 'ACTIVE',

    /** 공동구매 전용 상품은 바로 구매할 수 없습니다 */
    isGroupBuyOnly: dto.saleType === SALE_TYPE.GROUP_BUY,
  };
}

/**
 * 목록 조회 파라미터를 만듭니다.
 *
 * 해외직구·공동구매가 같은 규칙을 쓰므로 여기서 한 번만 정의합니다.
 *
 * - 전체 카테고리는 빈 값('')으로 관리합니다.
 *   categoryId가 빈 값이면 요청 파라미터에서 제외됩니다.
 * - 검색어는 공백을 제거한 결과가 있을 때만 전송합니다.
 */
export function buildProductParams({ categoryId, keyword, sort, page, size }) {
  return {
    ...(categoryId ? { categoryId } : {}),
    ...(keyword?.trim() ? { keyword: keyword.trim() } : {}),
    sort,
    page,
    size,
  };
}

/**
 * 상품 단건 조회 (판매 방식 무관)
 *
 * 장바구니·주문처럼 이미 담긴 상품을 다시 읽을 때 씁니다.
 * 화면에서 상세를 그릴 때는 각 페이지 전용 API를 쓰세요.
 */
export const getProduct = (productId) => {
  return axiosInstance.get(`${ENDPOINTS.PRODUCTS}/${productId}`);
};
