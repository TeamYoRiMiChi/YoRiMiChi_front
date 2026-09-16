import { formatDate } from "./couponFormat";

import "../../../assets/styles/Admin/CouponManagement/components/AdminMemberCouponTable.css";

function AdminMemberCouponTable({ memberCoupons }) {
  return (
    <div className="acp-table-scroll">
      <table className="acp-table acp-member-coupon-table">
        <thead>
          <tr>
            <th>발급 ID</th>
            <th>회원 ID</th>
            <th>쿠폰 정보</th>
            <th>쿠폰 ID</th>
            <th>주문 ID</th>
            <th>발급일</th>
            <th>사용일</th>
            <th>상태</th>
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
                    ? "사용 가능"
                    : memberCoupon.status === "USED"
                      ? "사용 완료"
                      : "만료"}
                </span>
              </td>
            </tr>
          ))}

          {memberCoupons.length === 0 && (
            <tr>
              <td colSpan={8} className="acp-empty">
                조건에 맞는 발급 내역이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMemberCouponTable;
