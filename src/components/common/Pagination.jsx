import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/common/Pagination.css';

/**
 * 페이지 번호를 화면에 보여줄 만큼만 잘라냅니다.
 * 페이지가 많으면 가운데만 남기고 양쪽을 "..." 으로 접습니다.
 *
 * 예) 총 20페이지, 현재 10페이지, maxVisible 5
 *     → [1, '...', 9, 10, 11, '...', 20]
 */
function buildPageWindow(pages, currentPage, totalPages, maxVisible) {
  if (totalPages <= maxVisible + 2) return pages;

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(2, currentPage - half);
  let end = Math.min(totalPages - 1, currentPage + half);

  // 앞뒤가 잘리면 반대쪽을 늘려서 개수를 맞춤
  if (currentPage - half < 2) {
    end = Math.min(totalPages - 1, end + (2 - (currentPage - half)));
  }
  if (currentPage + half > totalPages - 1) {
    start = Math.max(2, start - (currentPage + half - (totalPages - 1)));
  }

  const window = [1];
  if (start > 2) window.push('start-ellipsis');
  for (let i = start; i <= end; i += 1) window.push(i);
  if (end < totalPages - 1) window.push('end-ellipsis');
  window.push(totalPages);

  return window;
}

/**
 * 공통 페이지네이션 컴포넌트
 *
 * usePagination 훅의 반환값을 그대로 넘기면 됩니다.
 *
 * @param {number}   currentPage 현재 페이지
 * @param {number}   totalPages  전체 페이지 수
 * @param {Function} onChange    페이지 변경 콜백
 * @param {number}   maxVisible  가운데에 보여줄 번호 개수 (기본 5). 넘치면 "..." 처리
 * @param {boolean}  showSummary 하단에 "1-8 / 14件" 요약 표시 여부
 * @param {number}   startIndex  요약용 시작 번호 (showSummary 사용 시)
 * @param {number}   endIndex    요약용 끝 번호
 * @param {number}   totalItems  요약용 전체 개수
 *
 * @example
 * const pagination = usePagination(filtered, 8, { scrollTo: '.overseas-products' });
 * <Pagination {...pagination} onChange={pagination.goPage} />
 */
function Pagination({
  currentPage,
  totalPages,
  onChange,
  maxVisible = 5,
  showSummary = false,
  startIndex,
  endIndex,
  totalItems,
}) {
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const windowed = useMemo(
    () => buildPageWindow(pages, currentPage, totalPages, maxVisible),
    [pages, currentPage, totalPages, maxVisible]
  );

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-wrap">
      <nav className="pagination" aria-label="ページ送り">
        <button
          type="button"
          className="page-arrow"
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="前のページ"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <ul className="page-numbers">
          {windowed.map((item) =>
            typeof item === 'number' ? (
              <li key={item}>
                <button
                  type="button"
                  className={item === currentPage ? 'active' : ''}
                  onClick={() => onChange(item)}
                  aria-current={item === currentPage ? 'page' : undefined}
                >
                  {item}
                </button>
              </li>
            ) : (
              <li key={item} className="page-ellipsis" aria-hidden="true">
                …
              </li>
            )
          )}
        </ul>

        <button
          type="button"
          className="page-arrow"
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="次のページ"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </nav>

      {showSummary && totalItems > 0 && (
        <p className="pagination-summary">
          {startIndex}-{endIndex} / {totalItems}件
        </p>
      )}
    </div>
  );
}

export default Pagination;
