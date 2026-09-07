import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MOCK_ADDRESS,
  MOCK_CUSTOMS_CODE,
  MOCK_ORDER_ITEMS,
  MOCK_COUPONS,
  MOCK_AVAILABLE_POINT,
  PAYMENT_METHODS,
} from '../../data/Order/orderData';

/**
 * 주문/결제 페이지 로직
 *
 * 배송 메모, 쿠폰, 포인트, 결제 수단 선택을 관리하고
 * 최종 결제 금액을 계산합니다.
 *
 * 금액 계산은 실제 서비스에서 서버가 다시 검증해야 합니다.
 * 프론트 값만 믿으면 사용자가 금액을 조작할 수 있기 때문입니다.
 */
export function useOrder() {
  const navigate = useNavigate();

  const address = MOCK_ADDRESS;
  const customsCode = MOCK_CUSTOMS_CODE;
  const items = MOCK_ORDER_ITEMS;
  const availablePoint = MOCK_AVAILABLE_POINT;

  const [deliveryMemo, setDeliveryMemo] = useState('');
  const [couponId, setCouponId] = useState(0);
  const [pointInput, setPointInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ===== 금액 계산 ===== */
  const amounts = useMemo(() => {
    const productAmount = items.reduce(
      (sum, item) => sum + item.priceKrw * item.quantity,
      0
    );
    const overseasShipping = items.reduce(
      (sum, item) => sum + (item.overseasShipping ?? 0),
      0
    );
    const domesticShipping = items.reduce(
      (sum, item) => sum + (item.domesticShipping ?? 0),
      0
    );

    const coupon = MOCK_COUPONS.find((c) => c.id === couponId);
    const couponDiscount = coupon?.discount ?? 0;

    /* 입력한 포인트는 보유 포인트와 결제 가능 금액을 넘지 못합니다 */
    const beforePoint =
      productAmount + overseasShipping + domesticShipping - couponDiscount;

    const requested = Number(pointInput) || 0;
    const usedPoint = Math.max(
      0,
      Math.min(requested, availablePoint, beforePoint)
    );

    return {
      productAmount,
      overseasShipping,
      domesticShipping,
      couponDiscount,
      usedPoint,
      total: beforePoint - usedPoint,
    };
  }, [items, couponId, pointInput, availablePoint]);

  /* ===== 핸들러 ===== */

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

  const handleChangeAddress = () => {
    // TODO: 배송지 목록 모달 연동
    alert('배송지 변경 기능은 준비 중입니다.');
  };

  const handleSubmit = async () => {
    if (!agreed) {
      alert('주문 내용 확인 및 결제 동의가 필요합니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: POST /api/orders 연동
      await new Promise((resolve) => setTimeout(resolve, 600));

      alert(`${amounts.total.toLocaleString()}원 결제가 완료되었습니다.`);
      navigate('/mypage');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // 데이터
    address,
    customsCode,
    items,
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
    handleChangeAddress,
    handleSubmit,
  };
}

export default useOrder;
