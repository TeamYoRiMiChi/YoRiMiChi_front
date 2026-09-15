import { useCallback, useEffect, useState } from "react";

import { getAdminCouponSummary } from "../../../api/Admin/CouponManagement/adminCouponApi";

const EMPTY_SUMMARY = {
  totalCoupons: 0,
  activeCoupons: 0,
  expiredCoupons: 0,
  stoppedCoupons: 0,
  issuedMemberCoupons: 0,
};

function useCouponSummary() {
  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSummary = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await getAdminCouponSummary();
      const data = res.data.data ?? {};

      setSummary({
        totalCoupons: data.totalCoupons ?? 0,
        activeCoupons: data.activeCoupons ?? 0,
        expiredCoupons: data.expiredCoupons ?? 0,
        stoppedCoupons: data.stoppedCoupons ?? 0,
        issuedMemberCoupons: data.issuedMemberCoupons ?? 0,
      });
    } catch (err) {
      setSummary(EMPTY_SUMMARY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { summary, isLoading, refetchSummary: fetchSummary };
}

export default useCouponSummary;
