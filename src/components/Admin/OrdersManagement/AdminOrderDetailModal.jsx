import "../../../assets/styles/Admin/OrdersManagement/AdminOrderDetailModal.css";

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
  CARD: "カード",
  KAKAO_PAY: "カカオペイ",
  BANK_TRANSFER: "銀行振込",
};

const formatAmount = (amount) => {
  return `¥${Number(amount ?? 0).toLocaleString("ja-JP")}`;
};

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleString("ja-JP");
};

function AdminOrderDetailModal({ orderDetail, isLoading, onClose }) {
  const items = orderDetail?.items ?? [];

  const overseasItems = items.filter((item) => item.saleType === "OVERSEAS");

  const groupBuyItems = items.filter((item) => item.saleType === "GROUP_BUY");

  const renderItems = (title, orderItems) => {
    if (orderItems.length === 0) {
      return null;
    }

    return (
      <section className="aod-section">
        <h3>{title}</h3>

        <div className="aod-item-list">
          {orderItems.map((item) => (
            <article key={item.orderItemId} className="aod-item">
              {item.thumbnailUrl ? (
                <img src={item.thumbnailUrl} alt={item.productName} />
              ) : (
                <span className="aod-item-image-empty" />
              )}

              <div className="aod-item-info">
                <strong>{item.productName}</strong>
                <span>数量 {item.quantity}個</span>
              </div>

              <div className="aod-item-price">
                <span>{formatAmount(item.priceJpy)}</span>
                <strong>{formatAmount(item.itemTotal)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div
      className="aod-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="aod-modal"
        role="dialog"
        aria-modal="true"
        aria-label="注文詳細情報"
      >
        <header className="aod-header">
          <div>
            <h2>注文詳細情報</h2>

            {orderDetail && <p>{orderDetail.orderNumber}</p>}
          </div>

          <button
            type="button"
            className="aod-close-button"
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </header>

        {isLoading ? (
          <div className="aod-loading">注文詳細情報を読み込んでいます。</div>
        ) : (
          orderDetail && (
            <div className="aod-content">
              <section className="aod-summary">
                <div>
                  <span>注文種別</span>
                  <strong>
                    {orderTypeText[orderDetail.orderType] ??
                      orderDetail.orderType}
                  </strong>
                </div>

                <div>
                  <span>注文ステータス</span>
                  <strong>
                    {orderStatusText[orderDetail.orderStatus] ??
                      orderDetail.orderStatus}
                  </strong>
                </div>

                <div>
                  <span>注文日時</span>
                  <strong>{formatDate(orderDetail.orderedAt)}</strong>
                </div>
              </section>

              <section className="aod-section">
                <h3>注文者情報</h3>

                <dl className="aod-info-grid">
                  <div>
                    <dt>氏名</dt>
                    <dd>{orderDetail.memberName}</dd>
                  </div>

                  <div>
                    <dt>メールアドレス</dt>
                    <dd>{orderDetail.memberEmail}</dd>
                  </div>

                  <div>
                    <dt>電話番号</dt>
                    <dd>{orderDetail.memberPhone}</dd>
                  </div>
                </dl>
              </section>

              <section className="aod-section">
                <h3>配送先情報</h3>

                <dl className="aod-info-grid">
                  <div>
                    <dt>受取人</dt>
                    <dd>{orderDetail.receiverName}</dd>
                  </div>

                  <div>
                    <dt>連絡先</dt>
                    <dd>{orderDetail.receiverPhone}</dd>
                  </div>

                  <div className="aod-info-wide">
                    <dt>住所</dt>
                    <dd>
                      ({orderDetail.postalCode}) {orderDetail.address}
                      {orderDetail.addressDetail
                        ? ` ${orderDetail.addressDetail}`
                        : ""}
                    </dd>
                  </div>
                </dl>
              </section>

              {renderItems("海外購入商品", overseasItems)}
              {renderItems("共同購入商品", groupBuyItems)}

              <section className="aod-section">
                <h3>決済情報</h3>

                <dl className="aod-info-grid">
                  <div>
                    <dt>決済方法</dt>
                    <dd>
                      {paymentMethodText[orderDetail.paymentMethod] ??
                        orderDetail.paymentMethod}
                    </dd>
                  </div>

                  <div>
                    <dt>決済ステータス</dt>
                    <dd>
                      {paymentStatusText[orderDetail.paymentStatus] ??
                        orderDetail.paymentStatus}
                    </dd>
                  </div>

                  <div>
                    <dt>決済日時</dt>
                    <dd>{formatDate(orderDetail.paidAt)}</dd>
                  </div>

                  <div>
                    <dt>キャンセル日時</dt>
                    <dd>{formatDate(orderDetail.cancelledAt)}</dd>
                  </div>
                </dl>
              </section>

              <section className="aod-section">
                <h3>配送情報</h3>

                <dl className="aod-info-grid">
                  <div>
                    <dt>配送ステータス</dt>
                    <dd>
                      {shippingStatusText[orderDetail.shippingStatus] ??
                        orderDetail.shippingStatus}
                    </dd>
                  </div>

                  <div>
                    <dt>配送会社</dt>
                    <dd>{orderDetail.carrier ?? "-"}</dd>
                  </div>

                  <div>
                    <dt>送り状番号</dt>
                    <dd>{orderDetail.trackingNumber ?? "-"}</dd>
                  </div>

                  <div>
                    <dt>発送日時</dt>
                    <dd>{formatDate(orderDetail.shippedAt)}</dd>
                  </div>

                  <div>
                    <dt>配送完了日時</dt>
                    <dd>{formatDate(orderDetail.deliveredAt)}</dd>
                  </div>
                </dl>
              </section>

              <section className="aod-section aod-amount-section">
                <h3>決済金額</h3>

                <dl>
                  <div>
                    <dt>商品金額</dt>
                    <dd>{formatAmount(orderDetail.productAmount)}</dd>
                  </div>

                  <div>
                    <dt>配送料</dt>
                    <dd>{formatAmount(orderDetail.shippingFee)}</dd>
                  </div>

                  <div>
                    <dt>関税</dt>
                    <dd>{formatAmount(orderDetail.customsDuty)}</dd>
                  </div>

                  <div>
                    <dt>割引金額</dt>
                    <dd>-{formatAmount(orderDetail.discountAmount)}</dd>
                  </div>

                  <div className="aod-total-amount">
                    <dt>最終決済金額</dt>
                    <dd>{formatAmount(orderDetail.totalAmount)}</dd>
                  </div>
                </dl>
              </section>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AdminOrderDetailModal;
