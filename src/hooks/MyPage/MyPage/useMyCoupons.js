import { useCallback, useEffect, useState } from 'react';
import {
  getMyCoupons,
  getClaimableCoupons,
  claimCoupon,
  toMyCouponView,
  toClaimableCouponView,
} from '../../../api/couponApi';

export function useMyCoupons() {
  const [myCoupons, setMyCoupons] = useState([]);
  const [claimableCoupons, setClaimableCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claimingId, setClaimingId] = useState(null);
  const [claimError, setClaimError] = useState(null);

  const loadCoupons = useCallback(async () => {
    setIsLoading(true);

    try {
      const [mineRes, claimableRes] = await Promise.all([
        getMyCoupons(),
        getClaimableCoupons(),
      ]);

      const mine = mineRes.data?.data ?? [];
      const claimable = claimableRes.data?.data ?? [];

      setMyCoupons(Array.isArray(mine) ? mine.map(toMyCouponView) : []);
      setClaimableCoupons(
        Array.isArray(claimable) ? claimable.map(toClaimableCouponView) : []
      );
      setError(null);
    } catch (err) {
      setMyCoupons([]);
      setClaimableCoupons([]);
      setError(
        err.response?.data?.message ?? 'クーポン情報の取得に失敗しました。'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  const handleClaim = async (couponId) => {
    setClaimingId(couponId);
    setClaimError(null);

    try {
      await claimCoupon(couponId);
      await loadCoupons();
    } catch (err) {
      setClaimError(
        err.response?.data?.message ?? 'クーポンの受け取りに失敗しました。'
      );
    } finally {
      setClaimingId(null);
    }
  };

  return {
    myCoupons,
    claimableCoupons,
    isLoading,
    error,
    claimingId,
    claimError,
    handleClaim,
  };
}

export default useMyCoupons;
