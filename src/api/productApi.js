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
  };
}

/**
 * 상품 목록 조회
 * @param {Object} params { categoryId, keyword, sort, page, size }
 */
export const getProducts = (params = {}) => {
  const { categoryId, keyword, sort = 'recommend', page = 1, size = PER_PAGE } = params;

  return axiosInstance.get(ENDPOINTS.PRODUCTS, {
    params: {
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
