import { useCallback, useEffect, useState } from "react";

import {
  getAdminMemberCoupons,
  toAdminMemberCouponView,
} from "../../../api/Admin/CouponManagement/adminCouponApi";

const PAGE_SIZE = 8;
const KEYWORD_DEBOUNCE_MS = 400;

function useMemberCouponFilter() {
  const [memberCouponKeyword, setMemberCouponKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [memberCouponStatus, setMemberCouponStatus] = useState("");
  const [memberCouponPage, setMemberCouponPage] = useState(1);

  const [pagedMemberCoupons, setPagedMemberCoupons] = useState([]);
  const [memberCouponTotalCount, setMemberCouponTotalCount] = useState(0);
  const [memberCouponTotalPages, setMemberCouponTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /* 검색어는 타이핑마다 요청하지 않도록 살짝 지연 후 반영 */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(memberCouponKeyword);
    }, KEYWORD_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [memberCouponKeyword]);

  const fetchMemberCoupons = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getAdminMemberCoupons({
        keyword: debouncedKeyword,
        status: memberCouponStatus,
        page: memberCouponPage,
        size: PAGE_SIZE,
      });

      const page = res.data.data;

      setPagedMemberCoupons(
        (page.content ?? []).map(toAdminMemberCouponView)
      );
      setMemberCouponTotalCount(page.totalElements ?? 0);
      setMemberCouponTotalPages(page.totalPages ?? 1);
    } catch (err) {
      setError(
        err.response?.data?.message ?? "발급 내역을 불러오지 못했습니다."
      );
      setPagedMemberCoupons([]);
      setMemberCouponTotalCount(0);
      setMemberCouponTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedKeyword, memberCouponStatus, memberCouponPage]);

  useEffect(() => {
    fetchMemberCoupons();
  }, [fetchMemberCoupons]);

  const handleMemberCouponKeywordChange = (event) => {
    setMemberCouponKeyword(event.target.value);
    setMemberCouponPage(1);
  };

  const handleMemberCouponStatusChange = (event) => {
    setMemberCouponStatus(event.target.value);
    setMemberCouponPage(1);
  };

  const handleMemberCouponPageChange = (page) => {
    setMemberCouponPage(page);
  };

  const handleMemberCouponReset = () => {
    setMemberCouponKeyword("");
    setDebouncedKeyword("");
    setMemberCouponStatus("");
    setMemberCouponPage(1);
  };

  return {
    memberCouponKeyword,
    memberCouponStatus,
    memberCouponPage,
    pagedMemberCoupons,
    memberCouponTotalCount,
    memberCouponTotalPages,
    isLoading,
    error,
    refetchMemberCoupons: fetchMemberCoupons,
    handleMemberCouponKeywordChange,
    handleMemberCouponStatusChange,
    handleMemberCouponPageChange,
    handleMemberCouponReset,
  };
}

export default useMemberCouponFilter;
