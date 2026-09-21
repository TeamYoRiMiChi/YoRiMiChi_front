const orderTypeText = {
  NORMAL: "海外購入",
  GROUP_BUY: "共同購入",
  MIXED: "混合注文",
};

const orderStatusText = {
  PAID: "決済完了",
  PREPARING: "商品準備中",
  SHIPPING: "配送中",
  DELIVERED: "配送完了",
  CANCELLED: "キャンセル",
  REFUNDED: "返金",
};

const paymentMethodText = {
  CARD: "カード",
  KAKAO_PAY: "カカオペイ",
  BANK_TRANSFER: "銀行振込",
};

const paymentStatusText = {
  PAID: "決済完了",
  CANCELLED: "決済キャンセル",
  REFUNDED: "返金完了",
};

const shippingStatusText = {
  PREPARING: "発送準備中",
  SHIPPING: "配送中",
  DELIVERED: "配送完了",
  CANCELLED: "配送キャンセル",
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
            <th>注文番号</th>
            <th>注文者</th>
            <th>商品</th>
            <th>注文種別</th>
            <th>決済金額</th>
            <th>決済情報</th>
            <th>注文ステータス</th>
            <th>配送情報</th>
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
                ? `${shortenedProductName}　他${extraItemCount}件`
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
                    <span>注文ID {order.orderId}</span>
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

                      <span>{order.firstItemQuantity}個</span>
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
                        割引 ¥
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
                        <option value="CANCELLED">決済キャンセル</option>
                        <option value="REFUNDED">返金完了</option>
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
                        <option value="">配送会社を選択</option>

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
                        placeholder="送り状番号"
                      />

                      <button type="submit">完了</button>
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
                条件に一致する注文がありません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrderTable;
