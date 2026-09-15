import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faBan } from "@fortawesome/free-solid-svg-icons";

import { formatDate, formatMoney } from "./couponFormat";

import "../../../assets/styles/Admin/CouponManagement/components/AdminCouponTable.css";

function AdminCouponTable({ coupons, onIssueClick, onStopClick }) {
  return (
    <div className="acp-table-scroll">
      <table className="acp-table acp-coupon-table">
        <thead>
          <tr>
            <th>쿠폰 ID</th>
            <th>쿠폰 정보</th>
            <th>할인</th>
            <th>최소 주문금액</th>
            <th>최대 할인금액</th>
            <th>발급 방식</th>
            <th>사용 기간</th>
            <th>발급 현황</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.couponId}>
              <td>
                <strong className="acp-id">
                  {coupon.couponId}
                </strong>
              </td>

              <td>
                <div className="acp-coupon-info">
                  <strong>{coupon.couponName}</strong>
                  <span>{coupon.couponCode}</span>
                </div>
              </td>

              <td>
                <strong className="acp-discount">
                  {coupon.discountType === "PERCENT"
                    ? `${coupon.discountValue}%`
                    : `${formatMoney(coupon.discountValue)}원`}
                </strong>
              </td>

              <td>{formatMoney(coupon.minOrderAmount)}원</td>

              <td>{formatMoney(coupon.maxDiscountAmount)}원</td>

              <td>
                <span className="acp-issue-badge">
                  {coupon.issueType}
                </span>
              </td>

              <td>
                <div className="acp-period">
                  <span>{formatDate(coupon.validFrom)}</span>
                  <i>~</i>
                  <span>{formatDate(coupon.validTo)}</span>
                </div>
              </td>

              <td>
                <div className="acp-issued">
                  <strong>{coupon.issuedCount}</strong>
                  <span>
                    / {coupon.usageLimit == null ? "무제한" : coupon.usageLimit}
                  </span>
                </div>
              </td>

              <td>
                <span
                  className={
                    coupon.status === "ACTIVE"
                      ? "acp-status acp-status-active"
                      : coupon.status === "STOPPED"
                        ? "acp-status acp-status-expired acp-status-stopped"
                        : "acp-status acp-status-expired"
                  }
                >
                  {coupon.status === "ACTIVE"
                    ? "사용 가능"
                    : coupon.status === "STOPPED"
                      ? "중지"
                      : "만료"}
                </span>
              </td>

              <td>
                <div className="acp-row-actions">
                  <button
                    type="button"
                    className="acp-issue-button"
                    disabled={coupon.status !== "ACTIVE"}
                    onClick={() => onIssueClick(coupon)}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                    발급
                  </button>

                  <button
                    type="button"
                    className="acp-stop-button"
                    disabled={coupon.status !== "ACTIVE"}
                    onClick={() => onStopClick(coupon)}
                  >
                    <FontAwesomeIcon icon={faBan} />
                    중지
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {coupons.length === 0 && (
            <tr>
              <td colSpan={10} className="acp-empty">
                조건에 맞는 쿠폰이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCouponTable;
