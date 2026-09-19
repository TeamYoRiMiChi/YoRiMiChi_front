import axiosInstance from '../axiosInstance';
import { buildProductParams } from '../productApi';
import { PER_PAGE } from '../../data/Search/searchData';

/**
 * 통합 검색 API (헤더 검색창)
 *
 * 해외직구·공동구매를 가리지 않고 상품명·브랜드로 검색합니다.
 * 서버가 saleType을 고정하지 않는 것만 빼면 overseasProductApi.js와 같은 형태입니다.
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

const BASE_URL = '/products/search';

/**
 * 통합 검색
 *
 * @param {Object} params { keyword, categoryId, sort, page, size }
 */
export const searchProducts = (params = {}) => {
  const {
    keyword,
    categoryId,
    sort = 'recommend',
    page = 1,
    size = PER_PAGE,
  } = params;

  return axiosInstance.get(BASE_URL, {
    params: buildProductParams({ categoryId, keyword, sort, page, size }),
  });
};
