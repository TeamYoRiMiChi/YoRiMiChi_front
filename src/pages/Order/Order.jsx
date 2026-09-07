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

  return (
    <div className="order-page">
      <div className="order-page-head">
        <h1>주문 / 결제</h1>
        <OrderSteps current="order" />
      </div>

      <div className="order-layout">
        {/* 왼쪽: 입력 영역 */}
        <div className="order-main">
          <ShippingInfo
            address={address}
            memo={deliveryMemo}
            onMemoChange={setDeliveryMemo}
            onChangeAddress={handleChangeAddress}
          />

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
        />
      </div>
    </div>
  );
}

export default Order;
