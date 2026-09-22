import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faClock,
  faMagnifyingGlass,
  faPlus,
  faRotateRight,
  faSort,
  faSortDown,
  faSortUp,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import AdminStatusBox from "../../../components/Admin/common/Admin_statusBox";
import AdminGroupBuyDetailModal from "../../../components/Admin/GroupBuyManagement/AdminGroupBuyDetailModal";
import AdminGroupBuyCreateForm from "../../../components/Admin/GroupBuyManagement/AdminGroupBuyCreateForm";

import useAdminGroupBuys from "../../../hooks/Admin/GroupBuyManagement/useAdminGroupBuys";
import useAdminGroupBuySelection from "../../../hooks/Admin/GroupBuyManagement/useAdminGroupBuySelection";
import useAdminGroupBuySummary from "../../../hooks/Admin/GroupBuyManagement/useAdminGroupBuySummary";
import useAdminGroupBuyDetail from "../../../hooks/Admin/GroupBuyManagement/useAdminGroupBuyDetail";
import useAdminGroupBuyInfoUpdate from "../../../hooks/Admin/GroupBuyManagement/useAdminGroupBuyInfoUpdate";
import useAdminGroupBuyStatusUpdate from "../../../hooks/Admin/GroupBuyManagement/useAdminGroupBuyStatusUpdate";
import useAdminGroupBuyBulkStatusUpdate from "../../../hooks/Admin/GroupBuyManagement/useAdminGroupBuyBulkStatusUpdate";
import useAdminGroupBuyProducts from "../../../hooks/Admin/GroupBuyManagement/useAdminGroupBuyProducts";
import useAdminGroupBuyCreate from "../../../hooks/Admin/GroupBuyManagement/useAdminGroupBuyCreate";
import useAdminGroupBuyDelete from "../../../hooks/Admin/GroupBuyManagement/useAdminGroupBuyDelete";

import "./AdminGroupBuy.css";

// 목록 헤더에서 클릭으로 정렬 방향을 바꿀 수 있는 컬럼들
const SORTABLE_COLUMNS = [
  { key: "PRODUCT_NAME", label: "공동구매 정보" },
  { key: "GROUP_BUY_ID", label: "공동구매 ID" },
  { key: "CREATOR_NAME", label: "등록자" },
  { key: "START_DATE", label: "모집 기간" },
];

const statusText = {
  RECRUITING: "모집 중",
  SUCCESS: "공동구매 성공",
  FAILED: "모집 실패",
  CANCELLED: "취소",
};

function formatDate(dateValue) {
  if (!dateValue) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(dateValue));
}

