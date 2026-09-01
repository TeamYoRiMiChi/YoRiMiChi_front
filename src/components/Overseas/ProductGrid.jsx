import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';
import '../../assets/styles/Overseas/components/ProductGrid.css';

/**
 * 상품 목록 그리드
 *
 * 로딩 → 스켈레톤, 에러 → 재시도 안내, 결과 없음 → 빈 상태를 보여줍니다.
 *
 * @param {Array}    products     화면에 보여줄 상품 목록
 * @param {boolean}  isLoading    로딩 중 여부
 * @param {boolean}  isError      에러 여부
 * @param {string}   error        에러 메시지
 * @param {Array}    wishlistIds  찜한 상품 id 배열
 * @param {Function} onToggleWish 찜 토글 콜백
 * @param {Function} onReset      빈 상태에서 초기화 버튼 콜백
 */
function ProductGrid({
  products,
  isLoading,
  isError,
  error,
  wishlistIds = [],
  onToggleWish,
  onReset,
}) {
  /* 로딩 중 — 카드 자리를 미리 잡아둬서 화면이 덜컹거리지 않게 */
  if (isLoading) {
    return (
      <ul className="product-list">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i} className="product-skeleton" aria-hidden="true">
            <div className="skeleton-thumb" />
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line price" />
          </li>
        ))}
      </ul>
    );
  }

  /* 통신 실패 */
  if (isError) {
    return (
      <div className="products-empty products-error">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p>{error || '商品の取得に失敗しました。'}</p>
        <button type="button" onClick={() => window.location.reload()}>
          再読み込み
        </button>
      </div>
    );
  }

  /* 결과 없음 */
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
          isWished={wishlistIds.includes(product.id)}
          onToggleWish={onToggleWish}
        />
      ))}
    </ul>
  );
}

export default ProductGrid;
