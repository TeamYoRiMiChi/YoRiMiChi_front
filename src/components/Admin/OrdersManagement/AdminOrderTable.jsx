const orderTypeText = {
  NORMAL: "해외직구",
  GROUP_BUY: "공동구매",
  MIXED: "혼합 구매",
};

const orderStatusText = {
  PAID: "결제 완료",
  PREPARING: "상품 준비",
  SHIPPING: "배송 중",
  DELIVERED: "배송 완료",
  CANCELLED: "취소",
  REFUNDED: "환불",
};

const paymentMethodText = {
  CARD: "카드",
  KAKAO_PAY: "카카오페이",
  BANK_TRANSFER: "계좌이체",
};

const paymentStatusText = {
  PAID: "결제 완료",
  CANCELLED: "결제 취소",
  REFUNDED: "환불 완료",
};

const shippingStatusText = {
  PREPARING: "배송 준비",
  SHIPPING: "배송 중",
  DELIVERED: "배송 완료",
  CANCELLED: "배송 취소",
};

const nextOrderStatus = {
  PAID: "PREPARING",
  PREPARING: "SHIPPING",
  SHIPPING: "DELIVERED",
};

const carriers = ["ヤマト運輸", "佐川急便", "日本郵便"];

function AdminOrderTable({
  orders,
  onOpenDetail,
  onOrderStatusChange,
  onPaymentStatusChange,
  onShippingSave,
}) {
  const handleShippingSubmit = (event, orderId) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onShippingSave(orderId, {
      carrier: formData.get("carrier"),
      trackingNumber: formData.get("trackingNumber"),
    });
  };

  return (
    <div className="ao-table-scroll">
      <table className="ao-table">
        <thead>
          <tr>
            <th>주문번호</th>
            <th>주문자</th>
            <th>상품</th>
            <th>주문 유형</th>
            <th>결제금액</th>
            <th>결제정보</th>
            <th>주문상태</th>
            <th>배송정보</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const hasShippingInfo =
              Boolean(order.carrier?.trim()) &&
              Boolean(order.trackingNumber?.trim());

            const nextStatus =
              order.orderStatus === "PREPARING" && !hasShippingInfo
                ? undefined
                : nextOrderStatus[order.orderStatus];

            const extraItemCount = Math.max(Number(order.itemCount) - 1, 0);

            const maxProductNameLength = extraItemCount > 0 ? 12 : 20;

            const shortenedProductName =
              order.firstProductName.length > maxProductNameLength
                ? `${order.firstProductName.slice(0, maxProductNameLength)}...`
                : order.firstProductName;

            const productText =
              extraItemCount > 0
                ? `${shortenedProductName} 외 ${extraItemCount}건`
                : shortenedProductName;

            const orderTypeClass = order.orderType?.toLowerCase() ?? "";

            const orderStatusClass = order.orderStatus?.toLowerCase() ?? "";

            const paymentStatusClass = order.paymentStatus?.toLowerCase() ?? "";

            const shippingStatusClass =
              order.shippingStatus?.toLowerCase() ?? "";

            return (
              <tr key={order.orderId}>
                <td>
                  <button
                    type="button"
                    className="ao-detail-button ao-order-number"
                    onClick={() => onOpenDetail(order.orderId)}
                  >
                    <strong>{order.orderNumber}</strong>
                    <span>주문 ID {order.orderId}</span>
                  </button>
                </td>

                <td>
                  <div className="ao-member-info">
                    <strong>{order.memberName}</strong>
                    <span>{order.memberEmail}</span>
                    <span>{order.memberPhone}</span>
                  </div>
                </td>

                <td>
                  <button
                    type="button"
                    className="ao-detail-button ao-product-info"
                    onClick={() => onOpenDetail(order.orderId)}
                  >
                    {order.firstThumbnailUrl ? (
                      <img
                        src={order.firstThumbnailUrl}
                        alt={order.firstProductName}
                      />
                    ) : (
                      <span className="ao-product-image-empty" />
                    )}

                    <div>
                      <strong title={productText}>{productText}</strong>

                      <span>{order.firstItemQuantity}개</span>
                    </div>
                  </button>
                </td>

                <td>
                  <span className={`ao-type-badge ao-type-${orderTypeClass}`}>
                    {orderTypeText[order.orderType] ?? order.orderType}
                  </span>
                </td>

                <td>
                  <div className="ao-price-info">
                    <strong>
                      ¥{Number(order.totalAmount).toLocaleString("ja-JP")}
                    </strong>

                    {Number(order.discountAmount) > 0 && (
                      <span>
                        할인 ¥
                        {Number(order.discountAmount).toLocaleString("ja-JP")}
                      </span>
                    )}
                  </div>
                </td>

                <td>
                  <div className="ao-payment-info">
                    <span>
                      {paymentMethodText[order.paymentMethod] ??
                        order.paymentMethod}
                    </span>

                    {order.paymentStatus === "CANCELLED" ? (
                      <select
                        value={order.paymentStatus}
                        onChange={(event) =>
                          onPaymentStatusChange(
                            order.orderId,
                            event.target.value,
                          )
                        }
                      >
                        <option value="CANCELLED">결제 취소</option>
                        <option value="REFUNDED">환불 완료</option>
                      </select>
                    ) : (
                      <strong className={`ao-payment-${paymentStatusClass}`}>
                        {paymentStatusText[order.paymentStatus] ??
                          order.paymentStatus}
                      </strong>
                    )}
                  </div>
                </td>

                <td>
                  <select
                    className={`ao-status-select ao-order-${orderStatusClass}`}
                    value={order.orderStatus}
                    disabled={!nextStatus}
                    onChange={(event) =>
                      onOrderStatusChange(order.orderId, event.target.value)
                    }
                  >
                    <option value={order.orderStatus}>
                      {orderStatusText[order.orderStatus] ?? order.orderStatus}
                    </option>

                    {nextStatus && (
                      <option value={nextStatus}>
                        {orderStatusText[nextStatus]}
                      </option>
                    )}
                  </select>
                </td>

                <td>
                  {order.orderStatus === "PREPARING" ? (
                    <form
                      className="ao-shipping-inputs"
                      onSubmit={(event) =>
                        handleShippingSubmit(event, order.orderId)
                      }
                    >
                      <select name="carrier" defaultValue={order.carrier ?? ""}>
                        <option value="">택배사 선택</option>

                        {carriers.map((carrier) => (
                          <option key={carrier} value={carrier}>
                            {carrier}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        name="trackingNumber"
                        defaultValue={order.trackingNumber ?? ""}
                        placeholder="운송장 번호"
                      />

                      <button type="submit">완료</button>
                    </form>
                  ) : (
                    <span
                      className={`ao-shipping-text ao-shipping-${shippingStatusClass}`}
                    >
                      {shippingStatusText[order.shippingStatus] ??
                        order.shippingStatus}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}

          {orders.length === 0 && (
            <tr>
              <td className="ao-empty" colSpan={8}>
                조건에 맞는 주문이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrderTable;
