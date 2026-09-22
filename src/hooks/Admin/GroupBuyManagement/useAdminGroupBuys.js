import { useCallback, useEffect, useState } from "react";

import { getAdminGroupBuys } from "../../../api/Admin/GroupBuyManagement/adminGroupBuyApi";

function useAdminGroupBuys() {
  const [groupBuys, setGroupBuys] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState("");
  const [sortBy, setSortBy] = useState("GROUP_BUY_ID");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 검색어는 400ms 디바운스해서 요청합니다 (다른 관리자 목록 페이지와 동일한 방식).
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  const fetchGroupBuys = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getAdminGroupBuys({
        keyword: debouncedKeyword,
        status,
        progress,
        sortBy,
        sortDirection,
        page,
        size: 10,
      });

      const pageData = response.data.data ?? {};

      setGroupBuys(pageData.content ?? []);
      setTotalCount(pageData.totalElements ?? 0);
      // totalElements가 0이면 백엔드가 totalPages를 0으로 내려주므로,
      // 페이지네이션이 사라지지 않도록 최소 1페이지로 보정합니다.
      setTotalPages(Math.max(1, pageData.totalPages ?? 1));
    } catch (err) {
      setGroupBuys([]);
      setTotalCount(0);
      setTotalPages(1);

      setError(
        err.response?.data?.message ?? "공동구매 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [debouncedKeyword, status, progress, sortBy, sortDirection, page]);

  useEffect(() => {
    fetchGroupBuys();
  }, [fetchGroupBuys]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleProgressChange = (event) => {
    setProgress(event.target.value);
    setPage(1);
  };

  // 정렬 컬럼 헤더 클릭: 같은 컬럼이면 방향만 토글, 다른 컬럼이면 오름차순부터 시작합니다.
  const handleSortClick = (columnKey) => {
    if (sortBy === columnKey) {
      setSortDirection((current) => (current === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(columnKey);
      setSortDirection("ASC");
    }

    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  const handleReset = () => {
    setKeyword("");
    setDebouncedKeyword("");
    setStatus("");
    setProgress("");
    setSortBy("GROUP_BUY_ID");
    setSortDirection("DESC");
    setPage(1);
  };

  return {
    groupBuys,
    keyword,
    status,
    progress,
    sortBy,
    sortDirection,
    page,
    totalCount,
    totalPages,
    isLoading,
    error,
    handleKeywordChange,
    handleStatusChange,
    handleProgressChange,
    handleSortClick,
    handlePageChange,
    handleReset,
    refetchGroupBuys: fetchGroupBuys,
  };
}

export default useAdminGroupBuys;
