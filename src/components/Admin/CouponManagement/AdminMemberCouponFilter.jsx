import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import "../../../assets/styles/Admin/CouponManagement/components/AdminMemberCouponFilter.css";

function AdminMemberCouponFilter({
  memberCouponKeyword,
  memberCouponStatus,
  onKeywordChange,
  onStatusChange,
  onReset,
}) {
  return (
    <div className="acp-member-filter-bar">
      <label className="acp-search-box">
        <FontAwesomeIcon icon={faMagnifyingGlass} />

        <input
          type="search"
          value={memberCouponKeyword}
          placeholder="会員ID、クーポン名、クーポンコードまたは発行IDで検索"
          onChange={onKeywordChange}
        />
      </label>

      <div className="acp-filter-item">
        <span>ステータス</span>

        <select value={memberCouponStatus} onChange={onStatusChange}>
          <option value="">すべて</option>
          <option value="AVAILABLE">利用可能</option>
          <option value="USED">利用済み</option>
          <option value="EXPIRED">期限切れ</option>
        </select>
      </div>

      <button
        type="button"
        className="acp-reset-button"
        onClick={onReset}
      >
        <FontAwesomeIcon icon={faRotateRight} />
        リセット
      </button>
    </div>
  );
}

export default AdminMemberCouponFilter;
