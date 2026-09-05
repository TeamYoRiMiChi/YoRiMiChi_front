import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faHeart,
  faCartShopping,
  faTruckFast,
  faShieldHalved,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { MOCK_REVIEW_SUMMARY } from '../../../data/Overseas/productInfoData';
import '../../../assets/styles/Overseas/ProductInfo/ProductSummary.css';

/**
 * 상품 정보 패널 (오른쪽)
 *
 * 제목·평점·가격·수량·구매 버튼을 담습니다.
 *
 * @param {Object} product      상품 데이터
 * @param {string} productCode  표시용 상품 코드
 * @param {Object} purchase     useProductPurchase의 반환값
 */
function ProductSummary({ product, productCode, purchase }) {
  const {
    quantity,
    changeQuantity,
    maxQuantity,
    isSoldOut,
    totalPrice,
    isWished,
    isAdding,
    handleToggleWish,
    handleAddToCart,
  } = purchase;

  const { average, total } = MOCK_REVIEW_SUMMARY;

  return (
    <div className="pinfo-summary">
      <span className="pinfo-badge">海外直購</span>

      <h1 className="pinfo-title">
        {product.brand && <em>{product.brand}</em>} {product.name}
      </h1>

      <p className="pinfo-code">商品コード：{productCode}</p>

      {/* 평점 */}
      <div className="pinfo-rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <FontAwesomeIcon
            key={n}
            icon={faStar}
            className={n <= Math.round(average) ? 'on' : ''}
          />
        ))}
        <strong>{average}</strong>
        <span>（{total}件のレビュー）</span>
      </div>

      <p className="pinfo-desc">{product.nameJp || product.name}</p>

      {/* 가격 */}
      <div className="pinfo-pricebox">
        <div className="pinfo-price-row">
          <div className="pinfo-price-main">
            <span className="label">販売価格</span>
            <strong>{product.price}</strong>
            <em>（税込）</em>
          </div>

          {product.originalPrice && (
            <div className="pinfo-price-origin">
              <span className="label">参考価格</span>
              <del>{product.originalPrice}</del>
            </div>
          )}

          {product.discount && (
            <span className="pinfo-discount">{product.discount} OFF</span>
          )}
        </div>

        <div className="pinfo-stock">
          <span>在庫状況</span>
          <strong className={isSoldOut ? 'out' : 'ok'}>
            {isSoldOut
              ? '在庫切れ'
              : product.stock
                ? `残り ${product.stock} 点`
                : '在庫あり'}
          </strong>
        </div>
      </div>

      {/* 옵션 + 수량 */}
      <div className="pinfo-options">
        <div className="pinfo-option">
          <label htmlFor="option-select">オプション</label>
          <select id="option-select" className="pinfo-select">
            <option>標準（1点）</option>
          </select>
        </div>

        <div className="pinfo-option">
          <label>数量</label>
          <div className="pinfo-qty">
            <button
              type="button"
              onClick={() => changeQuantity(-1)}
              disabled={quantity <= 1}
              aria-label="数量を減らす"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() => changeQuantity(1)}
              disabled={quantity >= maxQuantity}
              aria-label="数量を増やす"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>

      {/* 합계 */}
      <div className="pinfo-total">
        <span>合計</span>
        <strong>¥{totalPrice.toLocaleString()}</strong>
      </div>

      {/* 구매 버튼 */}
      <div className="pinfo-actions">
        <button
          type="button"
          className="pinfo-cart-btn"
          onClick={handleAddToCart}
          disabled={isSoldOut || isAdding}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          {isSoldOut ? '在庫切れ' : isAdding ? '追加中...' : 'カートに入れる'}
        </button>

        <button
          type="button"
          className={`pinfo-wish-btn ${isWished ? 'active' : ''}`}
          onClick={handleToggleWish}
          aria-pressed={isWished}
          aria-label="お気に入り"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>

      {/* 배송 안내 */}
      <div className="pinfo-notes">
        <div className="pinfo-note">
          <FontAwesomeIcon icon={faTruckFast} />
          <div>
            <strong>日本国内配送対応</strong>
            <span>最短 5〜7営業日でお届け</span>
          </div>
        </div>

        <div className="pinfo-note">
          <FontAwesomeIcon icon={faShieldHalved} />
          <div>
            <strong>安心・安全の取引システム</strong>
            <span>YoRiMiChiの保護で安心</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSummary;
