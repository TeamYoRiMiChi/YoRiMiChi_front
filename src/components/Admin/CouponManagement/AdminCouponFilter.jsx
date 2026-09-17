import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import "../../../assets/styles/Admin/CouponManagement/components/AdminCouponFilter.css";

function AdminCouponFilter({
  couponKeyword,
  discountType,
  couponStatus,
  onKeywordChange,
  onDiscountTypeChange,
  onStatusChange,
  onReset,
}) {
  return (
    <div className="acp-filter-bar">
      <label className="acp-search-box">
        <FontAwesomeIcon icon={faMagnifyingGlass} />

        <input
          type="search"
          value={couponKeyword}
          placeholder="쿠폰명, 쿠폰 코드 또는 쿠폰 ID 검색"
          onChange={onKeywordChange}
        />
      </label>

      <div className="acp-filter-item">
        <span>할인 방식</span>

        <select value={discountType} onChange={onDiscountTypeChange}>
          <option value="">전체</option>
          <option value="PERCENT">정률 할인</option>
          <option value="FIXED">정액 할인</option>
        </select>
      </div>

      <div className="acp-filter-item">
        <span>상태</span>

        <select value={couponStatus} onChange={onStatusChange}>
          <option value="">전체</option>
          <option value="ACTIVE">사용 가능</option>
          <option value="EXPIRED">만료</option>
          <option value="STOPPED">사용중지</option>
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

export default AdminCouponFilter;
