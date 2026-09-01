import { useState, useMemo } from 'react';
import OverseasHero from '../../components/Overseas/OverseasHero';
import CategoryFilter from '../../components/Overseas/CategoryFilter';
import ProductToolbar from '../../components/Overseas/ProductToolbar';
import ProductGrid from '../../components/Overseas/ProductGrid';
import BenefitBanner from '../../components/Overseas/BenefitBanner';
import Pagination from '../../components/common/Pagination';
import { CATEGORIES, PRODUCTS, SORT_TABS, PER_PAGE } from '../../data/Overseas/overseasData';
import '../../assets/styles/Overseas.css';

function Overseas() {
  const [keyword, setKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState(1);
  const [sort, setSort] = useState('recommend');
  const [page, setPage] = useState(1);

  /* 카테고리 + 검색 + 정렬 */
  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();

    const list = PRODUCTS.filter((p) => {
      const matchCategory = activeCategory === 1 || p.categoryId === activeCategory;
      const matchKeyword =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);
      return matchCategory && matchKeyword;
    });

    switch (sort) {
      case 'popular':
        return [...list].sort((a, b) => b.sales - a.sales);
      case 'newest':
        return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return list;
    }
  }, [keyword, sort, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const activeCategoryName = CATEGORIES.find((c) => c.id === activeCategory)?.name;

  /* ===== 핸들러 ===== */
  const handleCategory = (id) => {
    setActiveCategory(id);
    setPage(1);
  };

  const handleSort = (key) => {
    setSort(key);
    setPage(1);
  };

  const handleKeyword = (value) => {
    setKeyword(value);
    setPage(1);
  };

  const handleReset = () => {
    setKeyword('');
    setActiveCategory(1);
    setPage(1);
  };

  const goPage = (n) => {
    if (n < 1 || n > totalPages) return;
    setPage(n);

    const target = document.querySelector('.overseas-products');
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  };

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
          全 <strong>{filtered.length}</strong> 件
          {activeCategory !== 1 && <span>{activeCategoryName}</span>}
          {keyword && <span>「{keyword}」の検索結果</span>}
        </p>

        <ProductGrid products={visible} onReset={handleReset} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={goPage}
        />
      </section>

      <BenefitBanner />
    </div>
  );
}

export default Overseas;
