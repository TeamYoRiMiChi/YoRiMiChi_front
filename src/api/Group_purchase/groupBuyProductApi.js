import axiosInstance from '../axiosInstance';
import { buildProductParams } from '../productApi';

/**
 * 공동구매 상품 API
 *
 * 이 파일은 공동구매 페이지 전용입니다.
 * 해외직구 쪽은 api/Overseas/overseasProductApi.js를 씁니다.
 *
 * 서버가 saleType을 GROUP_BUY로 고정하므로
 * 파라미터로 해외직구 상품을 불러올 수 없습니다.
 *
 * 모집 정보(진행률·마감일)는 groupBuyApi.js가 담당합니다.
 * 여기서는 상품 자체의 정보만 다룹니다.
 */

const BASE_URL = '/group-buys/products';

/** 공동구매 목록은 카드가 커서 한 페이지에 12개 */
const GROUP_BUY_PER_PAGE = 12;

/**
 * 공동구매 상품 목록
 *
 * @param {Object} params { categoryId, keyword, sort, page, size }
 */
export const getGroupBuyProducts = (params = {}) => {
  const {
    categoryId,
    keyword,
    sort = 'recommend',
    page = 1,
    size = GROUP_BUY_PER_PAGE,
  } = params;

  return axiosInstance.get(BASE_URL, {
    params: buildProductParams({ categoryId, keyword, sort, page, size }),
  });
};

/** 공동구매 상품 상세 */
export const getGroupBuyProduct = (productId) => {
  return axiosInstance.get(`${BASE_URL}/${productId}`);
};
