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
        クーポン管理
      </button>

      <button
        type="button"
        className={
          activeTab === "MEMBER_COUPON" ? "acp-tab-active" : ""
        }
        onClick={() => onTabChange("MEMBER_COUPON")}
      >
        <FontAwesomeIcon icon={faUsers} />
        会員発行履歴
      </button>
    </div>
  );
}

export default AdminCouponTabs;
