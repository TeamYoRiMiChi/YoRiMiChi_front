import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Overseas/components/ProductCard.css';
import { Link } from 'react-router-dom';

/**
 * 상품 카드 한 장
 *
 * @param {Object}   product      상품 데이터
 * @param {boolean}  isWished     찜한 상품인지
 * @param {Function} onToggleWish 찜 토글 콜백
 */
function ProductCard({ product, isWished = false, onToggleWish }) {
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

      <div className="product-image-placeholder" aria-hidden="true">
        {product.thumbnailUrl ? (
          <img src={product.thumbnailUrl} alt="" />
        ) : (
          <span>{product.placeholder}</span>
        )}
      </div>

      <p className="product-brand">{product.brand}</p>
      <h3>{product.name}</h3>

      <div className="product-price-row">
        <strong>{product.price}</strong>
        {product.originalPrice && <del>{product.originalPrice}</del>}
        {product.discount && <span>{product.discount}</span>}
      </div>
      <div className='product-sea-box'>
        <Link className='product-sea' to={`/overseas/${product.id}`}>商品を見る</Link>
      </div>
    </li>
  );
}

export default ProductCard;
