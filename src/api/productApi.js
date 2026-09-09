import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../config/api';
import { PER_PAGE } from '../data/Overseas/overseasData';

/**
 * Product 도메인 API
 *
 * 서버 응답 형태:
 * {
 *   success: true,
 *   data: {
 *     content: [ ...상품 배열 ],
 *     page: 1,
 *     size: 8,
 *     totalElements: 21,
 *     totalPages: 3,
 *     first: true,
 *     last: false
 *   }
 * }
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
 */
export function toProductView(dto) {
  const price = Number(dto.priceJpy ?? 0);
  const originalPrice = dto.originalPriceJpy != null ? Number(dto.originalPriceJpy) : null;

  return {
    id: dto.productId,
    categoryId: dto.categoryId,
    saleType: dto.saleType ?? SALE_TYPE.OVERSEAS,
    brand: dto.brand ?? '',
    name: dto.productName ?? '',
    nameJp: dto.productNameJp ?? '',

    priceNum: price,
    price: `¥${price.toLocaleString()}`,
    originalPrice: originalPrice ? `¥${originalPrice.toLocaleString()}` : null,
    discount: dto.discountRate > 0 ? `${dto.discountRate}%` : null,

    thumbnailUrl: dto.thumbnailUrl ?? null,
    placeholder: dto.brand || dto.productName || '',

    stock: dto.stock ?? 0,
    inStock: dto.inStock ?? true,
    sales: dto.salesCount ?? 0,
    status: dto.status ?? 'ACTIVE',

    /** 공동구매 전용 상품은 바로 구매할 수 없습니다 */
    isGroupBuyOnly: dto.saleType === SALE_TYPE.GROUP_BUY,
  };
}

/**
 * 상품 목록 조회
 *
 * saleType을 넘기지 않으면 서버가 해외직구 상품만 돌려줍니다.
 * 공동구매 목록이 필요하면 SALE_TYPE.GROUP_BUY를 넘기세요.
 *
 * @param {Object} params { saleType, categoryId, keyword, sort, page, size }
 */
export const getProducts = (params = {}) => {
  const {
    saleType = SALE_TYPE.OVERSEAS,
    categoryId,
    keyword,
    sort = 'recommend',
    page = 1,
    size = PER_PAGE,
  } = params;

  return axiosInstance.get(ENDPOINTS.PRODUCTS, {
    params: {
      saleType,
      // 전체(1)는 서버에서도 전체로 처리하지만, 굳이 보내지 않습니다
      ...(categoryId && categoryId !== 1 ? { categoryId } : {}),
      ...(keyword?.trim() ? { keyword: keyword.trim() } : {}),
      sort,
      page,
      size,
    },
  });
};

/** 상품 상세 조회 */
export const getProduct = (productId) => {
  return axiosInstance.get(`${ENDPOINTS.PRODUCTS}/${productId}`);
};
