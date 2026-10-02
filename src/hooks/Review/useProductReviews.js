import { useEffect, useState } from 'react';
import {
  EMPTY_REVIEW_LIST,
  getProductReviews,
  toReviewListView,
} from '../../api/reviewApi';

/**
 * 상품 리뷰 조회 훅
 *
 * 해외직구 상세와 공동구매 상세의 리뷰 탭이 같이 씁니다.
 * 두 화면 모두 PRODUCT의 product_id로 조회합니다.
 *
 * @param {number|string} productId
 * @returns {{ summary, reviews, isLoading, error }}
 */
export const useProductReviews = (productId) => {
  const [data, setData] = useState(EMPTY_REVIEW_LIST);
  const [isLoading, setIsLoading] = useState(Boolean(productId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setData(EMPTY_REVIEW_LIST);
      setIsLoading(false);
      return undefined;
    }

    let ignore = false;

    setIsLoading(true);
    setError(null);

    getProductReviews(productId)
      .then((response) => {
        if (!ignore) setData(toReviewListView(response.data.data));
      })
      .catch((requestError) => {
        if (ignore) return;
        setData(EMPTY_REVIEW_LIST);
        setError(
          requestError.response?.data?.message ?? 'レビューを読み込めませんでした。',
        );
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [productId]);

  return {
    summary: data.summary,
    reviews: data.reviews,
    isLoading,
    error,
  };
};

export default useProductReviews;
