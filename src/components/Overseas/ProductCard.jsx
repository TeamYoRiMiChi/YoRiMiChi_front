import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Overseas/components/ProductCard.css';

/**
 * 상품 카드 한 장
 *
 * @param {Object}   product     상품 데이터
 * @param {Function} onToggleWish 찜 토글 콜백 (선택)
 */
function ProductCard({ product, onToggleWish }) {
  return (
    <li className="product-card">
      <button
        type="button"
        className="favorite-button"
        onClick={() => onToggleWish?.(product.id)}
        aria-label={`${product.name}をお気に入りに追加`}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>

      <div className="product-image-placeholder" aria-hidden="true">
        <span>{product.placeholder}</span>
      </div>

      <p className="product-brand">{product.brand}</p>
      <h3>{product.name}</h3>

      <div className="product-price-row">
        <strong>{product.price}</strong>
        <del>{product.originalPrice}</del>
        <span>{product.discount}</span>
      </div>
    </li>
  );
}

export default ProductCard;
