import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Overseas/components/ProductCard.css';

/**
 * 상품 카드 한 장
 *
 * 카드 본문을 클릭하면 상세 페이지로 이동합니다.
 * 찜 버튼은 링크 바깥에 둬야 클릭이 겹치지 않습니다.
 *
 * 상세 페이지 경로는 saleType에 따라 갈립니다.
 *   해외직구 → /overseas/:id  (기본값이라 Overseas 페이지는 그대로 동작)
 *   공동구매 → /groupbuy/:id  (통합 검색 결과에 공동구매 상품이 섞였을 때)
 *
 * @param {Object}   product        상품 데이터
 * @param {boolean}  isWished       찜한 상품인지
 * @param {Function} onToggleWish   찜 토글 콜백
 * @param {boolean}  showTypeBadge  해외직구/공동구매 배지 표시 여부 (검색 결과처럼 섞여 있을 때만 true)
 */
function ProductCard({ product, isWished = false, onToggleWish, showTypeBadge = false }) {
  const detailPath = product.isGroupBuyOnly
    ? `/groupbuy/${product.id}`
    : `/overseas/${product.id}`;

  return (
    <li className="product-card">
      <button
        type="button"
        className={`favorite-button ${isWished ? 'active' : ''}`}
        onClick={() => onToggleWish?.(product.id)}
        aria-pressed={isWished}
        aria-label={
          isWished
            ? `${product.name}をお気に入りから削除`
            : `${product.name}をお気に入りに追加`
        }
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>

      <Link to={detailPath} className="product-card-link">
        <div className="product-image-placeholder" aria-hidden="true">
          {product.thumbnailUrl ? (
            <img src={product.thumbnailUrl} alt="" />
          ) : (
            <span>{product.placeholder}</span>
          )}

          {showTypeBadge && (
            <span className={`product-type-badge ${product.isGroupBuyOnly ? 'group-buy' : 'overseas'}`}>
              {product.isGroupBuyOnly ? '共同購入' : '海外直購'}
            </span>
          )}
        </div>

        <p className="product-brand">{product.brand}</p>
        <h3>{product.name}</h3>

        <div className="product-price-row">
          <strong>{product.price}</strong>
          {product.originalPrice && <del>{product.originalPrice}</del>}
          {product.discount && <span>{product.discount}</span>}
        </div>
      </Link>
    </li>
  );
}

export default ProductCard;
