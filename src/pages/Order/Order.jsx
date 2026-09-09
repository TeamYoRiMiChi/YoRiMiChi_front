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
    isDirectPurchase,

    address,
    customsCode,
    items,
    isLoading,
    loadError,

    useManualAddress,
    manualAddress,
    addressErrors,
    handleManualAddressChange,
    toggleManualAddress,
    copyFromSavedAddress,

    customsInput,
    setCustomsInput,

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
    handleSubmit,
  } = useOrder();

  /* 불러오는 중 */
  if (isLoading) {
    return (
      <div className="order-page">
        <div className="order-state">읽어오는 중...</div>
      </div>
    );
  }

  /* 실패했거나 주문할 상품이 없을 때 */
  if (loadError || items.length === 0) {
    return (
      <div className="order-page">
        <div className="order-state">
          <p>{loadError ?? '주문할 상품이 없습니다.'}</p>
          <Link to="/overseas" className="order-state-btn">
            상품 보러 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-page-head">
        <div className="order-page-title">
          <h1>주문 / 결제</h1>
          {isDirectPurchase && <span className="order-badge">바로구매</span>}
        </div>
        <OrderSteps current="order" showCart={!isDirectPurchase} />
      </div>

      <div className="order-layout">
        {/* 왼쪽: 입력 영역 */}
        <div className="order-main">
          <ShippingInfo
            address={address}
            useManual={useManualAddress}
            manualAddress={manualAddress}
            errors={addressErrors}
            onManualChange={handleManualAddressChange}
            onToggleManual={toggleManualAddress}
            onCopyFromSaved={copyFromSavedAddress}
            memo={deliveryMemo}
            onMemoChange={setDeliveryMemo}
          />

          <CustomsInfo
            code={customsCode}
            input={customsInput}
            onChange={setCustomsInput}
          />

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
