import { useState } from "react";

import { updateAdminGroupBuy } from "../../../api/Admin/GroupBuyManagement/adminGroupBuyApi";

// 상세 모달의 "모집 정보" 섹션 수정 (제목·설명·목표수량·모집기간)
function useAdminGroupBuyInfoUpdate({ reopenDetail, refetchGroupBuys }) {
  const [isInfoSaving, setIsInfoSaving] = useState(false);

  const handleSaveInfo = async (groupBuyId, updateData) => {
    setIsInfoSaving(true);

    try {
      const response = await updateAdminGroupBuy(groupBuyId, updateData);

      alert(response.data.message ?? "共同購入情報を修正しました。");

      await reopenDetail(groupBuyId);
      await refetchGroupBuys();

      return true;
    } catch (err) {
      alert(err.response?.data?.message ?? "共同購入情報の修正に失敗しました。");

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
