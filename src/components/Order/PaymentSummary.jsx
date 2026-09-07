import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Order/components/PaymentSummary.css';

/**
 * 결제 금액 요약 (오른쪽 고정 패널)
 *
 * @param {Object}   amounts       계산된 금액
 * @param {boolean}  agreed        동의 여부
 * @param {Function} onAgreeChange 동의 변경 콜백
 * @param {Function} onSubmit      결제 버튼 콜백
 * @param {boolean}  isSubmitting  결제 진행 중 여부
 */
function PaymentSummary({ amounts, agreed, onAgreeChange, onSubmit, isSubmitting }) {
  const {
    productAmount,
    overseasShipping,
    domesticShipping,
    couponDiscount,
    usedPoint,
    total,
  } = amounts;

  return (
    <aside className="pay-summary">
      <h2 className="pay-summary-title">결제 금액</h2>

      <dl className="pay-summary-list">
        <div>
          <dt>상품 금액</dt>
          <dd>₩{productAmount.toLocaleString()}</dd>
        </div>
        <div>
          <dt>해외 배송비</dt>
          <dd>₩{overseasShipping.toLocaleString()}</dd>
        </div>
        <div>
          <dt>국내 배송비</dt>
          <dd>₩{domesticShipping.toLocaleString()}</dd>
        </div>
      </dl>

      <div className="pay-summary-divider" />

      <dl className="pay-summary-list">
        <div>
          <dt>쿠폰 할인</dt>
          <dd className="minus">
            {couponDiscount > 0 ? `-₩${couponDiscount.toLocaleString()}` : '₩0'}
          </dd>
        </div>
        <div>
          <dt>포인트 사용</dt>
          <dd className="minus">
            {usedPoint > 0 ? `-₩${usedPoint.toLocaleString()}` : '₩0'}
          </dd>
        </div>
      </dl>

      <div className="pay-summary-divider" />

      <div className="pay-summary-total">
        <span>총 결제금액</span>
        <strong>₩{total.toLocaleString()}</strong>
      </div>

      <label className="pay-summary-agree">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreeChange(e.target.checked)}
        />
        <span>주문 내용을 확인했으며 결제에 동의합니다.</span>
      </label>

      <button
        type="button"
        className="pay-submit-btn"
        onClick={onSubmit}
        disabled={!agreed || isSubmitting}
      >
        {isSubmitting ? '결제 중...' : `₩${total.toLocaleString()} 결제하기`}
      </button>

      <p className="pay-summary-note">
        <FontAwesomeIcon icon={faLock} />
        안전한 결제 시스템으로 보호됩니다.
      </p>
    </aside>
  );
}

export default PaymentSummary;
