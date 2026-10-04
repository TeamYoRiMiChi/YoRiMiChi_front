import { useEffect, useState } from "react";
import {
  deleteMyReview,
  getMyReviews,
  updateMyReview,
} from "../../../api/MyPage/myReviewApi";
import usePagination from "../../common/usePagination";

export function useMyReviews() {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingReviewId, setUpdatingReviewId] = useState(null);
  const [deletingReviewId, setDeletingReviewId] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const REVIEW_PER_PAGE = 5;

  const pagination = usePagination(reviews, REVIEW_PER_PAGE, {
    scrollTo: ".mp_panel",
    serverTotal: totalReviews,
  });

  useEffect(() => {
    let ignore = false;

    async function load() {
      setIsLoading(true);

      try {
        const res = await getMyReviews({
          page: pagination.currentPage,
          size: REVIEW_PER_PAGE,
        });

        const pageData = res.data.data ?? {};

        if (!ignore) {
          setReviews(pageData.content ?? []);
          setTotalReviews(pageData.totalElements ?? 0);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message ?? "レビューの取得に失敗しました。",
          );
          setReviews([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [pagination.currentPage, reloadTrigger]);

  const handleUpdateReview = async (reviewId, rating, content) => {
    if (updatingReviewId !== null) {
      return false;
    }

    setUpdatingReviewId(reviewId);

    try {
      const res = await updateMyReview(reviewId, rating, content);

      alert(res.data.message ?? "レビューを修正しました。");
      setReloadTrigger((current) => !current);

      return true;
    } catch (err) {
      alert(err.response?.data?.message ?? "レビューの修正に失敗しました。");

      return false;
    } finally {
      setUpdatingReviewId(null);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (deletingReviewId !== null) {
      return false;
    }

    const confirmed = window.confirm("このレビューを削除しますか？");

    if (!confirmed) {
      return false;
    }

    setDeletingReviewId(reviewId);

    try {
      const res = await deleteMyReview(reviewId);

      alert(res.data.message ?? "レビューを削除しました。");
      setReloadTrigger((current) => !current);

      return true;
    } catch (err) {
      alert(err.response?.data?.message ?? "レビューの削除に失敗しました。");

      return false;
    } finally {
      setDeletingReviewId(null);
    }
  };

  return {
    pagination,
    isLoading,
    error,
    updatingReviewId,
    deletingReviewId,
    handleUpdateReview,
    handleDeleteReview,
  };
}

export default useMyReviews;
