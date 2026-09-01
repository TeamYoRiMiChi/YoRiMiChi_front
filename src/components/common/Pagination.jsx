import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * 공통 페이지네이션
 * 다른 페이지(공동구매, 마이페이지 등)에서도 재사용 가능
 *
 * @param {number}   currentPage 현재 페이지 (1부터)
 * @param {number}   totalPages  전체 페이지 수
 * @param {Function} onChange    페이지 변경 콜백
 */
function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="ページ送り">
      <button
        type="button"
        className="page-arrow"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="前のページ"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <ul className="page-numbers">
        {pages.map((n) => (
          <li key={n}>
            <button
              type="button"
              className={n === currentPage ? 'active' : ''}
              onClick={() => onChange(n)}
              aria-current={n === currentPage ? 'page' : undefined}
            >
              {n}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="page-arrow"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="次のページ"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </nav>
  );
}

export default Pagination;
