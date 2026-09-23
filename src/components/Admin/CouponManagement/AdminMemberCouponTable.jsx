import { formatDate } from "./couponFormat";

import "../../../assets/styles/Admin/CouponManagement/components/AdminMemberCouponTable.css";

function AdminMemberCouponTable({ memberCoupons }) {
  return (
    <div className="acp-table-scroll">
      <table className="acp-table acp-member-coupon-table">
        <thead>
          <tr>
            <th>発行ID</th>
            <th>会員ID</th>
            <th>クーポン情報</th>
            <th>クーポンID</th>
            <th>注文ID</th>
            <th>発行日</th>
            <th>利用日</th>
            <th>ステータス</th>
          </tr>
        </thead>

        <tbody>
          {memberCoupons.map((memberCoupon) => (
            <tr key={memberCoupon.memberCouponId}>
              <td>
                <strong className="acp-id">
                  {memberCoupon.memberCouponId}
                </strong>
              </td>

              <td>
                <strong className="acp-member-id">
                  #{memberCoupon.memberId}
                </strong>
              </td>

              <td>
                <div className="acp-coupon-info">
                  <strong>{memberCoupon.couponName ?? "-"}</strong>
                  <span>{memberCoupon.couponCode ?? "-"}</span>
                </div>
              </td>

              <td>{memberCoupon.couponId}</td>

              <td>
                {memberCoupon.orderId
                  ? `#${memberCoupon.orderId}`
                  : "-"}
              </td>

              <td>{formatDate(memberCoupon.issuedAt)}</td>

              <td>{formatDate(memberCoupon.usedAt)}</td>

              <td>
                <span
                  className={`acp-member-status acp-member-status-${memberCoupon.status.toLowerCase()}`}
                >
                  {memberCoupon.status === "AVAILABLE"
                    ? "利用可能"
                    : memberCoupon.status === "USED"
                      ? "利用済み"
                      : "期限切れ"}
                </span>
              </td>
            </tr>
          ))}

          {memberCoupons.length === 0 && (
            <tr>
              <td colSpan={8} className="acp-empty">
                条件に合う発行履歴がありません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMemberCouponTable;
