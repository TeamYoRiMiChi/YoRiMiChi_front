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
          <span>全クーポン</span>
          <strong>{summary.totalCoupons}</strong>
        </div>
      </div>

      <div className="acp-summary-card">
        <div className="acp-summary-icon acp-summary-green">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>

        <div>
          <span>利用可能なクーポン</span>
          <strong>{summary.activeCoupons}</strong>
        </div>
      </div>

      <div className="acp-summary-card">
        <div className="acp-summary-icon acp-summary-red">
          <FontAwesomeIcon icon={faClock} />
        </div>

        <div>
          <span>期限切れクーポン</span>
          <strong>{summary.expiredCoupons}</strong>
        </div>
      </div>

      <div className="acp-summary-card">
        <div className="acp-summary-icon acp-summary-gray">
          <FontAwesomeIcon icon={faBan} />
        </div>

        <div>
          <span>停止中クーポン</span>
          <strong>{summary.stoppedCoupons}</strong>
        </div>
      </div>

      <div className="acp-summary-card">
        <div className="acp-summary-icon acp-summary-orange">
          <FontAwesomeIcon icon={faUsers} />
        </div>

        <div>
          <span>会員発行クーポン</span>
          <strong>{summary.issuedMemberCoupons}</strong>
        </div>
      </div>
    </section>
  );
}

export default AdminCouponSummary;
