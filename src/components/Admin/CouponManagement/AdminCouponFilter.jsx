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
          placeholder="クーポン名、クーポンコードまたはクーポンIDで検索"
          onChange={onKeywordChange}
        />
      </label>

      <div className="acp-filter-item">
        <span>割引方式</span>

        <select value={discountType} onChange={onDiscountTypeChange}>
          <option value="">すべて</option>
          <option value="PERCENT">定率割引</option>
          <option value="FIXED">定額割引</option>
        </select>
      </div>

      <div className="acp-filter-item">
        <span>ステータス</span>

        <select value={couponStatus} onChange={onStatusChange}>
          <option value="">すべて</option>
          <option value="ACTIVE">利用可能</option>
          <option value="EXPIRED">期限切れ</option>
          <option value="STOPPED">利用停止</option>
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

export default AdminCouponFilter;
