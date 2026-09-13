import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

function AdminProductFilter({
  keyword,
  saleType,
  categoryId,
  status,
  categories,
  onKeywordChange,
  onSaleTypeChange,
  onCategoryChange,
  onStatusChange,
  onReset,
}) {
  return (
    <div className="ap-filter-bar">
      <label className="ap-search-box">
        <FontAwesomeIcon icon={faMagnifyingGlass} />

        <input
          type="search"
          value={keyword}
          onChange={onKeywordChange}
          placeholder="상품명 또는 브랜드로 검색하세요."
        />
      </label>

      <div className="ap-filter-item">
        <span>판매 유형</span>

        <select
          value={saleType}
          onChange={onSaleTypeChange}
        >
          <option value="">전체</option>
          <option value="OVERSEAS">해외직구</option>
          <option value="GROUP_BUY">공동구매</option>
        </select>
      </div>

      <div className="ap-filter-item">
        <span>카테고리</span>

        <select
          value={categoryId}
          onChange={onCategoryChange}
        >
          <option value="">전체</option>

          {categories.map((category) => (
            <option
              key={category.categoryId}
              value={category.categoryId}
            >
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="ap-filter-item">
        <span>판매 상태</span>

        <select
          value={status}
          onChange={onStatusChange}
        >
          <option value="">전체</option>
          <option value="ACTIVE">판매 중</option>
          <option value="SOLD_OUT">품절</option>
          <option value="HIDDEN">판매 중지</option>
        </select>
      </div>

      <button
        className="ap-reset-button"
        type="button"
        onClick={onReset}
      >
        <FontAwesomeIcon icon={faRotateRight} />
        초기화
      </button>
    </div>
  );
}

export default AdminProductFilter;