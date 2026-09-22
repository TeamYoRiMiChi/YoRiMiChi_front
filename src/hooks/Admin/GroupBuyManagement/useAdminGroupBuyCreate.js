import { useState } from "react";

import { createGroupBuy } from "../../../api/Admin/GroupBuyManagement/adminGroupBuyApi";

// 공동구매 등록: 이미 "공동구매"로 등록된 기존 상품에 새 모집 라운드를 엽니다.
// (상품 자체 생성은 상품관리의 createAdminProduct를 사용합니다.)
function useAdminGroupBuyCreate({ refetchGroupBuys, refetchSummary }) {
  const [isCreating, setIsCreating] = useState(false);

  const handleRegister = async (registerData) => {
    setIsCreating(true);

    try {
      const response = await createGroupBuy(registerData);

      alert(response.data.message ?? "공동구매가 등록되었습니다.");

      await refetchGroupBuys();
      await refetchSummary();

      return true;
    } catch (err) {
      alert(err.response?.data?.message ?? "공동구매 등록에 실패했습니다.");

      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    handleRegister,
    isCreating,
  };
}

export default useAdminGroupBuyCreate;