function AdminGroupBuy() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const {
    groupBuys,
    keyword,
    status,
    progress,
    sortBy,
    sortDirection,
    page,
    totalCount,
    totalPages,
    isLoading,
    error,
    handleKeywordChange,
    handleStatusChange,
    handleProgressChange,
    handleSortClick,
    handlePageChange,
    handleReset,
    refetchGroupBuys,
  } = useAdminGroupBuys();

  const {
    selectedIds,
    isAllSelected,
    handleSelectAll,
    handleSelectItem,
    removeFromSelection,
    clearSelection,
  } = useAdminGroupBuySelection(groupBuys);

  const { summary, refetchSummary } = useAdminGroupBuySummary();

  const { detail, isDetailLoading, isDetailOpen, openDetail, closeDetail } =
    useAdminGroupBuyDetail();

  const { handleSaveInfo, isInfoSaving } = useAdminGroupBuyInfoUpdate({
    reopenDetail: openDetail,
    refetchGroupBuys,
  });

  const { handleChangeStatus, isStatusSaving } = useAdminGroupBuyStatusUpdate({
    reopenDetail: openDetail,
    refetchGroupBuys,
    refetchSummary,
  });

  const { handleBulkStatusChange, isBulkUpdating } =
    useAdminGroupBuyBulkStatusUpdate({
      selectedIds,
      clearSelection,
      refetchGroupBuys,
      refetchSummary,
    });

  const { groupBuyProducts } = useAdminGroupBuyProducts();

  const { handleRegister, isCreating } = useAdminGroupBuyCreate({
    refetchGroupBuys,
    refetchSummary,
  });

  const { handleDelete, isDeleting } = useAdminGroupBuyDelete({
    groupBuys,
    page,
    handlePageChange,
    removeFromSelection,
    refetchGroupBuys,
    refetchSummary,
  });

  const summaryItems = [
    {
      key: "total",
      label: "전체 공동구매",
      value: summary.total,
      icon: faUsers,
      color: "blue",
    },
    {
      key: "recruiting",
      label: "모집 중",
      value: summary.recruiting,
      icon: faBullhorn,
      color: "green",
    },
    {
      key: "success",
      label: "공동구매 성공",
      value: summary.success,
      icon: faCheckCircle,
      color: "orange",
    },
    {
      key: "finished",
      label: "종료·취소",
      value: summary.finished,
      icon: faClock,
      color: "red",
    },
  ];

  const isBusy = isLoading || isBulkUpdating || isDeleting;
  const isDetailSaving = isInfoSaving || isStatusSaving;

  const handleCreateSubmit = async (registerData) => {
    const ok = await handleRegister(registerData);

    if (ok) {
      setIsCreateFormOpen(false);
      handlePageChange(1);
    }

    return ok;
  };

  return (
    <div className="agb-page">
      <header className="agb-page-header">
        <div>
          <h2>공동구매 관리</h2>
          <p>공동구매 모집 현황과 참여 상태를 관리하세요.</p>
        </div>

        <button
          className="agb-create-button"
          type="button"
          onClick={() => setIsCreateFormOpen((current) => !current)}
          disabled={isCreating}
        >
          <FontAwesomeIcon icon={faPlus} />
          공동구매 등록
        </button>
      </header>

      <AdminStatusBox items={summaryItems} />

      {isCreateFormOpen && (
        <AdminGroupBuyCreateForm
          products={groupBuyProducts}
          isSaving={isCreating}
          onSubmit={handleCreateSubmit}
          onClose={() => setIsCreateFormOpen(false)}
        />
      )}

      <section className="agb-panel">
        <div className="agb-filter-bar">
          <label className="agb-search-box">
            <FontAwesomeIcon icon={faMagnifyingGlass} />

            <input
              type="search"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="공동구매명, 상품명 또는 등록자 검색"
              disabled={isBusy}
            />
          </label>

          <div className="agb-filter-item">
            <span>진행 상태</span>

            <select
              value={status}
              onChange={handleStatusChange}
              disabled={isBusy}
            >
              <option value="">전체</option>
              <option value="RECRUITING">모집 중</option>
              <option value="SUCCESS">공동구매 성공</option>
              <option value="FAILED">모집 실패</option>
              <option value="CANCELLED">취소</option>
            </select>
          </div>

          <div className="agb-filter-item">
            <span>달성률</span>

            <select
              value={progress}
              onChange={handleProgressChange}
              disabled={isBusy}
            >
              <option value="">전체</option>
              <option value="UNDER_50">50% 미만</option>
              <option value="OVER_50">50% 이상</option>
              <option value="COMPLETE">100% 달성</option>
            </select>
          </div>

          <button
            className="agb-reset-button"
            type="button"
            onClick={handleReset}
            disabled={isBusy}
          >
            <FontAwesomeIcon icon={faRotateRight} />
            초기화
          </button>
        </div>

        <div className="agb-table-scroll">
          <table className="agb-table">
            <thead>
              <tr>
                <th className="agb-checkbox-cell">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    aria-label="전체 공동구매 선택"
                  />
                </th>

                {SORTABLE_COLUMNS.map((column) => (
                  <th key={column.key}>
                    <button
                      type="button"
                      className={`agb-sort-button${sortBy === column.key ? " agb-sort-active" : ""}`}
                      onClick={() => handleSortClick(column.key)}
                      disabled={isBusy}
                    >
                      {column.label}
                      <FontAwesomeIcon
                        icon={
                          sortBy !== column.key
                            ? faSort
                            : sortDirection === "ASC"
                              ? faSortUp
                              : faSortDown
                        }
                      />
                    </button>
                  </th>
                ))}
                <th>수량·달성률</th>
                <th>참여자</th>
                <th>진행 상태</th>
                <th>관리</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td className="agb-empty" colSpan={9}>
                    불러오는 중입니다...
                  </td>
                </tr>
              )}

              {!isLoading && error && (
                <tr>
                  <td className="agb-empty" colSpan={9}>
                    {error}
                  </td>
                </tr>
              )}

              {!isLoading &&
                !error &&
                groupBuys.map((groupBuy) => {
                  const progressRate = !groupBuy.targetQuantity
                    ? 0
                    : Math.min(
                        100,
                        Math.round(
                          (groupBuy.currentQuantity /
                            groupBuy.targetQuantity) *
                            100,
                        ),
                      );

                  return (
                    <tr
                      key={groupBuy.groupBuyId}
                      className="agb-row"
                      onClick={() => openDetail(groupBuy.groupBuyId)}
                    >
                      <td
                        className="agb-checkbox-cell"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(groupBuy.groupBuyId)}
                          onChange={() =>
                            handleSelectItem(groupBuy.groupBuyId)
                          }
                          aria-label={`${groupBuy.title} 선택`}
                        />
                      </td>

                      <td>
                        <div className="agb-product-info">
                          <img
                            src={groupBuy.thumbnailUrl || undefined}
                            alt={groupBuy.productName}
                          />

                          <div>
                            <strong>{groupBuy.title}</strong>
                            <p>{groupBuy.productName}</p>
                            <span>{groupBuy.productNameJp}</span>
                          </div>
                        </div>
                      </td>

                      <td className="agb-id">{groupBuy.groupBuyId}</td>

                      <td>
                        <div className="agb-creator-info">
                          <strong>{groupBuy.creatorName ?? "-"}</strong>
                          <span>{groupBuy.creatorEmail ?? "-"}</span>
                        </div>
                      </td>

                      <td>
                        <div className="agb-period">
                          <span>{formatDate(groupBuy.startDate)}</span>
                          <i>~</i>
                          <span>{formatDate(groupBuy.endDate)}</span>
                        </div>
                      </td>

                      <td>
                        <div className="agb-progress-info">
                          <div className="agb-progress-label">
                            <strong>{groupBuy.currentQuantity}</strong>
                            <span>/ {groupBuy.targetQuantity}</span>
                            <b>{progressRate}%</b>
                          </div>

                          <div className="agb-progress-bar">
                            <span style={{ width: `${progressRate}%` }} />
                          </div>
                        </div>
                      </td>

                      <td>
                        <strong className="agb-count">
                          {groupBuy.participantCount ?? 0}명
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`agb-status-badge agb-status-${(groupBuy.status ?? "").toLowerCase()}`}
                        >
                          {statusText[groupBuy.status] ?? groupBuy.status}
                        </span>
                      </td>

                      <td onClick={(event) => event.stopPropagation()}>
                        <button
                          type="button"
                          className="agb-delete-button"
                          onClick={() => handleDelete(groupBuy)}
                          disabled={isDeleting}
                          aria-label={`${groupBuy.title} 삭제`}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {!isLoading && !error && groupBuys.length === 0 && (
                <tr>
                  <td className="agb-empty" colSpan={9}>
                    조건에 맞는 공동구매가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="agb-table-footer">
          <div className="agb-bulk-actions">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              aria-label="전체 공동구매 선택"
              disabled={isBusy}
            />

            <select
              defaultValue=""
              disabled={selectedIds.length === 0 || isBusy}
              onChange={handleBulkStatusChange}
            >
              <option value="" disabled>
                선택 상태 변경
              </option>
              <option value="RECRUITING">모집 중</option>
              <option value="SUCCESS">공동구매 성공</option>
              <option value="FAILED">모집 실패</option>
              <option value="CANCELLED">취소</option>
            </select>

            <span>총 {totalCount}개 공동구매</span>
          </div>

          <div className="agb-pagination">
            <button
              type="button"
              disabled={page === 1 || isBusy}
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              aria-label="이전 페이지"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className={page === pageNumber ? "agb-page-active" : ""}
                  disabled={isBusy}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={page === totalPages || isBusy}
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              aria-label="다음 페이지"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </footer>
      </section>

      {isDetailOpen && (
        <AdminGroupBuyDetailModal
          detail={detail}
          isLoading={isDetailLoading}
          isSaving={isDetailSaving}
          onClose={closeDetail}
          onSaveInfo={handleSaveInfo}
          onChangeStatus={handleChangeStatus}
        />
      )}
    </div>
  );
}

export default AdminGroupBuy;
