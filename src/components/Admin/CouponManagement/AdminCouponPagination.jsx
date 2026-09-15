import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "../../../assets/styles/Admin/CouponManagement/components/AdminCouponPagination.css";

function AdminCouponPagination({
  totalCount,
  totalLabel,
  page,
  totalPages,
  onPageChange,
}) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePreviousPage = () => {
    onPageChange(Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(totalPages, page + 1));
  };

  return (
    <footer className="acp-table-footer">
      <span>
        총 <strong>{totalCount}</strong>
        {totalLabel}
      </span>

      <div className="acp-pagination">
        <button
          type="button"
          disabled={page === 1}
          onClick={handlePreviousPage}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={page === pageNumber ? "acp-page-active" : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          disabled={page === totalPages}
          onClick={handleNextPage}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </footer>
  );
}

export default AdminCouponPagination;
