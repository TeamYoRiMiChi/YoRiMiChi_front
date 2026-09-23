import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCheckout, createOrder, toCheckoutView } from '../../api/orderApi';
import { getMyCoupons, toMyCouponView } from '../../api/couponApi';
import { fetchCart } from '../../features/cart/cartSlice';
import { PAYMENT_METHODS } from '../../data/Order/orderData';

/**
 * 쿠폰 할인 금액 계산
 *
 * FIXED면 정액, PERCENT면 상품 금액에 비율을 곱하고 maxDiscountAmount로 상한을 둡니다.
 * 상품 금액(minOrderAmount 기준)에 못 미치거나 쿠폰이 없으면 0원입니다.
 */
function calcCouponDiscount(coupon, productAmount) {
  if (!coupon) return 0;
  if (productAmount < coupon.minOrderAmount) return 0;

  let discount;
  if (coupon.discountType === 'PERCENT') {
    discount = Math.floor((productAmount * coupon.discountValue) / 100);
    if (coupon.maxDiscountAmount > 0) {
      discount = Math.min(discount, coupon.maxDiscountAmount);
    }
  } else {
    discount = coupon.discountValue;
  }

  return Math.min(discount, productAmount);
}

const EMPTY_ADDRESS = {
  receiverName: '',
  receiverPhone: '',
  postalCode: '',
  address: '',
  addressDetail: '',
};

/**
 * 주문/결제 페이지 로직
 *
 * 주문 방식이 두 가지입니다.
 *   - 바로구매 : /order/:productId?quantity=2 → 그 상품만
 *   - 장바구니 : /order                      → 담긴 상품 전체
 *
 * 배송지는 저장된 것을 쓰거나 직접 입력할 수 있습니다.
 *
 * 최종 결제 금액은 서버가 다시 계산합니다.
 * 여기서 만든 금액은 화면 표시용입니다.
 */
