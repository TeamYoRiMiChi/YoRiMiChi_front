import "../../../assets/styles/MyPage/OrderDetailModal.css";
import { useOrderDetail } from "../../../hooks/MyPage/OrderHistory/useOrderDetail";

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
  REFUNDED: "返金完了",
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

const paymentMethodText = {
  CARD: "クレジットカード",
  TRANSFER: "銀行振込",
  KAKAOPAY: "カカオペイ",
  NAVERPAY: "ネイバーペイ",
};

const cancellableOrderStatuses = ["PAID", "PREPARING", "SHIPPING", "DELIVERED"];

const formatAmount = (amount) => {
  return `¥${Number(amount ?? 0).toLocaleString("ja-JP")}`;
};

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleString("ja-JP");
};

function OrderDetailModal({
  orderId,
  onClose,
  onCancel,
  isCancelling = false,
}) {
  const { detail, isLoading, error } = useOrderDetail(orderId);

  const items = detail?.items ?? [];

  const overseasItems = items.filter((item) => item.saleType === "OVERSEAS");

  const groupBuyItems = items.filter((item) => item.saleType === "GROUP_BUY");

  const canCancel =
    detail && cancellableOrderStatuses.includes(detail.orderStatus);

  const handleCancel = async () => {
    if (!onCancel) {
      return;
    }

    const cancelled = await onCancel(orderId);

    if (cancelled) {
      onClose();
    }
  };

  const renderItems = (title, orderItems) => {
    if (orderItems.length === 0) {
      return null;
    }

    return (
      <section className="order_detail_section">
        <h3>{title}</h3>

        <ul className="order_detail_items">
          {orderItems.map((item) => (
            <li className="order_detail_item" key={item.orderItemId}>
              {item.thumbnailUrl ? (
                <img
                  className="order_detail_thumb"
                  src={item.thumbnailUrl}
                  alt={item.productName}
                />
              ) : (
                <div className="order_detail_thumb" aria-hidden="true" />
              )}

              <div className="order_detail_item_info">
                <h4>{item.productName}</h4>
                <p>単価：{formatAmount(item.priceJpy)}</p>
                <p>数量：{item.quantity}個</p>
              </div>

              <strong className="order_detail_item_total">
                {formatAmount(item.itemTotal)}
              </strong>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <div
      className="modal_overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="order_modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order_detail_title"
      >
        <div className="modal_header">
          <div>
            <h2 id="order_detail_title">注文詳細</h2>
            {detail && <p>{detail.orderNumber}</p>}
          </div>

          <button
            type="button"
            className="order_detail_header_close"
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <div className="modal_body">
          {isLoading && (
            <p className="order_detail_status">注文詳細を読み込んでいます。</p>
          )}

          {!isLoading && error && (
            <p className="order_detail_status order_detail_status_error">
              {error}
            </p>
          )}

          {!isLoading && !error && detail && (
            <>
              {/* 주문 기본 정보 */}
              <section className="order_detail_summary">
                <div>
                  <span>注文種別</span>
                  <strong>
                    {orderTypeText[detail.orderType] ?? detail.orderType}
                  </strong>
                </div>

                <div>
                  <span>注文ステータス</span>
                  <strong>
                    {orderStatusText[detail.orderStatus] ?? detail.orderStatus}
                  </strong>
                </div>

                <div>
                  <span>注文日時</span>
                  <strong>{formatDate(detail.orderedAt)}</strong>
                </div>
              </section>

              {/* 주문 상품 */}
              {renderItems("海外購入商品", overseasItems)}
              {renderItems("共同購入商品", groupBuyItems)}

              {/* 주문 시 지정한 수령인과 주소 */}
              <section className="order_detail_section">
                <h3>お届け先</h3>

                <dl className="order_detail_info">
                  <div>
                    <dt>お名前</dt>
                    <dd>{detail.receiverName}</dd>
                  </div>

                  <div>
                    <dt>電話番号</dt>
                    <dd>{detail.receiverPhone}</dd>
                  </div>

                  <div>
                    <dt>郵便番号</dt>
                    <dd>{detail.postalCode}</dd>
                  </div>

                  <div>
                    <dt>住所</dt>
                    <dd>
                      {detail.address}
                      {detail.addressDetail ? ` ${detail.addressDetail}` : ""}
                    </dd>
                  </div>
                </dl>
              </section>

              {/* 결제 금액과 결제 정보 */}
              <section className="order_detail_section">
                <h3>お支払い情報</h3>

                <dl className="order_detail_info">
                  <div>
                    <dt>決済方法</dt>
                    <dd>
                      {paymentMethodText[detail.paymentMethod] ??
                        detail.paymentMethod ??
                        "-"}
                    </dd>
                  </div>

                  <div>
                    <dt>決済ステータス</dt>
                    <dd>
                      {paymentStatusText[detail.paymentStatus] ??
                        detail.paymentStatus ??
                        "-"}
                    </dd>
                  </div>

                  <div>
                    <dt>決済日時</dt>
                    <dd>{formatDate(detail.paidAt)}</dd>
                  </div>

                  <div>
                    <dt>キャンセル日時</dt>
                    <dd>{formatDate(detail.cancelledAt)}</dd>
                  </div>
                </dl>
              </section>

              {/* 배송 정보 */}
              <section className="order_detail_section">
                <h3>配送情報</h3>

                <dl className="order_detail_info">
                  <div>
                    <dt>配送ステータス</dt>
                    <dd>
                      {shippingStatusText[detail.shippingStatus] ??
                        detail.shippingStatus ??
                        "-"}
                    </dd>
                  </div>

                  <div>
                    <dt>配送会社</dt>
                    <dd>{detail.carrier ?? "-"}</dd>
                  </div>

                  <div>
                    <dt>送り状番号</dt>
                    <dd>{detail.trackingNumber ?? "-"}</dd>
                  </div>

                  <div>
                    <dt>発送日時</dt>
                    <dd>{formatDate(detail.shippedAt)}</dd>
                  </div>

                  <div>
                    <dt>配送完了日時</dt>
                    <dd>{formatDate(detail.deliveredAt)}</dd>
                  </div>
                </dl>
              </section>

              <section className="order_detail_section order_detail_amount">
                <h3>決済金額</h3>

                <dl>
                  <div>
                    <dt>商品金額</dt>
                    <dd>{formatAmount(detail.productAmount)}</dd>
                  </div>

                  <div>
                    <dt>送料</dt>
                    <dd>{formatAmount(detail.shippingFee)}</dd>
                  </div>

                  <div>
                    <dt>関税</dt>
                    <dd>{formatAmount(detail.customsDuty)}</dd>
                  </div>

                  <div>
                    <dt>割引金額</dt>
                    <dd>-{formatAmount(detail.discountAmount)}</dd>
                  </div>

                  <div className="order_detail_payment_total">
                    <dt>お支払い合計</dt>
                    <dd>{formatAmount(detail.totalAmount)}</dd>
                  </div>
                </dl>
              </section>
            </>
          )}
        </div>

        <div className="modal_footer">
          {canCancel && onCancel && (
            <button
              type="button"
              className="order_detail_cancel_btn"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "キャンセル中..." : "注文キャンセル"}
            </button>
          )}

          <button
            type="button"
            className="order_detail_close_btn"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;
