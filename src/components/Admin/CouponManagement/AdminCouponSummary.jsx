import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faCircleCheck,
  faClock,
  faBan,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import "../../../assets/styles/Admin/CouponManagement/components/AdminCouponSummary.css";

function AdminCouponSummary({ summary }) {
  return (
    <section className="acp-summary-grid">
      <div className="acp-summary-card">
        <div className="acp-summary-icon acp-summary-blue">
          <FontAwesomeIcon icon={faTicket} />
        </div>

        <div>
          <span>전체 쿠폰</span>
          <strong>{summary.totalCoupons}</strong>
        </div>
      </div>

      <div className="acp-summary-card">
        <div className="acp-summary-icon acp-summary-green">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>

        <div>
          <span>사용 가능 쿠폰</span>
          <strong>{summary.activeCoupons}</strong>
        </div>
      </div>

      <div className="acp-summary-card">
        <div className="acp-summary-icon acp-summary-red">
          <FontAwesomeIcon icon={faClock} />
        </div>

        <div>
          <span>만료 쿠폰</span>
          <strong>{summary.expiredCoupons}</strong>
        </div>
      </div>

      <div className="acp-summary-card">
        <div className="acp-summary-icon acp-summary-gray">
          <FontAwesomeIcon icon={faBan} />
        </div>

        <div>
          <span>중지 쿠폰</span>
          <strong>{summary.stoppedCoupons}</strong>
        </div>
      </div>

      <div className="acp-summary-card">
        <div className="acp-summary-icon acp-summary-orange">
          <FontAwesomeIcon icon={faUsers} />
        </div>

        <div>
          <span>회원 발급 쿠폰</span>
          <strong>{summary.issuedMemberCoupons}</strong>
        </div>
      </div>
    </section>
  );
}

export default AdminCouponSummary;
