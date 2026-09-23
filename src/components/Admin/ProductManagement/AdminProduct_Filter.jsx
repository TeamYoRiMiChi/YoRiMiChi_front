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
          placeholder="商品名またはブランドで検索してください。"
        />
      </label>

      <div className="ap-filter-item">
        <span>販売種別</span>

        <select
          value={saleType}
          onChange={onSaleTypeChange}
        >
          <option value="">すべて</option>
          <option value="OVERSEAS">海外直購</option>
          <option value="GROUP_BUY">共同購入</option>
        </select>
      </div>

      <div className="ap-filter-item">
        <span>カテゴリ</span>

        <select
          value={categoryId}
          onChange={onCategoryChange}
        >
          <option value="">すべて</option>

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
        <span>販売ステータス</span>

        <select
          value={status}
          onChange={onStatusChange}
        >
          <option value="">すべて</option>
          <option value="ACTIVE">販売中</option>
          <option value="SOLD_OUT">在庫切れ</option>
          <option value="HIDDEN">販売停止</option>
        </select>
      </div>

      <button
        className="ap-reset-button"
        type="button"
        onClick={onReset}
      >
        <FontAwesomeIcon icon={faRotateRight} />
        リセット
      </button>
    </div>
  );
}

export default AdminProductFilter;
