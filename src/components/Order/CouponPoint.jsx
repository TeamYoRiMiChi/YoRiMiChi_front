import { faTicket } from '@fortawesome/free-solid-svg-icons';
import OrderSection from './OrderSection';
import '../../assets/styles/Order/components/CouponPoint.css';

/**
 * 쿠폰 및 포인트
 *
 * @param {Array}    coupons        사용 가능한 쿠폰 목록
 * @param {number}   couponId       선택된 쿠폰 id
 * @param {Function} onCouponChange 쿠폰 변경 콜백
 * @param {number}   availablePoint 보유 포인트
 * @param {string}   pointInput     입력한 포인트
 * @param {Function} onPointChange  포인트 입력 콜백
 * @param {Function} onUseAllPoint  전액 사용 콜백
 * @param {Object}   amounts        계산된 할인 금액
 */
function CouponPoint({
  coupons,
  couponId,
  onCouponChange,
  availablePoint,
  pointInput,
  onPointChange,
  onUseAllPoint,
  amounts,
}) {
  return (
    <OrderSection icon={faTicket} title="쿠폰 및 포인트">
      {/* 쿠폰 */}
      <div className="cp-row">
        <label htmlFor="coupon-select">쿠폰 할인</label>

        <select
          id="coupon-select"
          className="cp-select"
          value={couponId}
          onChange={(e) => onCouponChange(Number(e.target.value))}
        >
          {coupons.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <strong className="cp-discount">
          {amounts.couponDiscount > 0
            ? `-₩${amounts.couponDiscount.toLocaleString()}`
            : '₩0'}
        </strong>
      </div>

      {/* 보유 포인트 */}
      <div className="cp-row">
        <span className="cp-label">사용 가능 포인트</span>
        <strong className="cp-available">{availablePoint.toLocaleString()}P</strong>
        <strong className="cp-discount">
          {amounts.usedPoint > 0 ? `-₩${amounts.usedPoint.toLocaleString()}` : '₩0'}
        </strong>
      </div>

      {/* 포인트 입력 */}
      <div className="cp-row">
        <label htmlFor="point-input">포인트 사용</label>

        <div className="cp-point-input">
          <input
            id="point-input"
            type="text"
            inputMode="numeric"
            value={pointInput}
            onChange={(e) => onPointChange(e.target.value)}
            placeholder="0"
          />
          <span className="cp-unit">P</span>
        </div>

        <button type="button" className="cp-all-btn" onClick={onUseAllPoint}>
          전액 사용
        </button>
      </div>
    </OrderSection>
  );
}

export default CouponPoint;
