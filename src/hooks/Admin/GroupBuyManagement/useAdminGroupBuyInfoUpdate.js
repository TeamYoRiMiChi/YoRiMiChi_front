import { useState } from "react";

import { updateAdminGroupBuy } from "../../../api/Admin/GroupBuyManagement/adminGroupBuyApi";

// 상세 모달의 "모집 정보" 섹션 수정 (제목·설명·목표수량·모집기간)
function useAdminGroupBuyInfoUpdate({ reopenDetail, refetchGroupBuys }) {
  const [isInfoSaving, setIsInfoSaving] = useState(false);

  const handleSaveInfo = async (groupBuyId, updateData) => {
    setIsInfoSaving(true);

    try {
      const response = await updateAdminGroupBuy(groupBuyId, updateData);

      alert(response.data.message ?? "공동구매 정보를 수정했습니다.");

      await reopenDetail(groupBuyId);
      await refetchGroupBuys();

      return true;
    } catch (err) {
      alert(err.response?.data?.message ?? "공동구매 정보 수정에 실패했습니다.");

      return false;
    } finally {
      setIsInfoSaving(false);
    }
  };

  return {
    handleSaveInfo,
    isInfoSaving,
  };
}

export default useAdminGroupBuyInfoUpdate;
