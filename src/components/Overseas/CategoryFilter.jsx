import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * 카테고리 가로 스크롤 필터
 *
 * @param {Array}    categories  카테고리 목록
 * @param {number}   activeId    선택된 카테고리 id
 * @param {Function} onSelect    카테고리 선택 콜백
 */
function CategoryFilter({ categories, activeId, onSelect }) {
  const listRef = useRef(null);
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: false });

  const updateScrollState = () => {
    const el = listRef.current;
    if (!el) return;
    setScrollState({
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  };

  useEffect(() => {
    updateScrollState();

    const el = listRef.current;
    el?.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    return () => {
      el?.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scroll = (dir) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="overseas-categories" aria-label="商品カテゴリー">
      <button
        type="button"
        className="carousel-arrow arrow-left"
        onClick={() => scroll(-1)}
        disabled={scrollState.atStart}
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
        disabled={scrollState.atEnd}
        aria-label="次へ"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </section>
  );
}

export default CategoryFilter;
