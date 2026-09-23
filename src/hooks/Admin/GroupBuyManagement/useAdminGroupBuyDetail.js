import { useState } from "react";

import { getAdminGroupBuyDetail } from "../../../api/Admin/GroupBuyManagement/adminGroupBuyApi";

function useAdminGroupBuyDetail() {
  const [detail, setDetail] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const openDetail = async (groupBuyId) => {
    setIsDetailOpen(true);
    setIsDetailLoading(true);
    setDetail(null);

    try {
      const response = await getAdminGroupBuyDetail(groupBuyId);
      setDetail(response.data.data);
    } catch (err) {
      setIsDetailOpen(false);

      alert(
        err.response?.data?.message ?? "共同購入の詳細情報を取得できませんでした。",
      );
    } finally {
      setIsDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setDetail(null);
  };

  return {
    detail,
    isDetailLoading,
    isDetailOpen,
    openDetail,
    closeDetail,
  };
}

export default useAdminGroupBuyDetail;
