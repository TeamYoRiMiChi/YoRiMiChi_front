import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';
import '../../assets/styles/Overseas/components/ProductGrid.css';

/**
 * 상품 목록 그리드 (결과 없으면 빈 상태 표시)
 *
 * @param {Array}    products     화면에 보여줄 상품 목록
 * @param {Function} onReset      빈 상태에서 초기화 버튼 콜백
 * @param {Function} onToggleWish 찜 토글 콜백 (선택)
 */
function ProductGrid({ products, onReset, onToggleWish }) {
  if (products.length === 0) {
    return (
      <div className="products-empty">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <p>検索結果がありません</p>
        <button type="button" onClick={onReset}>
          すべての商品を見る
        </button>
      </div>
    );
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onToggleWish={onToggleWish}
        />
      ))}
    </ul>
  );
}

export default ProductGrid;
