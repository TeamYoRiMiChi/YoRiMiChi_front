import { useCallback, useEffect, useState } from "react";

import {
  getAdminCoupons,
  toAdminCouponView,
} from "../../../api/Admin/CouponManagement/adminCouponApi";

const PAGE_SIZE = 8;
const KEYWORD_DEBOUNCE_MS = 400;

function useCouponFilter() {
  const [couponKeyword, setCouponKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [couponStatus, setCouponStatus] = useState("");
  const [couponPage, setCouponPage] = useState(1);

  const [pagedCoupons, setPagedCoupons] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [couponTotalPages, setCouponTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /* 검색어는 타이핑마다 요청하지 않도록 살짝 지연 후 반영 */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(couponKeyword);
    }, KEYWORD_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [couponKeyword]);

  const fetchCoupons = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getAdminCoupons({
        keyword: debouncedKeyword,
        discountType,
        status: couponStatus,
        page: couponPage,
        size: PAGE_SIZE,
      });

      const page = res.data.data;

      setPagedCoupons((page.content ?? []).map(toAdminCouponView));
      setTotalCount(page.totalElements ?? 0);
      setCouponTotalPages(page.totalPages ?? 1);
    } catch (err) {
      setError(
        err.response?.data?.message ?? "쿠폰 목록을 불러오지 못했습니다."
      );
      setPagedCoupons([]);
      setTotalCount(0);
      setCouponTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedKeyword, discountType, couponStatus, couponPage]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleCouponKeywordChange = (event) => {
    setCouponKeyword(event.target.value);
    setCouponPage(1);
  };

  const handleDiscountTypeChange = (event) => {
    setDiscountType(event.target.value);
    setCouponPage(1);
  };

  const handleCouponStatusChange = (event) => {
    setCouponStatus(event.target.value);
    setCouponPage(1);
  };

  const handleCouponPageChange = (page) => {
    setCouponPage(page);
  };

  const handleCouponReset = () => {
    setCouponKeyword("");
    setDebouncedKeyword("");
    setDiscountType("");
    setCouponStatus("");
    setCouponPage(1);
  };

  return {
    couponKeyword,
    discountType,
    couponStatus,
    couponPage,
    pagedCoupons,
    totalCount,
    couponTotalPages,
    isLoading,
    error,
    refetchCoupons: fetchCoupons,
    handleCouponKeywordChange,
    handleDiscountTypeChange,
    handleCouponStatusChange,
    handleCouponPageChange,
    handleCouponReset,
  };
}

export default useCouponFilter;
