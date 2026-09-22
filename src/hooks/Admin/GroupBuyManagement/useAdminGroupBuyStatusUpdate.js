import { useState } from "react";

import { updateAdminGroupBuyStatus } from "../../../api/Admin/GroupBuyManagement/adminGroupBuyApi";

// 상세 모달에서 공동구매 1건의 상태를 강제로 변경합니다.
function useAdminGroupBuyStatusUpdate({
  reopenDetail,
  refetchGroupBuys,
  refetchSummary,
}) {
  const [isStatusSaving, setIsStatusSaving] = useState(false);

  const handleChangeStatus = async (groupBuyId, nextStatus) => {
    setIsStatusSaving(true);

    try {
      const response = await updateAdminGroupBuyStatus(groupBuyId, nextStatus);

      alert(response.data.message ?? "공동구매 상태를 변경했습니다.");

      await reopenDetail(groupBuyId);
      await refetchGroupBuys();
      await refetchSummary();
    } catch (err) {
      alert(err.response?.data?.message ?? "공동구매 상태 변경에 실패했습니다.");
    } finally {
      setIsStatusSaving(false);
    }
  };

  return {
    handleChangeStatus,
    isStatusSaving,
  };
}

export default useAdminGroupBuyStatusUpdate;
