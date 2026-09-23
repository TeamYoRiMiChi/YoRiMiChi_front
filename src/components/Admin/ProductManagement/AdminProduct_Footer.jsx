import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function AdminProductTableFooter({
  selectedCount,
  totalCount,
  isAllSelected,
  page,
  totalPages,
  onSelectAll,
  onDelete,
  onStatusChange,
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
    <footer className="ap-table-footer">
      <div className="ap-bulk-actions">
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={onSelectAll}
          aria-label="全商品選択"
        />

        <button
          className="ap-delete-button"
          type="button"
          disabled={selectedCount === 0}
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          選択削除
        </button>


        <span className="ap-total-text">
          合計 {totalCount}件の商品
        </span>
      </div>

      <div className="ap-pagination">
        <button
          type="button"
          disabled={page === 1}
          onClick={handlePreviousPage}
          aria-label="前のページ"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={
              page === pageNumber
                ? "ap-page-active"
                : ""
            }
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          disabled={page === totalPages}
          onClick={handleNextPage}
          aria-label="次のページ"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </footer>
  );
}

export default AdminProductTableFooter;
