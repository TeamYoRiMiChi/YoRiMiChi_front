import { useRef, useState } from "react";

import { deleteAdminGroupBuy } from "../../../api/Admin/GroupBuyManagement/adminGroupBuyApi";

// 삭제: 참여자가 있으면 백엔드가 막고, 그 메시지를 그대로 보여줍니다.
function useAdminGroupBuyDelete({
  groupBuys,
  page,
  handlePageChange,
  removeFromSelection,
  refetchGroupBuys,
  refetchSummary,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deletingRef = useRef(false);

  const handleDelete = async (groupBuy) => {
    if (deletingRef.current) {
      return;
    }

    const confirmed = window.confirm(
      `「${groupBuy.title}」の共同購入を削除しますか?`,
    );

    if (!confirmed) {
      return;
    }

    deletingRef.current = true;
    setIsDeleting(true);

    try {
      const response = await deleteAdminGroupBuy(groupBuy.groupBuyId);

      alert(response.data.message ?? "共同購入を削除しました。");

      removeFromSelection(groupBuy.groupBuyId);

      if (groupBuys.length === 1 && page > 1) {
        handlePageChange(page - 1);
      } else {
        await refetchGroupBuys();
      }

      await refetchSummary();
    } catch (err) {
      alert(err.response?.data?.message ?? "共同購入の削除に失敗しました。");
    } finally {
      deletingRef.current = false;
      setIsDeleting(false);
    }
  };

  return {
    handleDelete,
    isDeleting,
  };
}

export default useAdminGroupBuyDelete;
