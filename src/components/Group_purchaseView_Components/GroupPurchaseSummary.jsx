import '../../assets/styles/Group_purchase/GroupPurchaseSummary.css';
import useGroupPurchaseSummary from '../../hooks/Group_purchase/useGroupPurchaseSummary';
import GroupBuyApplicationModal from './GroupBuyApplicationModal';

function GroupPurchaseSummary({ product, onParticipantsChange }) {

  const isRecruitmentClosed = product.status !== 'RECRUITING'
    || product.remainingTime === '終了'
    || product.currentParticipants >= product.targetParticipants;

  // Hook에서 옵션·수량·찜 상태와 변경 함수를 가져오기
  const {
    quantity,
    isWished,
    selectedOption,
    cartMessage,
    currentParticipants,
    isApplicationModalOpen,
    isApplicationSubmitting,
    isApplicationLoading,
    isApplicationComplete,
    applicationError,
    appliedQuantity,
    existingApplicationQuantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleToggleWish,
    handleOptionChange,
    handleApplyGroupBuy,
    handleCloseApplicationModal,
    handleConfirmApplication,
    handleAddToCart,
  } = useGroupPurchaseSummary(product, onParticipantsChange);

  const remainingParticipants = Math.max(
    product.targetParticipants - currentParticipants,
    0,
  );
  const participationRate = product.targetParticipants > 0
    ? Math.min((currentParticipants / product.targetParticipants) * 100, 100)
    : 0;
  const selectedTotalPrice = product.groupPriceValue * quantity;

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

      {/* 공동구매 가격 */}
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

        <div className="group_purchase_detail_progress">
          <div className="group_purchase_detail_progress_heading">
            <span>参加状況</span>
            <strong>{currentParticipants} / {product.targetParticipants}</strong>
          </div>
          <div className="group_purchase_detail_progress_bar">
            <div style={{ width: `${participationRate}%` }} />
          </div>
          <div className="group_purchase_detail_progress_footer">
            <span>残り <strong>{remainingParticipants}</strong> で成立</span>
            <span>終了まであと <strong>{product.remainingTime}</strong></span>
          </div>
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
          <div className="group_purchase_quantity_total" aria-live="polite">
            <span>合計</span>
            <strong>¥{selectedTotalPrice.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* 공동구매 신청, 장바구니, 찜 버튼 */}
      <div className="group_purchase_actions">
        <button
          type="button"
          className="group_purchase_apply_button"
          onClick={handleApplyGroupBuy}
          disabled={isRecruitmentClosed || currentParticipants >= product.targetParticipants}
        >
          {isRecruitmentClosed || currentParticipants >= product.targetParticipants ? '募集終了' : '共同購入を申し込む'}
        </button>
        <button
          type="button"
          className="group_purchase_cart_button"
          onClick={handleAddToCart}
          disabled={isRecruitmentClosed || currentParticipants >= product.targetParticipants}
        >
          {isRecruitmentClosed || currentParticipants >= product.targetParticipants
            ? '募集終了'
            : '🛒 カートに入れる'}
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
          <span className="delivery_icon" aria-hidden="true">🛡️</span>
          <p>
            <strong>安心・安全の取引システム</strong>
            <span>YOMIでの保護で安心</span>
          </p>
        </div>
      </div>

      <GroupBuyApplicationModal
        isOpen={isApplicationModalOpen}
        product={product}
        quantity={quantity}
        selectedOption={selectedOption}
        currentParticipants={currentParticipants}
        targetParticipants={product.targetParticipants}
        remainingTime={product.remainingTime}
        isSubmitting={isApplicationSubmitting}
        isLoading={isApplicationLoading}
        isComplete={isApplicationComplete}
        error={applicationError}
        appliedQuantity={appliedQuantity}
        existingQuantity={existingApplicationQuantity}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
        onConfirm={handleConfirmApplication}
        onClose={handleCloseApplicationModal}
      />
    </div>
  );
}

export default GroupPurchaseSummary;
