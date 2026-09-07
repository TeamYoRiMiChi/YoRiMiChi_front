import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import OrderSection from './OrderSection';
import { DELIVERY_MEMOS } from '../../data/Order/orderData';
import '../../assets/styles/Order/components/ShippingInfo.css';

/**
 * 배송지 정보
 *
 * @param {Object}   address         배송지 데이터
 * @param {string}   memo            선택된 배송 메모
 * @param {Function} onMemoChange    메모 변경 콜백
 * @param {Function} onChangeAddress 배송지 변경 버튼 콜백
 */
function ShippingInfo({ address, memo, onMemoChange, onChangeAddress }) {
  return (
    <OrderSection icon={faLocationDot} title="배송지 정보">
      <div className="shipping-top">
        <div className="shipping-receiver">
          <strong>{address.receiverName}</strong>
          <span>{address.receiverPhone}</span>
        </div>

        <button type="button" className="shipping-change-btn" onClick={onChangeAddress}>
          배송지 변경
        </button>
      </div>

      <p className="shipping-address">
        {address.address}
        {address.addressDetail && ` ${address.addressDetail}`}
        , {address.postalCode}
      </p>

      <div className="shipping-memo">
        <label htmlFor="delivery-memo">배송 메모 (선택)</label>
        <select
          id="delivery-memo"
          value={memo}
          onChange={(e) => onMemoChange(e.target.value)}
        >
          <option value="">{DELIVERY_MEMOS[0]}</option>
          {DELIVERY_MEMOS.slice(1).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </OrderSection>
  );
}

export default ShippingInfo;
