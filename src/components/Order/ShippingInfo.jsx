import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import OrderSection from './OrderSection';
import { DELIVERY_MEMOS } from '../../data/Order/orderData';
import '../../assets/styles/Order/components/ShippingInfo.css';

/**
 * 배송지 정보
 *
 * 저장된 배송지를 쓰거나 직접 입력할 수 있습니다.
 * 저장된 주소가 없으면 직접 입력 모드로만 동작합니다.
 */
function ShippingInfo({
  address,
  useManual,
  manualAddress,
  errors,
  onManualChange,
  onCopyFromSaved,
  memo,
  onMemoChange,
  onToggleManual,
}) {
  return (
    <OrderSection icon={faLocationDot} title="配送先情報">

      {/* 저장된 주소 표시 */}
      {!useManual && address && (
        <>
          <div className="shipping-top">
            <div className="shipping-receiver">
              <strong>{address.receiverName}</strong>
              <span>{address.receiverPhone}</span>
            </div>

            <button
              type="button"
              className="shipping-change-btn"
              onClick={onToggleManual}
            >
              直接入力
            </button>
          </div>

          <p className="shipping-address">
            {address.address}
            {address.addressDetail && ` ${address.addressDetail}`}
            , {address.postalCode}
          </p>
        </>
      )}

      {/* 직접 입력 폼 */}
      {useManual && (
        <div className="shipping-form">
          <div className="shipping-form-head">
            <span className="shipping-form-title">配送先を直接入力</span>

            <div className="shipping-form-actions">
              {address && (
                <button
                  type="button"
                  className="shipping-mini-btn"
                  onClick={onCopyFromSaved}
                >
                  保存済みの住所を読み込む
                </button>
              )}

              {address && (
                <button
                  type="button"
                  className="shipping-mini-btn"
                  onClick={onToggleManual}
                >
                  保存済みの住所を使う
                </button>
              )}
            </div>
          </div>

          <div className="shipping-form-grid">
            <div className="shipping-field">
              <label htmlFor="receiverName">お届け先名</label>
              <input
                id="receiverName"
                className={errors.receiverName ? 'is-error' : ''}
                type="text"
                value={manualAddress.receiverName}
                onChange={(e) => onManualChange('receiverName', e.target.value)}
                placeholder="山田太郎"
              />
              {errors.receiverName && (
                <p className="shipping-error">{errors.receiverName}</p>
              )}
            </div>

            <div className="shipping-field">
              <label htmlFor="receiverPhone">連絡先</label>
              <input
                id="receiverPhone"
                className={errors.receiverPhone ? 'is-error' : ''}
                type="tel"
                value={manualAddress.receiverPhone}
                onChange={(e) => onManualChange('receiverPhone', e.target.value)}
                placeholder="010-1234-5678"
              />
              {errors.receiverPhone && (
                <p className="shipping-error">{errors.receiverPhone}</p>
              )}
            </div>

            <div className="shipping-field shipping-field-short">
              <label htmlFor="postalCode">郵便番号</label>
              <input
                id="postalCode"
                className={errors.postalCode ? 'is-error' : ''}
                type="text"
                value={manualAddress.postalCode}
                onChange={(e) => onManualChange('postalCode', e.target.value)}
                placeholder="06234"
              />
              {errors.postalCode && (
                <p className="shipping-error">{errors.postalCode}</p>
              )}
            </div>

            <div className="shipping-field shipping-field-full">
              <label htmlFor="address">住所</label>
              <input
                id="address"
                className={errors.address ? 'is-error' : ''}
                type="text"
                value={manualAddress.address}
                onChange={(e) => onManualChange('address', e.target.value)}
                placeholder="ソウル特別市江南区テヘラン路123"
              />
              {errors.address && (
                <p className="shipping-error">{errors.address}</p>
              )}
            </div>

            <div className="shipping-field shipping-field-full">
              <label htmlFor="addressDetail">詳細住所（任意）</label>
              <input
                id="addressDetail"
                type="text"
                value={manualAddress.addressDetail}
                onChange={(e) => onManualChange('addressDetail', e.target.value)}
                placeholder="101棟1001号"
              />
            </div>
          </div>
        </div>
      )}

      {/* 배송 메모 */}
      <div className="shipping-memo">
        <label htmlFor="delivery-memo">配送メモ（任意）</label>
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
