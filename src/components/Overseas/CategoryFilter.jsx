import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useCategoryFilter } from '../../hooks/Overseas/components/useCategoryFilter';
import '../../assets/styles/Overseas/components/CategoryFilter.css';

/**
 * 카테고리 가로 스크롤 필터
 *
 * @param {Array}    categories  카테고리 목록
 * @param {number}   activeId    선택된 카테고리 id
 * @param {Function} onSelect    카테고리 선택 콜백
 */
function CategoryFilter({ categories, activeId, onSelect }) {
  const { listRef, atStart, atEnd, scroll } = useCategoryFilter();

  return (
    <section className="overseas-categories" aria-label="商品カテゴリー">
      <button
        type="button"
        className="carousel-arrow arrow-left"
        onClick={() => scroll(-1)}
        disabled={atStart}
        aria-label="前へ"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <ul className="category-list" ref={listRef}>
        {categories.map((category) => (
          <li key={category.id} className="category-item">
            <button
              type="button"
              className={`category-button ${activeId === category.id ? 'active' : ''}`}
              onClick={() => onSelect(category.id)}
              aria-pressed={activeId === category.id}
            >
              <FontAwesomeIcon icon={category.icon} className="category-icon" />
              <span>{category.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="carousel-arrow arrow-right"
        onClick={() => scroll(1)}
        disabled={atEnd}
        aria-label="次へ"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </section>
  );
}

export default CategoryFilter;
