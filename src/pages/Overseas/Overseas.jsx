import OverseasHero from '../../components/Overseas/OverseasHero';
import CategoryFilter from '../../components/Overseas/CategoryFilter';
import ProductToolbar from '../../components/Overseas/ProductToolbar';
import ProductGrid from '../../components/Overseas/ProductGrid';
import BenefitBanner from '../../components/Overseas/BenefitBanner';
import Pagination from '../../components/common/Pagination';
import { useOverseas } from '../../hooks/Overseas/useOverseas';
import { CATEGORIES, SORT_TABS } from '../../data/Overseas/overseasData';
import '../../assets/styles/Overseas/Overseas.css';

function Overseas() {
  const {
    keyword,
    activeCategory,
    activeCategoryName,
    sort,
    totalElements,
    isLoading,
    isError,
    error,
    wishlistIds,
    handleToggleWish,
    pagination,
    handleCategory,
    handleSort,
    handleKeyword,
    handleReset,
  } = useOverseas();

  return (
    <div className="overseas-page">
      <OverseasHero />

      <CategoryFilter
        categories={CATEGORIES}
        activeId={activeCategory}
        onSelect={handleCategory}
      />

      <section className="overseas-products">
        <ProductToolbar
          title="日本の人気商品"
          sortTabs={SORT_TABS}
          activeSort={sort}
          onSortChange={handleSort}
          keyword={keyword}
          onKeywordChange={handleKeyword}
          onClear={() => handleKeyword('')}
        />

        <p className="products-result">
          全 <strong>{totalElements}</strong> 件
          {activeCategory !== 1 && <span>{activeCategoryName}</span>}
          {keyword && <span>「{keyword}」の検索結果</span>}
        </p>

        <ProductGrid
          products={pagination.visible}
          isLoading={isLoading}
          isError={isError}
          error={error}
          wishlistIds={wishlistIds}
          onToggleWish={handleToggleWish}
          onReset={handleReset}
        />

        <Pagination {...pagination} onChange={pagination.goPage} showSummary />
      </section>

      <BenefitBanner />
    </div>
  );
}

export default Overseas;
