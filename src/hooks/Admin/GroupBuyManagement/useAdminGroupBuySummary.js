import { useCallback, useEffect, useState } from "react";

import { getAdminGroupBuys } from "../../../api/Admin/GroupBuyManagement/adminGroupBuyApi";

const initialSummary = {
  total: 0,
  recruiting: 0,
  success: 0,
  finished: 0,
};

// 요약 카드는 현재 페이지가 아니라 필터 없는 전체 기준이어야 하므로,
// 상태별로 한 번씩만 조회해서 개수를 채웁니다.
function useAdminGroupBuySummary() {
  const [summary, setSummary] = useState(initialSummary);

  const fetchSummary = useCallback(async () => {
    try {
      const [totalRes, recruitingRes, successRes, failedRes, cancelledRes] =
        await Promise.all([
          getAdminGroupBuys({ page: 1, size: 1 }),
          getAdminGroupBuys({ status: "RECRUITING", page: 1, size: 1 }),
          getAdminGroupBuys({ status: "SUCCESS", page: 1, size: 1 }),
          getAdminGroupBuys({ status: "FAILED", page: 1, size: 1 }),
          getAdminGroupBuys({ status: "CANCELLED", page: 1, size: 1 }),
        ]);

      const countOf = (res) => res.data.data?.totalElements ?? 0;

      setSummary({
        total: countOf(totalRes),
        recruiting: countOf(recruitingRes),
        success: countOf(successRes),
        finished: countOf(failedRes) + countOf(cancelledRes),
      });
    } catch {
      // 요약 카드는 부가 정보라 실패해도 목록 화면 자체는 그대로 둡니다.
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary,
    refetchSummary: fetchSummary,
  };
}

export default useAdminGroupBuySummary;
