import axiosInstance from '../axiosInstance';
import { buildProductParams } from '../productApi';
import { PER_PAGE } from '../../data/Overseas/overseasData';

/**
 * 해외직구 상품 API
 *
 * 이 파일은 해외직구 페이지 전용입니다.
 * 공동구매 쪽은 api/Group_purchase/groupBuyProductApi.js를 씁니다.
 *
 * 서버가 saleType을 OVERSEAS로 고정하므로
 * 파라미터로 공동구매 상품을 불러올 수 없습니다.
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

const BASE_URL = '/overseas/products';

/**
 * 해외직구 상품 목록
 *
 * @param {Object} params { categoryId, keyword, sort, page, size }
 */
export const getOverseasProducts = (params = {}) => {
  const {
    categoryId,
    keyword,
    sort = 'recommend',
    page = 1,
    size = PER_PAGE,
  } = params;

  return axiosInstance.get(BASE_URL, {
    params: buildProductParams({ categoryId, keyword, sort, page, size }),
  });
};

/** 해외직구 상품 상세 */
export const getOverseasProduct = (productId) => {
  return axiosInstance.get(`${BASE_URL}/${productId}`);
};
