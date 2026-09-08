import { Link } from 'react-router-dom';
import OrderSteps from '../../components/Order/OrderSteps';
import ShippingInfo from '../../components/Order/ShippingInfo';
import CustomsInfo from '../../components/Order/CustomsInfo';
import OrderItems from '../../components/Order/OrderItems';
import CouponPoint from '../../components/Order/CouponPoint';
import PaymentMethod from '../../components/Order/PaymentMethod';
import PaymentSummary from '../../components/Order/PaymentSummary';
import { useOrder } from '../../hooks/Order/useOrder';
import '../../assets/styles/Order/Order.css';

function Order() {
  const {
    address,
    customsCode,
    items,
    isLoading,
    loadError,

    coupons,
    availablePoint,
    paymentMethods,

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

    amounts,

    handlePointChange,
    handleUseAllPoint,
    handleChangeAddress,
    handleSubmit,
  } = useOrder();

  /* 불러오는 중 */
  if (isLoading) {
    return (
      <div className="order-page">
        <div className="order-state">読み込み中...</div>
      </div>
    );
  }

  /* 실패했거나 장바구니가 비었을 때 */
  if (loadError || items.length === 0) {
    return (
      <div className="order-page">
        <div className="order-state">
          <p>{loadError ?? 'カートに商品がありません。'}</p>
          <Link to="/overseas" className="order-state-btn">
            商品を見る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-page-head">
        <h1>주문 / 결제</h1>
        <OrderSteps current="order" />
      </div>

      <div className="order-layout">
        {/* 왼쪽: 입력 영역 */}
        <div className="order-main">
          {address ? (
            <ShippingInfo
              address={address}
              memo={deliveryMemo}
              onMemoChange={setDeliveryMemo}
              onChangeAddress={handleChangeAddress}
            />
          ) : (
            <div className="order-notice">
              배송지가 등록되어 있지 않습니다. 마이페이지에서 먼저 등록해 주세요.
            </div>
          )}

          <CustomsInfo code={customsCode} />

          <OrderItems items={items} />

          <CouponPoint
            coupons={coupons}
            couponId={couponId}
            onCouponChange={setCouponId}
            availablePoint={availablePoint}
            pointInput={pointInput}
            onPointChange={handlePointChange}
            onUseAllPoint={handleUseAllPoint}
            amounts={amounts}
          />

          <PaymentMethod
            methods={paymentMethods}
            selected={paymentMethod}
            onSelect={setPaymentMethod}
          />
        </div>

        {/* 오른쪽: 결제 금액 */}
        <PaymentSummary
          amounts={amounts}
          agreed={agreed}
          onAgreeChange={setAgreed}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          disabled={!address || !customsCode}
        />
      </div>
    </div>
  );
}

export default Order;