export function useOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ===== 주문 대상 판별 ===== */
  const { productId } = useParams();
  const [searchParams] = useSearchParams();

  const directProductId = productId ? Number(productId) : null;
  const directQuantity = Number(searchParams.get('quantity')) || 1;
  const isDirectPurchase = Boolean(directProductId);
  const cartSaleType = searchParams.get('saleType');
  const cartItemIdsKey = isDirectPurchase ? '' : (searchParams.get('cartItemIds') ?? '');
  const cartItemIds = useMemo(() => (cartItemIdsKey
        .split(',')
        .map(Number)
        .filter((id) => Number.isInteger(id) && id > 0)), [cartItemIdsKey]);

  /* ===== 서버 데이터 ===== */
  const [checkout, setCheckout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  /* ===== 배송지 ===== */
  const [useManualAddress, setUseManualAddress] = useState(false);
  const [manualAddress, setManualAddress] = useState(EMPTY_ADDRESS);
  const [addressErrors, setAddressErrors] = useState({});

  /* ===== 통관부호 =====
   * 日本は通関番号不要 — 일본은 통관부호가 필요 없어 기능을 비활성화합니다.
   * 나중에 다시 필요해질 수도 있어 삭제하지 않고 주석 처리만 해둡니다.
  const [customsInput, setCustomsInput] = useState('');
  const [customsError, setCustomsError] = useState('');
  */

  /* ===== 사용자 입력 ===== */
  const [deliveryMemo, setDeliveryMemo] = useState('');
  const [couponId, setCouponId] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ===== 보유 쿠폰 ===== */
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadCoupons() {
      try {
        const res = await getMyCoupons();
        const mine = res.data?.data ?? [];
        const available = (Array.isArray(mine) ? mine.map(toMyCouponView) : [])
          .filter((c) => c.status === 'AVAILABLE');

        if (!ignore) setCoupons(available);
      } catch {
        if (!ignore) setCoupons([]);
      }
    }

    loadCoupons();

    return () => {
      ignore = true;
    };
  }, []);

  /* ===== 주문서 불러오기 ===== */
  useEffect(() => {
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const res = await getCheckout({
          productId: directProductId,
          quantity: directQuantity,
          saleType: cartSaleType,
          cartItemIds,
        });

        if (ignore) return;

        const view = toCheckoutView(res.data.data);
        setCheckout(view);

        /* 저장된 배송지가 없으면 직접 입력 모드로 시작 */
        if (!view.address) setUseManualAddress(true);
      } catch (err) {
        if (!ignore) {
          setLoadError(err.response?.data?.message ?? '注文情報の取得に失敗しました。');
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    window.scrollTo({ top: 0 });

    return () => {
      ignore = true;
    };
  }, [directProductId, directQuantity, cartSaleType, cartItemIds]);

  /* ===== 사용 가능한 쿠폰 (상품 금액이 최소 주문 금액 이상인 것만) ===== */
  const selectableCoupons = useMemo(() => {
    const productAmount = checkout?.serverAmounts?.productAmount ?? 0;
    return coupons.filter((c) => productAmount >= c.minOrderAmount);
  }, [coupons, checkout]);

  /* 상품 금액이 바뀌어 선택된 쿠폰을 더 이상 쓸 수 없게 되면 선택을 해제합니다 */
  useEffect(() => {
    if (couponId === 0) return;
    if (!selectableCoupons.some((c) => c.memberCouponId === couponId)) {
      setCouponId(0);
    }
  }, [selectableCoupons, couponId]);

  /* ===== 금액 계산 ===== */
  const amounts = useMemo(() => {
    const base = checkout?.serverAmounts ?? {
      productAmount: 0,
      overseasShipping: 0,
      domesticShipping: 0,
      customsDuty: 0,
      total: 0,
    };

    const coupon = coupons.find((c) => c.memberCouponId === couponId);
    const couponDiscount = calcCouponDiscount(coupon, base.productAmount);

    return {
      ...base,
      couponDiscount,
      total: Math.max(0, base.total - couponDiscount),
    };
  }, [checkout, coupons, couponId]);

  /* ===== 배송지 핸들러 ===== */

  const handleManualAddressChange = (field, value) => {
    setManualAddress((cur) => ({ ...cur, [field]: value }));
    setAddressErrors((cur) => ({ ...cur, [field]: undefined }));
  };

  /** 저장된 주소 ↔ 직접 입력 전환 */
  const toggleManualAddress = () => {
    /* 저장된 주소가 없으면 직접 입력에서 벗어날 수 없습니다 */
    if (useManualAddress && !checkout?.address) return;
    setUseManualAddress((cur) => !cur);
    setAddressErrors({});
  };

  /** 저장된 주소 값을 입력칸에 채워 넣습니다 (수정해서 쓰기 편하도록) */
  const copyFromSavedAddress = () => {
    if (!checkout?.address) return;
    setManualAddress({
      receiverName: checkout.address.receiverName ?? '',
      receiverPhone: checkout.address.receiverPhone ?? '',
      postalCode: checkout.address.postalCode ?? '',
      address: checkout.address.address ?? '',
      addressDetail: checkout.address.addressDetail ?? '',
    });
  };

  const validateAddress = () => {
    if (!useManualAddress) return true;

    const errors = {};
    if (!manualAddress.receiverName.trim()) errors.receiverName = 'お届け先名を入力してください。';
    if (!manualAddress.receiverPhone.trim()) errors.receiverPhone = '連絡先を入力してください。';
    if (!manualAddress.postalCode.trim()) errors.postalCode = '郵便番号を入力してください。';
    if (!manualAddress.address.trim()) errors.address = '住所を入力してください。';

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ===== 주문 ===== */

  const handleSubmit = async () => {
    if (!agreed) {
      alert('注文内容の確認と決済への同意が必要です。');
      return;
    }

    if (!validateAddress()) {
      alert('配送先情報を確認してください。');
      return;
    }

    /* 일본은 통관부호가 필요 없어 검증을 비활성화합니다. (나중을 위해 주석으로 보존)
    if (!checkout?.customsCode && !customsInput.trim()) {
      setCustomsError('個人通関固有符号を入力してください。');
      return;
    }

    if (!checkout?.customsCode && !/^P\d{12}$/.test(customsInput.trim())) {
      setCustomsError('Pで始まる13桁の番号を入力してください。');
      return;
    }

    setCustomsError('');
    */

    setIsSubmitting(true);

    try {
      const res = await createOrder({
        productId: directProductId,
        quantity: directQuantity,
        saleType: cartSaleType,
        cartItemIds,

        addressId: useManualAddress ? null : checkout?.address?.addressId,
        manualAddress: useManualAddress ? manualAddress : null,

        customsCode: null, // 일본은 통관부호 불필요 — 원래 로직: checkout?.customsCode ? null : customsInput.trim()
        deliveryMemo,
        memberCouponId: couponId || null,
        paymentMethod,
      });

      const order = res.data.data;

      /* 장바구니 주문이었으면 서버에서 비워졌으므로 상태를 갱신합니다 */
      if (!isDirectPurchase) {
        dispatch(fetchCart());
      }

      navigate(`/order/complete/${order.orderId}`, {
        replace: true,
        state: { order, isDirectPurchase },
      });
    } catch (err) {
      alert(err.response?.data?.message ?? '注文に失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // 주문 방식
    isDirectPurchase,
    cartSaleType,

    // 서버 데이터
    address: checkout?.address ?? null,
    customsCode: checkout?.customsCode ?? null,
    items: checkout?.items ?? [],
    exchangeRate: checkout?.exchangeRate ?? 0,

    isLoading,
    loadError,

    // 배송지
    useManualAddress,
    manualAddress,
    addressErrors,
    handleManualAddressChange,
    toggleManualAddress,
    copyFromSavedAddress,

    // 통관부호 (일본은 불필요 — 주석 처리, 위 state 선언부와 함께 참고)
    // customsInput,
    // setCustomsInput: (value) => {
    //   setCustomsInput(value);
    //   if (value.trim()) setCustomsError('');
    // },
    // customsError,

    // 화면 전용 데이터
    coupons: selectableCoupons,
    paymentMethods: PAYMENT_METHODS,

    // 상태
    deliveryMemo,
    setDeliveryMemo,
    couponId,
    setCouponId,
    paymentMethod,
    setPaymentMethod,
    agreed,
    setAgreed,
    isSubmitting,

    // 계산 결과
    amounts,

    // 핸들러
    handleSubmit,
  };
}

export default useOrder;
