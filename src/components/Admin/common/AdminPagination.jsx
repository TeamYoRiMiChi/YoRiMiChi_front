import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "./AdminPagenation.css";

function AdminPagination({
  totalCount = 0,
  totalLabel = "",
  page = 1,
  totalPages = 1,
  onPageChange,
}) {
  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(page, 1), safeTotalPages);

  const pageNumbers = Array.from(
    { length: safeTotalPages },
    (_, index) => index + 1,
  );

  const handlePreviousPage = () => {
    onPageChange(Math.max(1, safePage - 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(safeTotalPages, safePage + 1));
  };

  return (
    <footer className="admin-table-footer">
      <span>
        총 <strong>{totalCount}</strong>
        {totalLabel}
      </span>

      <div className="admin-pagination">
        <button
          type="button"
          disabled={safePage === 1}
          onClick={handlePreviousPage}
          aria-label="이전 페이지"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={safePage === pageNumber ? "admin-page-active" : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          disabled={safePage === safeTotalPages}
          onClick={handleNextPage}
          aria-label="다음 페이지"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </footer>
  );
}

export default AdminPagination;
