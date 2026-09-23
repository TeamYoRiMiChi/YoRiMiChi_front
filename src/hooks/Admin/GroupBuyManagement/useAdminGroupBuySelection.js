import { useState } from "react";

// 목록 체크박스 선택 상태 (선택한 항목의 일괄 상태 변경에 사용됩니다)
function useAdminGroupBuySelection(groupBuys) {
  const [selectedIds, setSelectedIds] = useState([]);

  const visibleIds = groupBuys.map((groupBuy) => groupBuy.groupBuyId);

  const isAllSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !visibleIds.includes(id)),
      );
      return;
    }

    setSelectedIds((current) => [...new Set([...current, ...visibleIds])]);
  };

  const handleSelectItem = (groupBuyId) => {
    setSelectedIds((current) =>
      current.includes(groupBuyId)
        ? current.filter((id) => id !== groupBuyId)
        : [...current, groupBuyId],
    );
  };

  const removeFromSelection = (groupBuyId) => {
    setSelectedIds((current) => current.filter((id) => id !== groupBuyId));
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  return {
    selectedIds,
    isAllSelected,
    handleSelectAll,
    handleSelectItem,
    removeFromSelection,
    clearSelection,
  };
}

export default useAdminGroupBuySelection;
