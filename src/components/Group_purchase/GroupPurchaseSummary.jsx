import '../../assets/styles/Group_purchase/GroupPurchaseSummary.css';
import useGroupPurchaseSummary from '../../hooks/Group_purchase/useGroupPurchaseSummary';

function GroupPurchaseSummary({ product }) {

  // Hook에서 옵션·수량·찜 상태와 변경 함수를 가져오기
  const {
    quantity,
    isWished,
    selectedOption,
    cartMessage,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleToggleWish,
    handleOptionChange,
    handleAddToCart,
  } = useGroupPurchaseSummary(product.options[0], product.productId);

  const participationRate =
    (product.currentParticipants / product.targetParticipants) * 100;

  return (
    <div className="group_purchase_summary">
      {/* 상품 기본 정보 */}
      <span className="group_purchase_badge">{product.badge}</span>
      <h1>{product.name}</h1>
      <p className="group_purchase_code">商品コード：{product.productCode}</p>

      {/* 상품 평점 */}
      <div className="group_purchase_rating">
        <span className="rating_stars">★★★★★</span>
        <strong>{product.rating}</strong>
        <span>（{product.reviewCount}件のレビュー）</span>
      </div>

      <p className="group_purchase_description">{product.description}</p>

      {/* 공동구매 가격과 진행 상황 */}
      <div className="group_purchase_progress_box">
        <div className="group_purchase_price">
          <div>
            <span>共同購入価格</span>
            <strong>{product.groupPrice}</strong>
            <small>（税込）</small>
          </div>

          <div className="reference_price">
            <span>参考価格</span>
            <del>{product.referencePrice}</del>
          </div>

          <span className="discount_badge">{product.discountRate}</span>
        </div>

        <div className="participation_heading">
          <span>参加状況</span>
          <strong>
            {product.currentParticipants} / {product.targetParticipants}名
          </strong>
        </div>

        <div className="participation_bar">
          <div
            className="participation_bar_fill"
            style={{ width: `${participationRate}%` }}
          ></div>
        </div>

        <div className="participation_footer">
          <span>残り <strong>{product.remainingParticipants}名</strong> で成立</span>
          <span>終了まであと <strong>{product.remainingTime}</strong></span>
        </div>
      </div>

      {/* 상품 옵션과 수량 선택 */}
      <div className="group_purchase_options">
        <label className="group_purchase_option">
          <span>内容量</span>
          <select value={selectedOption} onChange={handleOptionChange}>
            {product.options.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </label>

        <div className="group_purchase_option">
          <span>数量</span>
          <div className="quantity_control">
            <button
              type="button"
              onClick={handleDecreaseQuantity}
              aria-label="数量を減らす"
            >
              −
            </button>
            <strong>{quantity}</strong>
            <button
              type="button"
              onClick={handleIncreaseQuantity}
              aria-label="数量を増やす"
            >
              ＋
            </button>
          </div>
        </div>
      </div>

      {/* 장바구니와 찜 버튼 */}
      <div className="group_purchase_actions">
        <button
          type="button"
          className="group_purchase_cart_button"
          onClick={handleAddToCart}
        >
          🛒 カートに入れる
        </button>
        <button
          type="button"
          className={`group_purchase_wish_button ${isWished ? 'active' : ''}`}
          onClick={handleToggleWish}
          aria-label={isWished ? 'お気に入りから削除' : 'お気に入りに追加'}
          aria-pressed={isWished}
        >
          {isWished ? '♥' : '♡'}
        </button>
      </div>

      {/* API 연결 전 사용하는 임시 장바구니 완료 안내 */}
      {cartMessage && (
        <p className="group_purchase_cart_message" role="status">
          {cartMessage}
        </p>
      )}

      {/* 배송 및 안전 거래 안내 */}
      <div className="group_purchase_delivery_info">
        <div>
          <span className="delivery_icon">🚚</span>
          <p>
            <strong>日本国内配送対応</strong>
            <span>最短3〜5営業日でお届け</span>
          </p>
        </div>

        <div>
          <span className="delivery_icon">♢</span>
          <p>
            <strong>安心・安全の取引システム</strong>
            <span>YOMIでの保護で安心</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GroupPurchaseSummary;
