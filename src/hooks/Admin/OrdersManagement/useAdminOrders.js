import { useCallback, useEffect, useState } from "react";

import { getAdminOrders } from "../../../api/Admin/OrdersManagement/adminOrderApi";

function useAdminOrders() {
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [orderType, setOrderType] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [shippingStatus, setShippingStatus] = useState("");
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

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getAdminOrders({
        keyword: debouncedKeyword,
        orderType,
        orderStatus,
        shippingStatus,
        page,
        size: 10,
      });

      const pageData = response.data.data ?? {};

      setOrders(pageData.content ?? []);
      setTotalCount(pageData.totalElements ?? 0);
      setTotalPages(pageData.totalPages ?? 1);
    } catch (err) {
      setOrders([]);
      setTotalCount(0);
      setTotalPages(1);

      setError(err.response?.data?.message ?? "注文情報の取得に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedKeyword, orderType, orderStatus, shippingStatus, page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setPage(1);
  };

  const handleOrderTypeChange = (event) => {
    setOrderType(event.target.value);
    setPage(1);
  };

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
    setPage(1);
  };

  const handleShippingStatusChange = (event) => {
    setShippingStatus(event.target.value);
    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  const handleReset = () => {
    setKeyword("");
    setDebouncedKeyword("");
    setOrderType("");
    setOrderStatus("");
    setShippingStatus("");
    setPage(1);
  };

  return {
    orders,
    keyword,
    orderType,
    orderStatus,
    shippingStatus,
    page,
    totalCount,
    totalPages,
    isLoading,
    error,
    handleKeywordChange,
    handleOrderTypeChange,
    handleOrderStatusChange,
    handleShippingStatusChange,
    handlePageChange,
    handleReset,
    refetchOrders: fetchOrders,
  };
}

export default useAdminOrders;
