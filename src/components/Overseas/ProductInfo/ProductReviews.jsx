import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
  MOCK_REVIEW_SUMMARY,
  MOCK_REVIEWS,
} from '../../../data/Overseas/productInfoData';
import '../../../assets/styles/Overseas/ProductInfo/ProductReviews.css';

/**
 * 리뷰 영역
 *
 * 아직 REVIEW 테이블 API가 없어서 임시 데이터를 씁니다.
 * 서버가 준비되면 props로 데이터를 받도록 바꾸면 됩니다.
 */
function ProductReviews() {
  const { average, total, bars } = MOCK_REVIEW_SUMMARY;

  return (
    <div className="pinfo-review-block">

      {/* 요약 */}
      <div className="pinfo-review-summary">
        <div className="pinfo-review-score">
          <strong>{average}</strong>
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
        {MOCK_REVIEWS.map((r) => (
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

            <p>{r.content}</p>
            <span className="date">{r.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductReviews;
