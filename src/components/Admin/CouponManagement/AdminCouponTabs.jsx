import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faUsers } from "@fortawesome/free-solid-svg-icons";

import "../../../assets/styles/Admin/CouponManagement/components/AdminCouponTabs.css";

function AdminCouponTabs({ activeTab, onTabChange }) {
  return (
    <div className="acp-tabs">
      <button
        type="button"
        className={activeTab === "COUPON" ? "acp-tab-active" : ""}
        onClick={() => onTabChange("COUPON")}
      >
        <FontAwesomeIcon icon={faTicket} />
        쿠폰 관리
      </button>

      <button
        type="button"
        className={
          activeTab === "MEMBER_COUPON" ? "acp-tab-active" : ""
        }
        onClick={() => onTabChange("MEMBER_COUPON")}
      >
        <FontAwesomeIcon icon={faUsers} />
        회원 발급 내역
      </button>
    </div>
  );
}

export default AdminCouponTabs;
