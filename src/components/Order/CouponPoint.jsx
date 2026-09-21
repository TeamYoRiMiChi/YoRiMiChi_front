import { faTicket } from '@fortawesome/free-solid-svg-icons';
import OrderSection from './OrderSection';
import '../../assets/styles/Order/components/CouponPoint.css';

/**
 * 쿠폰
 *
 * @param {Array}    coupons        지금 이 주문에 쓸 수 있는 보유 쿠폰 목록
 * @param {number}   couponId       선택된 쿠폰의 memberCouponId (0이면 미선택)
 * @param {Function} onCouponChange 쿠폰 변경 콜백
 * @param {Object}   amounts        계산된 할인 금액
 */
function CouponPoint({ coupons, couponId, onCouponChange, amounts }) {
  return (
    <OrderSection icon={faTicket} title="쿠폰">
      <div className="cp-row">
        <label htmlFor="coupon-select">쿠폰 할인</label>

        <select
          id="coupon-select"
          className="cp-select"
          value={couponId}
          onChange={(e) => onCouponChange(Number(e.target.value))}
        >
          <option value={0}>
            {coupons.length > 0 ? '쿠폰을 선택해주세요' : '사용 가능한 쿠폰이 없습니다'}
          </option>
          {coupons.map((c) => (
            <option key={c.memberCouponId} value={c.memberCouponId}>
              {c.couponName}
            </option>
          ))}
        </select>

        <strong className="cp-discount">
          {amounts.couponDiscount > 0
            ? `-¥${amounts.couponDiscount.toLocaleString()}`
            : '¥0'}
        </strong>
      </div>
    </OrderSection>
  );
}

export default CouponPoint;
