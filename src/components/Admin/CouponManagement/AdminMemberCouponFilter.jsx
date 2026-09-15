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
          placeholder="회원 ID, 쿠폰명, 쿠폰 코드 또는 발급 ID 검색"
          onChange={onKeywordChange}
        />
      </label>

      <div className="acp-filter-item">
        <span>상태</span>

        <select value={memberCouponStatus} onChange={onStatusChange}>
          <option value="">전체</option>
          <option value="AVAILABLE">사용 가능</option>
          <option value="USED">사용 완료</option>
          <option value="EXPIRED">만료</option>
        </select>
      </div>

      <button
        type="button"
        className="acp-reset-button"
        onClick={onReset}
      >
        <FontAwesomeIcon icon={faRotateRight} />
        초기화
      </button>
    </div>
  );
}

export default AdminMemberCouponFilter;
