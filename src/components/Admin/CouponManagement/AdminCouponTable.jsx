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
            <th>クーポンID</th>
            <th>クーポン情報</th>
            <th>割引</th>
            <th>最低注文金額</th>
            <th>最大割引金額</th>
            <th>発行方式</th>
            <th>利用期間</th>
            <th>発行状況</th>
            <th>ステータス</th>
            <th>管理</th>
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
                    : `${formatMoney(coupon.discountValue)}円`}
                </strong>
              </td>

              <td>{formatMoney(coupon.minOrderAmount)}円</td>

              <td>{formatMoney(coupon.maxDiscountAmount)}円</td>

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
                    / {coupon.usageLimit == null ? "無制限" : coupon.usageLimit}
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
                    ? "利用可能"
                    : coupon.status === "STOPPED"
                      ? "停止中"
                      : "期限切れ"}
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
                    発行
                  </button>

                  <button
                    type="button"
                    className="acp-stop-button"
                    disabled={coupon.status !== "ACTIVE"}
                    onClick={() => onStopClick(coupon)}
                  >
                    <FontAwesomeIcon icon={faBan} />
                    停止
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {coupons.length === 0 && (
            <tr>
              <td colSpan={10} className="acp-empty">
                条件に合うクーポンがありません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCouponTable;
