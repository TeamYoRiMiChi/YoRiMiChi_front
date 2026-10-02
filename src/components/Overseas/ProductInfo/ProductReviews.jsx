import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../../../assets/styles/Overseas/ProductInfo/ProductReviews.css';

/**
 * 리뷰 영역
 *
 * REVIEW 테이블 데이터를 그대로 보여줍니다.
 * 데이터 조회는 상위(ProductTabs)에서 useProductReviews로 하고,
 * 이 컴포넌트는 받은 값을 표시만 합니다.
 *
 * @param {Object}  summary   { average, total, bars: [{ star, percent }] }
 * @param {Array}   reviews   [{ id, name, rating, content, date }]
 * @param {boolean} isLoading 조회 중
 * @param {string}  error     조회 실패 메시지
 */
const ProductReviews = ({ summary, reviews, isLoading, error }) => {
  const { average, total, bars } = summary;

  if (isLoading) {
    return <div className="pinfo-review-state">レビューを読み込み中...</div>;
  }

  if (error) {
    return <div className="pinfo-review-state error">{error}</div>;
  }

  if (total === 0) {
    return (
      <div className="pinfo-review-state">
        まだレビューがありません。ご購入後に最初のレビューを投稿してみませんか？
      </div>
    );
  }

  return (
    <div className="pinfo-review-block">

      {/* 요약 */}
      <div className="pinfo-review-summary">
        <div className="pinfo-review-score">
          <strong>{average.toFixed(1)}</strong>
          <div className="pinfo-review-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <FontAwesomeIcon
                key={n}
                icon={faStar}
                className={n <= Math.round(average) ? 'on' : ''}
              />
            ))}
          </div>
          <span>{total}件のレビュー</span>
        </div>

        <ul className="pinfo-review-bars">
          {bars.map((b) => (
            <li key={b.star}>
              <span className="star">{b.star}</span>
              <FontAwesomeIcon icon={faStar} />
              <div className="bar">
                <i style={{ width: `${b.percent}%` }} />
              </div>
              <span className="percent">{b.percent}%</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 목록 */}
      <ul className="pinfo-review-list">
        {reviews.map((r) => (
          <li key={r.id}>
            <div className="pinfo-review-head">
              <div className="pinfo-review-user">
                <span className="avatar">{r.name.charAt(0)}</span>
                <strong>{r.name} さん</strong>
              </div>

              <div className="pinfo-review-stars small">
                {[1, 2, 3, 4, 5].map((n) => (
                  <FontAwesomeIcon
                    key={n}
                    icon={faStar}
                    className={n <= r.rating ? 'on' : ''}
                  />
                ))}
              </div>
            </div>

            {r.content && <p>{r.content}</p>}
            <span className="date">{r.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductReviews;
