import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../config/api';

/**
 * Review 도메인 API
 *
 * 등록과 "이 주문에서 이미 쓴 리뷰" 조회는 로그인이 필요하고,
 * 상품별 리뷰 목록은 로그인 없이 볼 수 있습니다.
 */

/**
 * 리뷰 등록
 *
 * 서버가 주문 상품(orderItemId)에서 상품·판매 방식을 읽어 REVIEW에 저장하므로
 * 클라이언트는 주문 상품 ID, 별점, 내용만 보냅니다.
 */
export const createReview = ({ orderItemId, rating, content }) => {
  const trimmed = content?.trim();

  return axiosInstance.post(ENDPOINTS.REVIEWS, {
    orderItemId,
    rating,
    content: trimmed ? trimmed : null,
  });
};

/** 상품 리뷰 목록 + 요약 */
export const getProductReviews = (productId, { size } = {}) => {
  return axiosInstance.get(ENDPOINTS.PRODUCT_REVIEWS(productId), {
    params: size ? { size } : undefined,
  });
};

/** 이 주문에서 내가 이미 리뷰를 쓴 주문 상품 ID 목록 */
export const getReviewedItemIds = (orderId) => {
  return axiosInstance.get(ENDPOINTS.ORDER_REVIEWED_ITEMS(orderId));
};

/** "2026-10-01T12:34:56" → "2026.10.01" */
export const formatReviewDate = (value) => {
  if (!value) return '';
  return String(value).slice(0, 10).replaceAll('-', '.');
};

/**
 * 서버 응답 → 화면용 형태
 *
 * bars는 5점 → 1점 순서이고 percent는 0~100 정수입니다.
 */
export const toReviewListView = (dto) => ({
  summary: {
    average: Number(dto?.average ?? 0),
    total: Number(dto?.total ?? 0),
    bars: (dto?.distribution ?? []).map((row) => ({
      star: row.star,
      count: Number(row.count ?? 0),
      percent: Number(row.percent ?? 0),
    })),
  },
  reviews: (dto?.reviews ?? []).map((review) => ({
    id: review.reviewId,
    name: review.memberName ?? '',
    rating: Number(review.rating ?? 0),
    content: review.content ?? '',
    saleType: review.saleType,
    date: formatReviewDate(review.createdAt),
  })),
});

/** 아직 리뷰가 없을 때 쓰는 빈 값 */
export const EMPTY_REVIEW_LIST = toReviewListView(null);
