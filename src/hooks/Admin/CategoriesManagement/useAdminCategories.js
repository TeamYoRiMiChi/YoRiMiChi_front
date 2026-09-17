import { useCallback, useEffect, useState } from "react";

import { getAdminCategories } from "../../../api/Admin/CategoriesManagement/adminCategoryApi";

function useAdminCategories() {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getAdminCategories({
        keyword: debouncedKeyword,
        page,
        size: 10,
      });

      const pageData = response.data.data ?? {};

      setCategories(pageData.content ?? []);
      setTotalCount(pageData.totalElements ?? 0);
      setTotalPages(pageData.totalPages ?? 1);
    } catch (err) {
      setCategories([]);
      setTotalCount(0);
      setTotalPages(1);

      setError(
        err.response?.data?.message ?? "カテゴリー情報の取得に失敗しました。",
      );
    } finally {
      setIsLoading(false);
    }
  }, [debouncedKeyword, page]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  const handleReset = () => {
    setKeyword("");
    setDebouncedKeyword("");
    setPage(1);
  };

  return {
    categories,
    setCategories,
    keyword,
    page,
    totalCount,
    totalPages,
    isLoading,
    error,
    handleKeywordChange,
    handlePageChange,
    handleReset,
    refetchCategories: fetchCategories,
  };
}

export default useAdminCategories;
