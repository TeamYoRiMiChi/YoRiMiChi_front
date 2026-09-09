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
  const originalPrice = dto.originalPriceJpy != null 
  ? Number(dto.originalPriceJpy) : null;

  return {
    //상품 기본 정보
    id: dto.productId,
    categoryId: dto.categoryId,
    brand: dto.brand ?? '',
    name: dto.productName ?? '',
    nameJp: dto.productNameJp ?? '',

    //화면 출력용 가격 정보
    priceNum: price,
    price: `¥${price.toLocaleString()}`,

    //할인 전 가격이 있는 경우에만 문자열로 반환합니다
    originalPrice: originalPrice ? `¥${originalPrice.toLocaleString()}` : null,
    discount: dto.discountRate > 0 ? `${dto.discountRate}%` : null,

    //상품이미지
    thumbnailUrl: dto.thumbnailUrl ?? null,

    //이미지없을때임시문구
    placeholder: dto.brand || dto.productName || '',

    //상품 재고 및 판매 정보
    stock: dto.stock ?? 0,
    inStock: dto.inStock ?? true,
    sales: dto.salesCount ?? 0,

    //상품 판매 상태
    status: dto.status ?? 'ACTIVE',
  };
}

/**
 * 상품 목록 조회
 * @param {Object} params { categoryId, keyword, sort, page, size }
 */
export const getProducts = (params = {}) => {
  const {
    categoryId,
    keyword,
    sort = 'recommend',
    page = 1,
    size = PER_PAGE,
  } = params;

  return axiosInstance.get(ENDPOINTS.PRODUCTS, {
    params: {
      /**
       * 전체 카테고리는 빈 값('')으로 관리합니다.
       *
       * categoryId가 빈 값이면 요청 파라미터에서 제외됩니다.
       * categoryId가 1이면 식품 카테고리로 정상 전송됩니다.
       *
       * categoryId: ''
       * → categoryId를 전송하지 않음
       *
       * categoryId: 1
       * → categoryId=1 전송
       */
      ...(categoryId ? { categoryId } : {}),

      /**
       * 검색어가 있고 공백을 제거한 결과가 비어 있지 않을 때만
       * keyword 파라미터를 전송합니다.
       */
      ...(keyword?.trim()
        ? { keyword: keyword.trim() }
        : {}),

      /**
       * 정렬, 페이지, 페이지 크기는 항상 전송합니다.
       */
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
