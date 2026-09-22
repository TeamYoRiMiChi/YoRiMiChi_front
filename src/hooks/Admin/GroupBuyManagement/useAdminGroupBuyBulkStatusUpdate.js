import { useState } from "react";

import { updateAdminGroupBuyStatus } from "../../../api/Admin/GroupBuyManagement/adminGroupBuyApi";

// 목록에서 체크박스로 고른 여러 건의 상태를 한 번에 변경합니다.
function useAdminGroupBuyBulkStatusUpdate({
  selectedIds,
  clearSelection,
  refetchGroupBuys,
  refetchSummary,
}) {
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const handleBulkStatusChange = async (event) => {
    const nextStatus = event.target.value;
    event.target.value = "";

    if (!nextStatus || selectedIds.length === 0 || isBulkUpdating) {
      return;
    }

    setIsBulkUpdating(true);

    try {
      const results = await Promise.allSettled(
        selectedIds.map((groupBuyId) =>
          updateAdminGroupBuyStatus(groupBuyId, nextStatus),
        ),
      );

      const failedCount = results.filter(
        (result) => result.status === "rejected",
      ).length;

      if (failedCount > 0) {
        alert(
          `${selectedIds.length}건 중 ${failedCount}건은 상태 변경에 실패했습니다.`,
        );
      }

      clearSelection();
      await refetchGroupBuys();
      await refetchSummary();
    } finally {
      setIsBulkUpdating(false);
    }
  };

  return {
    handleBulkStatusChange,
    isBulkUpdating,
  };
}

export default useAdminGroupBuyBulkStatusUpdate;
