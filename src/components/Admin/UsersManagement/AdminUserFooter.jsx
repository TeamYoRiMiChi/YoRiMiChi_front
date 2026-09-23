import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function AdminUserFooter({
    selectedIds,
    isAllSelected,
    handleSelectAll,
    handleBulkStatusChange,
    filteredCount,
    page,
    totalPages,
    setPage,
}) {
    return (
        <footer className="am-table-footer">


          <div className="am-bulk-actions">


            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={
                handleSelectAll
              }
            />


            <select
              defaultValue=""
              disabled={
                selectedIds.length === 0
              }
              onChange={
                handleBulkStatusChange
              }
            >

              <option
                value=""
                disabled
              >
                選択した会員の状態を変更
              </option>

              <option value="ACTIVE">
                有効
              </option>

              <option value="INACTIVE">
                退会
              </option>

            </select>


            <span>

              該当会員{" "}

              <strong>
                {filteredCount}
              </strong>

              名

            </span>


          </div>



          {/* 페이지네이션 */}

          <div className="am-pagination">


            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (current) =>
                    Math.max(
                      1,
                      current - 1
                    )
                )
              }
            >

              <FontAwesomeIcon
                icon={faChevronLeft}
              />

            </button>



            {Array.from(
              {
                length:
                  totalPages,
              },
              (_, index) =>
                index + 1
            ).map(
              (pageNumber) => (

                <button
                  key={pageNumber}
                  type="button"
                  className={
                    page ===
                    pageNumber
                      ? "am-page-active"
                      : ""
                  }
                  onClick={() =>
                    setPage(
                      pageNumber
                    )
                  }
                >

                  {pageNumber}

                </button>

              )
            )}



            <button
              type="button"
              disabled={
                page ===
                totalPages
              }
              onClick={() =>
                setPage(
                  (current) =>
                    Math.min(
                      totalPages,
                      current + 1
                    )
                )
              }
            >

              <FontAwesomeIcon
                icon={faChevronRight}
              />

            </button>


          </div>


        </footer>
    );
}

export default AdminUserFooter;