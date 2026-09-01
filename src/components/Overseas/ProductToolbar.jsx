import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

/**
 * 상품 목록 상단 툴바 (제목 + 정렬탭 + 검색)
 *
 * @param {string}   title       섹션 제목
 * @param {Array}    sortTabs    정렬 탭 목록
 * @param {string}   activeSort  선택된 정렬 key
 * @param {Function} onSortChange
 * @param {string}   keyword     검색어
 * @param {Function} onKeywordChange
 * @param {Function} onClear     검색어 초기화
 */
function ProductToolbar({
  title,
  sortTabs,
  activeSort,
  onSortChange,
  keyword,
  onKeywordChange,
  onClear,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="products-heading">
      <div className="products-title-group">
        <h2>{title}</h2>

        <div className="product-tabs" role="tablist" aria-label="商品一覧の並び替え">
          {sortTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              className={activeSort === tab.key ? 'active' : ''}
              aria-selected={activeSort === tab.key}
              onClick={() => onSortChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <form className="product-search" onSubmit={handleSubmit} role="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="product-search-icon" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="商品名・ブランドで検索"
          aria-label="商品検索"
        />
        {keyword && (
          <button
            type="button"
            className="product-search-clear"
            onClick={onClear}
            aria-label="検索をクリア"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </form>
    </div>
  );
}

export default ProductToolbar;
