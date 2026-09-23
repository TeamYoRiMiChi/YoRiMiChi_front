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
function PaymentSummary({
  amounts,
  items,
  exchangeRate,
  agreed,
  onAgreeChange,
  onSubmit,
  isSubmitting,
  disabled = false,
}) {
  const {
    productAmount,
    overseasShipping,
    domesticShipping,
    couponDiscount,
    total,
  } = amounts;
  const saleAmounts = {
    overseas: items
      .filter((item) => item.saleType !== 'GROUP_BUY')
      .reduce((sum, item) => sum + (item.priceJpy * item.quantity), 0),
    groupBuy: items
      .filter((item) => item.saleType === 'GROUP_BUY')
      .reduce((sum, item) => sum + (item.priceJpy * item.quantity), 0),
  };

  return (
    <aside className="pay-summary">
      <h2 className="pay-summary-title">決済金額</h2>

      <dl className="pay-summary-list">
        {saleAmounts.overseas > 0 && (
          <div className="pay-summary-sale-row is-overseas">
            <dt><span>海外購入</span>商品</dt>
            <dd>¥{saleAmounts.overseas.toLocaleString()}</dd>
          </div>
        )}
        {saleAmounts.groupBuy > 0 && (
          <div className="pay-summary-sale-row is-group-buy">
            <dt><span>共同購入</span>商品</dt>
            <dd>¥{saleAmounts.groupBuy.toLocaleString()}</dd>
          </div>
        )}
        <div className="pay-summary-product-total">
          <dt>商品金額合計</dt>
          <dd><strong>¥{Math.round(productAmount).toLocaleString()}</strong></dd>
        </div>
        <div className="pay-summary-shipping-row">
          <dt>海外配送料</dt>
          <dd>¥{overseasShipping.toLocaleString()}</dd>
        </div>
        <div className="pay-summary-shipping-row">
          <dt>国内配送料</dt>
          <dd>¥{domesticShipping.toLocaleString()}</dd>
        </div>
      </dl>

      <div className="pay-summary-divider" />

      <dl className="pay-summary-list">
        <div>
          <dt>クーポン割引</dt>
          <dd className="minus">
            {couponDiscount > 0 ? `-¥${couponDiscount.toLocaleString()}` : '¥0'}
          </dd>
        </div>
      </dl>

      <div className="pay-summary-divider" />

      <div className="pay-summary-total">
        <span>合計決済金額</span>
        <div>
          <strong>¥{Math.round(total).toLocaleString()}</strong>
        </div>
      </div>

      <label className="pay-summary-agree">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreeChange(e.target.checked)}
        />
        <span>注文内容を確認し、決済に同意します。</span>
      </label>

      <button
        type="button"
        className="pay-submit-btn"
        onClick={onSubmit}
        disabled={!agreed || isSubmitting || disabled}
      >
        {isSubmitting
          ? '決済中...'
          : `¥${Math.round(total).toLocaleString()} 決済する`}
      </button>

      <p className="pay-summary-note">
        <FontAwesomeIcon icon={faLock} />
        安全な決済システムで保護されています。
      </p>
    </aside>
  );
}

export default PaymentSummary;
