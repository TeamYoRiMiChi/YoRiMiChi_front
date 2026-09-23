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
  { key: "PRODUCT_NAME", label: "共同購入情報" },
  { key: "GROUP_BUY_ID", label: "共同購入ID" },
  { key: "CREATOR_NAME", label: "登録者" },
  { key: "START_DATE", label: "募集期間" },
];

const statusText = {
  RECRUITING: "募集中",
  SUCCESS: "共同購入成立",
  FAILED: "募集失敗",
  CANCELLED: "キャンセル",
};

function formatDate(dateValue) {
  if (!dateValue) {
    return "-";
  }

  return new Intl.DateTimeFormat("ja-JP", {
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
      label: "全共同購入",
      value: summary.total,
      icon: faUsers,
      color: "blue",
    },
    {
      key: "recruiting",
      label: "募集中",
      value: summary.recruiting,
      icon: faBullhorn,
      color: "green",
    },
    {
      key: "success",
      label: "共同購入成立",
      value: summary.success,
      icon: faCheckCircle,
      color: "orange",
    },
    {
      key: "finished",
      label: "終了・キャンセル",
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
          <h2>共同購入管理</h2>
          <p>共同購入の募集状況と参加状況を管理してください。</p>
        </div>

        <button
          className="agb-create-button"
          type="button"
          onClick={() => setIsCreateFormOpen((current) => !current)}
          disabled={isCreating}
        >
          <FontAwesomeIcon icon={faPlus} />
          共同購入登録
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
              placeholder="共同購入名、商品名または登録者で検索"
              disabled={isBusy}
            />
          </label>

          <div className="agb-filter-item">
            <span>進行状況</span>

            <select
              value={status}
              onChange={handleStatusChange}
              disabled={isBusy}
            >
              <option value="">すべて</option>
              <option value="RECRUITING">募集中</option>
              <option value="SUCCESS">共同購入成立</option>
              <option value="FAILED">募集失敗</option>
              <option value="CANCELLED">キャンセル</option>
            </select>
          </div>

          <div className="agb-filter-item">
            <span>達成率</span>

            <select
              value={progress}
              onChange={handleProgressChange}
              disabled={isBusy}
            >
              <option value="">すべて</option>
              <option value="UNDER_50">50%未満</option>
              <option value="OVER_50">50%以上</option>
              <option value="COMPLETE">100%達成</option>
            </select>
          </div>

          <button
            className="agb-reset-button"
            type="button"
            onClick={handleReset}
            disabled={isBusy}
          >
            <FontAwesomeIcon icon={faRotateRight} />
            リセット
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
                    aria-label="全共同購入を選択"
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
                <th>数量・達成率</th>
                <th>参加者</th>
                <th>進行状況</th>
                <th>管理</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td className="agb-empty" colSpan={9}>
                    読み込み中です...
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
                          aria-label={`${groupBuy.title}を選択`}
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
                          {groupBuy.participantCount ?? 0}名
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
                          aria-label={`${groupBuy.title}を削除`}
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
                    条件に合う共同購入がありません。
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
              aria-label="全共同購入を選択"
              disabled={isBusy}
            />

            <select
              defaultValue=""
              disabled={selectedIds.length === 0 || isBusy}
              onChange={handleBulkStatusChange}
            >
              <option value="" disabled>
                選択項目のステータス変更
              </option>
              <option value="RECRUITING">募集中</option>
              <option value="SUCCESS">共同購入成立</option>
              <option value="FAILED">募集失敗</option>
              <option value="CANCELLED">キャンセル</option>
            </select>

            <span>合計 {totalCount}件の共同購入</span>
          </div>

          <div className="agb-pagination">
            <button
              type="button"
              disabled={page === 1 || isBusy}
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              aria-label="前のページ"
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
              aria-label="次のページ"
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
