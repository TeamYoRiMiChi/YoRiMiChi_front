import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleExclamation,
  faStar,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { createReview } from '../../api/reviewApi';
import '../../assets/styles/Review/ReviewWriteModal.css';

const MAX_CONTENT_LENGTH = 1000;
const RATING_LABELS = ['', 'とても悪い', '悪い', '普通', '良い', 'とても良い'];
const SALE_TYPE_LABELS = { OVERSEAS: '海外直購', GROUP_BUY: '共同購入' };

/**
 * 리뷰 등록 모달
 *
 * REVIEW 테이블 컬럼과의 대응
 *   order_item_id          선택한 주문 상품 (여러 상품을 주문했다면 모달에서 고릅니다)
 *   product_id, sale_type  주문 상품에서 서버가 채움 (화면에는 상품 정보로만 표시)
 *   rating                 별점 1~5 (필수)
 *   content                리뷰 내용 (선택, 최대 1000자)
 *   member_id              로그인 정보에서 서버가 채움
 *
 * @param {Array}    items             주문 상품 [{ orderItemId, name, brand, thumbnailUrl, saleType }]
 * @param {Array}    reviewedItemIds   이미 리뷰를 쓴 orderItemId 목록
 * @param {Function} onClose           닫기
 * @param {Function} onSubmitted       등록 성공 콜백 (orderItemId)
 */
const ReviewWriteModal = ({ items, reviewedItemIds = [], onClose, onSubmitted }) => {
  const reviewedSet = useMemo(() => new Set(reviewedItemIds), [reviewedItemIds]);
  const writableItems = items.filter((item) => !reviewedSet.has(item.orderItemId));

  const [selectedId, setSelectedId] = useState(writableItems[0]?.orderItemId ?? null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);

  /* 선택한 상품이 이미 작성 완료 처리되면 다음 작성 가능 상품으로 넘어갑니다 */
  const selectedItem =
    writableItems.find((item) => item.orderItemId === selectedId) ??
    writableItems[0] ??
    null;

  /* ESC로 닫기 + 모달이 떠 있는 동안 뒤 화면 스크롤 잠금 */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isSubmitting) onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSubmitting, onClose]);

  const handleOverlayMouseDown = (event) => {
    if (event.target === event.currentTarget && !isSubmitting) onClose();
  };

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setContent('');
    setError(null);
    setIsDone(false);
    setSelectedId(writableItems[0]?.orderItemId ?? null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!selectedItem) {
      setError('レビューを書く商品を選択してください。');
      return;
    }
    if (rating < 1) {
      setError('星の評価を選択してください。');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createReview({
        orderItemId: selectedItem.orderItemId,
        rating,
        content,
      });
      onSubmitted(selectedItem.orderItemId);
      setIsDone(true);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ?? 'レビューの投稿に失敗しました。',
      );

      /* 이미 등록된 상품이면 목록에서 작성 완료로 표시합니다 (R002) */
      if (requestError.response?.data?.code === 'R002') {
        onSubmitted(selectedItem.orderItemId);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoverRating || rating;

  const modal = (
    <div className="rv-overlay" onMouseDown={handleOverlayMouseDown}>
      <div
        className="rv-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rv-modal-title"
      >
        <header className="rv-header">
          <h2 id="rv-modal-title">レビューを書く</h2>
          <button
            type="button"
            className="rv-close"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="閉じる"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>

        {isDone ? (
          <div className="rv-done" role="status">
            <FontAwesomeIcon icon={faCircleCheck} className="rv-done-icon" />
            <p className="rv-done-title">レビューを投稿しました。</p>
            <p className="rv-done-text">ご協力ありがとうございました。</p>

            <div className="rv-actions">
              {writableItems.length > 0 && (
                <button type="button" className="rv-btn rv-btn-line" onClick={resetForm}>
                  別の商品のレビューを書く
                </button>
              )}
              <button type="button" className="rv-btn rv-btn-brand" onClick={onClose}>
                閉じる
              </button>
            </div>
          </div>
        ) : !selectedItem ? (
          <div className="rv-done" role="status">
            <FontAwesomeIcon icon={faCircleCheck} className="rv-done-icon" />
            <p className="rv-done-title">すべての商品のレビューを投稿済みです。</p>

            <div className="rv-actions">
              <button type="button" className="rv-btn rv-btn-brand" onClick={onClose}>
                閉じる
              </button>
            </div>
          </div>
        ) : (
          <form className="rv-form" onSubmit={handleSubmit} noValidate>
            {/* 상품 선택 / 표시 */}
            <section className="rv-section">
              <h3>商品</h3>

              <ul className="rv-products">
                {items.map((item) => {
                  const isReviewed = reviewedSet.has(item.orderItemId);
                  const isSelected = selectedItem.orderItemId === item.orderItemId;
                  const isSingle = items.length === 1;

                  return (
                    <li key={item.orderItemId}>
                      <button
                        type="button"
                        className={`rv-product ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedId(item.orderItemId)}
                        disabled={isReviewed || isSingle || isSubmitting}
                        aria-pressed={isSelected}
                      >
                        <span className="rv-product-thumb">
                          {item.thumbnailUrl ? (
                            <img src={item.thumbnailUrl} alt="" />
                          ) : (
                            <span className="rv-product-thumb-empty" />
                          )}
                        </span>

                        <span className="rv-product-info">
                          <span className="rv-product-meta">
                            {item.brand && <span>{item.brand}</span>}
                            <em className="rv-badge">
                              {SALE_TYPE_LABELS[item.saleType] ?? SALE_TYPE_LABELS.OVERSEAS}
                            </em>
                          </span>
                          <strong className="rv-product-name">{item.name}</strong>
                        </span>

                        {isReviewed && <span className="rv-reviewed">投稿済み</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 별점 */}
            <section className="rv-section">
              <h3>
                評価 <span className="rv-required">必須</span>
              </h3>

              <div
                className="rv-stars"
                role="radiogroup"
                aria-label="星の評価"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n}点`}
                    className={`rv-star ${n <= displayRating ? 'on' : ''}`}
                    onClick={() => {
                      setRating(n);
                      setError(null);
                    }}
                    onMouseEnter={() => setHoverRating(n)}
                    disabled={isSubmitting}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </button>
                ))}

                <span className="rv-rating-label">
                  {displayRating
                    ? `${displayRating}点・${RATING_LABELS[displayRating]}`
                    : '星をタップして評価してください'}
                </span>
              </div>
            </section>

            {/* 내용 */}
            <section className="rv-section">
              <h3>
                レビュー内容 <span className="rv-optional">任意</span>
              </h3>

              <textarea
                className="rv-textarea"
                value={content}
                onChange={(event) => setContent(event.target.value.slice(0, MAX_CONTENT_LENGTH))}
                placeholder="商品の使い心地や配送についてご記入ください。"
                rows={5}
                maxLength={MAX_CONTENT_LENGTH}
                disabled={isSubmitting}
              />
              <p className="rv-count">
                {content.length} / {MAX_CONTENT_LENGTH}
              </p>
            </section>

            {error && (
              <p className="rv-error" role="alert">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {error}
              </p>
            )}

            <div className="rv-actions">
              <button
                type="button"
                className="rv-btn rv-btn-line"
                onClick={onClose}
                disabled={isSubmitting}
              >
                キャンセル
              </button>
              <button type="submit" className="rv-btn rv-btn-brand" disabled={isSubmitting}>
                {isSubmitting ? '投稿中...' : 'レビューを投稿'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default ReviewWriteModal;
