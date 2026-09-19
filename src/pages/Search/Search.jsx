import { useSearchParams } from 'react-router-dom';
import ProductToolbar from '../../components/Overseas/ProductToolbar';
import ProductGrid from '../../components/Overseas/ProductGrid';
import Pagination from '../../components/common/Pagination';
import { useSearch } from '../../hooks/Search/useSearch';
import { SORT_TABS } from '../../data/Search/searchData';
import '../../assets/styles/Search/Search.css';

/**
 * 통합 검색 결과 페이지
 *
 * 헤더 검색창(handleSearch)에서 /search?q=키워드 로 넘어옵니다.
 * 해외직구·공동구매를 가리지 않고 섞어서 한 목록으로 보여줍니다.
 *
 * Overseas 페이지와 같은 ProductToolbar/ProductGrid/Pagination을 재사용해
 * 정렬탭(おすすめ/人気/新着/すべて) UI가 그대로 동작합니다.
 * 다만 카테고리 필터는 두지 않습니다 — 검색은 카테고리를 넘나드는 게 자연스럽습니다.
 */
function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const {
    keyword,
    sort,
    totalElements,
    isLoading,
    isError,
    error,
    wishlistIds,
    handleToggleWish,
    pagination,
    handleSort,
    handleKeyword,
    handleReset,
  } = useSearch();

  return (
    <div className="search-page">
      <section className="search-products">
        <ProductToolbar
          title={query ? `「${query}」の検索結果` : '商品検索'}
          sortTabs={SORT_TABS}
          activeSort={sort}
          onSortChange={handleSort}
          keyword={keyword}
          onKeywordChange={handleKeyword}
          onClear={() => handleKeyword('')}
        />

        <p className="products-result">
          全 <strong>{totalElements}</strong> 件
        </p>

        <ProductGrid
          products={pagination.visible}
          isLoading={isLoading}
          isError={isError}
          error={error}
          wishlistIds={wishlistIds}
          onToggleWish={handleToggleWish}
          onReset={handleReset}
          showTypeBadge
        />

        <Pagination {...pagination} onChange={pagination.goPage} />
      </section>
    </div>
  );
}

export default Search;
