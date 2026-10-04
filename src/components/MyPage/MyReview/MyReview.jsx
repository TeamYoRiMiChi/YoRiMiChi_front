import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/MyPage/MyReview.css";

import useMyReviews from "../../../hooks/MyPage/MyReview/useMyReviews";
import Pagination from "../../Admin/common/AdminPagination";

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return String(date).slice(0, 10).replaceAll("-", ".");
};

function MyReview() {
  const {
    pagination,
    isLoading,
    error,
    updatingReviewId,
    deletingReviewId,
    handleUpdateReview,
    handleDeleteReview,
  } = useMyReviews();

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editContent, setEditContent] = useState("");

  const startEditing = (review) => {
    setEditingReviewId(review.reviewId);
    setEditRating(review.rating);
    setEditContent(review.content ?? "");
  };

  const cancelEditing = () => {
    setEditingReviewId(null);
    setEditRating(0);
    setEditContent("");
  };

  const submitEditing = async (event, reviewId) => {
    event.preventDefault();

    const updated = await handleUpdateReview(reviewId, editRating, editContent);

    if (updated) {
      cancelEditing();
    }
  };

  if (isLoading) {
    return (
      <div className="mp_panel">
        <p className="mp_status mp_status_loading">読み込み中です...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mp_panel">
        <p className="mp_status mp_status_error">{error}</p>
      </div>
    );
  }

  if (pagination.visible.length === 0) {
    return (
      <div className="mp_panel">
        <div className="mp_empty">
          <div className="mp_empty_icon">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <p className="mp_empty_title">まだ書いたレビューがありません</p>
          <p className="mp_empty_desc">
            購入した商品のレビューを書くと、ここで確認・修正できます。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mp_panel">
      {pagination.visible.map((review) => {
        const isEditing = editingReviewId === review.reviewId;
        const isUpdating = updatingReviewId === review.reviewId;
        const isDeleting = deletingReviewId === review.reviewId;
        const isProcessing =
          updatingReviewId !== null || deletingReviewId !== null;

        return (
          <div className="review_card" key={review.reviewId}>
            <div className="review_head">
              <div className="review_product_area">
                {review.thumbnailUrl ? (
                  <img
                    className="review_thumb"
                    src={review.thumbnailUrl}
                    alt={review.productName}
                  />
                ) : (
                  <div className="review_thumb" aria-hidden="true" />
                )}

                <div className="review_product_info">
                  <p className="review_product">{review.productName}</p>

                  {!isEditing && (
                    <div className="review_stars">
                      {[1, 2, 3, 4, 5].map((number) => (
                        <FontAwesomeIcon
                          key={number}
                          icon={faStar}
                          className={number <= review.rating ? "on" : ""}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {!isEditing && (
                <div className="review_btns">
                  <button
                    type="button"
                    className="icon_bt"
                    onClick={() => startEditing(review)}
                    disabled={isProcessing}
                    aria-label="レビューを修正"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>

                  <button
                    type="button"
                    className="icon_bt"
                    onClick={() => handleDeleteReview(review.reviewId)}
                    disabled={isProcessing}
                    aria-label="レビューを削除"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <form
                className="review_edit_form"
                onSubmit={(event) => submitEditing(event, review.reviewId)}
              >
                <div className="review_edit_stars">
                  {[1, 2, 3, 4, 5].map((number) => (
                    <button
                      type="button"
                      key={number}
                      onClick={() => setEditRating(number)}
                      className={number <= editRating ? "on" : ""}
                      disabled={isUpdating}
                      aria-label={`${number}点`}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </button>
                  ))}
                </div>

                <textarea
                  value={editContent}
                  onChange={(event) => setEditContent(event.target.value)}
                  maxLength={1000}
                  disabled={isUpdating}
                />

                <div className="review_edit_btns">
                  <button
                    type="button"
                    className="mini_bt mini_bt_line"
                    onClick={cancelEditing}
                    disabled={isUpdating}
                  >
                    キャンセル
                  </button>

                  <button
                    type="submit"
                    className="mini_bt"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "修正中..." : "修正する"}
                  </button>
                </div>
              </form>
            ) : (
              <>
                {review.content && (
                  <p className="review_content">{review.content}</p>
                )}

                <span className="review_date">
                  {formatDate(review.createdAt)}
                </span>
              </>
            )}

            {isDeleting && <p className="review_processing">削除中です...</p>}
          </div>
        );
      })}

      <Pagination
        totalCount={pagination.totalItems}
        totalLabel="件のレビュー"
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.goPage}
      />
    </div>
  );
}

export default MyReview;
