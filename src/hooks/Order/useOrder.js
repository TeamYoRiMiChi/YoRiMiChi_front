import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCheckout, createOrder, toCheckoutView } from '../../api/orderApi';
import { fetchCart } from '../../features/cart/cartSlice';
import {
  PAYMENT_METHODS,
  MOCK_COUPONS,
  MOCK_AVAILABLE_POINT,
} from '../../data/Order/orderData';

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
  const cartSaleType = isDirectPurchase ? null : searchParams.get('saleType');
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

  /* ===== 통관부호 ===== */
  const [customsInput, setCustomsInput] = useState('');

  /* ===== 사용자 입력 ===== */
  const [deliveryMemo, setDeliveryMemo] = useState('');
  const [couponId, setCouponId] = useState(0);
  const [pointInput, setPointInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availablePoint = MOCK_AVAILABLE_POINT;

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

  /* ===== 금액 계산 ===== */
  const amounts = useMemo(() => {
    const base = checkout?.serverAmounts ?? {
      productAmount: 0,
      overseasShipping: 0,
      domesticShipping: 0,
      customsDuty: 0,
      total: 0,
    };

    const coupon = MOCK_COUPONS.find((c) => c.id === couponId);
    const couponDiscount = coupon?.discount ?? 0;

    /* 입력한 포인트는 보유 포인트와 결제 가능 금액을 넘지 못합니다 */
    const beforePoint = Math.max(0, base.total - couponDiscount);
    const requested = Number(pointInput) || 0;
    const usedPoint = Math.max(0, Math.min(requested, availablePoint, beforePoint));

    return {
      ...base,
      couponDiscount,
      usedPoint,
      total: beforePoint - usedPoint,
    };
  }, [checkout, couponId, pointInput, availablePoint]);

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
    if (!manualAddress.receiverName.trim()) errors.receiverName = '받는 분을 입력해주세요.';
    if (!manualAddress.receiverPhone.trim()) errors.receiverPhone = '연락처를 입력해주세요.';
    if (!manualAddress.postalCode.trim()) errors.postalCode = '우편번호를 입력해주세요.';
    if (!manualAddress.address.trim()) errors.address = '주소를 입력해주세요.';

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ===== 포인트 핸들러 ===== */

  /** 숫자만 입력받고, 보유 포인트를 넘지 않게 잘라냅니다 */
  const handlePointChange = (value) => {
    const onlyNumber = value.replace(/[^0-9]/g, '');
    if (onlyNumber === '') {
      setPointInput('');
      return;
    }
    setPointInput(String(Math.min(Number(onlyNumber), availablePoint)));
  };

  const handleUseAllPoint = () => {
    setPointInput(String(availablePoint));
  };

  /* ===== 주문 ===== */

  const handleSubmit = async () => {
    if (!agreed) {
      alert('주문 내용 확인 및 결제 동의가 필요합니다.');
      return;
    }

    if (!validateAddress()) {
      alert('배송지 정보를 확인해주세요.');
      return;
    }

    /* 회원 정보에 통관부호가 없으면 입력값이 필요합니다 */
    if (!checkout?.customsCode && !customsInput.trim()) {
      alert('개인통관고유부호를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createOrder({
        productId: directProductId,
        quantity: directQuantity,
        saleType: cartSaleType,
        cartItemIds,

        addressId: useManualAddress ? null : checkout?.address?.addressId,
        manualAddress: useManualAddress ? manualAddress : null,

        customsCode: checkout?.customsCode ? null : customsInput.trim(),
        deliveryMemo,
        paymentMethod,
      });

      const order = res.data.data;

      /* 장바구니 주문이었으면 서버에서 비워졌으므로 상태를 갱신합니다 */
      if (!isDirectPurchase) {
        dispatch(fetchCart());
      }

      alert(`주문이 완료되었습니다.\n주문번호: ${order.orderNumber}`);
      navigate('/mypage');
    } catch (err) {
      alert(err.response?.data?.message ?? '주문에 실패했습니다.');
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

    // 통관부호
    customsInput,
    setCustomsInput,

    // 화면 전용 데이터
    coupons: MOCK_COUPONS,
    availablePoint,
    paymentMethods: PAYMENT_METHODS,

    // 상태
    deliveryMemo,
    setDeliveryMemo,
    couponId,
    setCouponId,
    pointInput,
    paymentMethod,
    setPaymentMethod,
    agreed,
    setAgreed,
    isSubmitting,

    // 계산 결과
    amounts,

    // 핸들러
    handlePointChange,
    handleUseAllPoint,
    handleSubmit,
  };
}

export default useOrder;
