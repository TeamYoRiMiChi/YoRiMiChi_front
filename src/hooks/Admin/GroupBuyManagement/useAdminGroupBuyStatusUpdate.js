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

      alert(response.data.message ?? "共同購入のステータスを変更しました。");

      await reopenDetail(groupBuyId);
      await refetchGroupBuys();
      await refetchSummary();
    } catch (err) {
      alert(err.response?.data?.message ?? "共同購入のステータス変更に失敗しました。");
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
