import '../../assets/styles/Group_purchase/GroupBuyApplicationModal.css';

function GroupBuyApplicationModal({
  isOpen,
  product,
  quantity,
  selectedOption,
  currentParticipants,
  targetParticipants,
  remainingTime,
  isSubmitting,
  isLoading,
  isComplete,
  error,
  appliedQuantity,
  existingQuantity,
  onIncrease,
  onDecrease,
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null;

  const remaining = Math.max(targetParticipants - currentParticipants, 0);
  const progress = targetParticipants > 0
    ? Math.min((currentParticipants / targetParticipants) * 100, 100)
    : 0;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="group_buy_modal_backdrop" onMouseDown={handleBackdropClick}>
      <section
        className="group_buy_modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="group-buy-modal-title"
      >
        <button
          type="button"
          className="group_buy_modal_close"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="閉じる"
        >
          ×
        </button>

        {isComplete ? (
          <div className="group_buy_modal_complete" role="status">
            <span>✓</span>
            <h2 id="group-buy-modal-title">申し込み完了</h2>
            <p>現在の申し込み数量は {appliedQuantity}個です。</p>
            <button type="button" onClick={onClose}>確認</button>
          </div>
        ) : (
          <>
            <header>
              <span className="group_buy_modal_badge">共同購入</span>
              <h2 id="group-buy-modal-title">申し込み内容の確認</h2>
              <p>{product.name}</p>
            </header>

            <div className="group_buy_modal_progress">
              <div className="group_buy_modal_progress_heading">
                <span>参加状況</span>
                <strong>{currentParticipants} / {targetParticipants}</strong>
              </div>
              <div className="group_buy_modal_progress_bar">
                <div style={{ width: `${progress}%` }}></div>
              </div>
              <div className="group_buy_modal_progress_footer">
                <span>残り <strong>{remaining}</strong> で成立</span>
                <span>終了まであと <strong>{remainingTime}</strong></span>
              </div>
            </div>

            <dl className="group_buy_modal_order">
              <div>
                <dt>現在の申し込み数量</dt>
                <dd>{isLoading ? '確認中...' : `${existingQuantity}個`}</dd>
              </div>
              <div>
                <dt>内容量</dt>
                <dd>{selectedOption}</dd>
              </div>
              <div>
                <dt>共同購入価格</dt>
                <dd>{product.groupPrice}</dd>
              </div>
              <div>
                <dt>今回追加する数量</dt>
                <dd className="group_buy_modal_quantity">
                  <button type="button" onClick={onDecrease} aria-label="数量を減らす">−</button>
                  <strong>{quantity}</strong>
                  <button type="button" onClick={onIncrease} aria-label="数量を増やす">＋</button>
                </dd>
              </div>
              <div>
                <dt>追加後の合計数量</dt>
                <dd>{isLoading ? '確認中...' : `${existingQuantity + quantity}個`}</dd>
              </div>
            </dl>

            {error && <p className="group_buy_modal_error" role="alert">{error}</p>}

            <div className="group_buy_modal_actions">
              <button type="button" className="cancel" onClick={onClose} disabled={isSubmitting}>
                キャンセル
              </button>
              <button type="button" className="confirm" onClick={onConfirm} disabled={isSubmitting || isLoading}>
                {isSubmitting ? '申し込み中...' : `${quantity}個を申し込む`}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default GroupBuyApplicationModal;
