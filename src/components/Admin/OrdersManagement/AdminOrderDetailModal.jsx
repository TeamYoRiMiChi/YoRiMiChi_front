import "../../../assets/styles/Admin/OrdersManagement/AdminOrderDetailModal.css";

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

const paymentMethodText = {
  CARD: "카드",
  KAKAO_PAY: "카카오페이",
  BANK_TRANSFER: "계좌이체",
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
                <span>수량 {item.quantity}개</span>
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
        aria-label="주문 상세정보"
      >
        <header className="aod-header">
          <div>
            <h2>주문 상세정보</h2>

            {orderDetail && <p>{orderDetail.orderNumber}</p>}
          </div>

          <button
            type="button"
            className="aod-close-button"
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        </header>

        {isLoading ? (
          <div className="aod-loading">주문 상세정보를 불러오는 중입니다.</div>
        ) : (
          orderDetail && (
            <div className="aod-content">
              <section className="aod-summary">
                <div>
                  <span>주문 유형</span>
                  <strong>
                    {orderTypeText[orderDetail.orderType] ??
                      orderDetail.orderType}
                  </strong>
                </div>

                <div>
                  <span>주문 상태</span>
                  <strong>
                    {orderStatusText[orderDetail.orderStatus] ??
                      orderDetail.orderStatus}
                  </strong>
                </div>

                <div>
                  <span>주문 일시</span>
                  <strong>{formatDate(orderDetail.orderedAt)}</strong>
                </div>
              </section>

              <section className="aod-section">
                <h3>주문자 정보</h3>

                <dl className="aod-info-grid">
                  <div>
                    <dt>이름</dt>
                    <dd>{orderDetail.memberName}</dd>
                  </div>

                  <div>
                    <dt>이메일</dt>
                    <dd>{orderDetail.memberEmail}</dd>
                  </div>

                  <div>
                    <dt>전화번호</dt>
                    <dd>{orderDetail.memberPhone}</dd>
                  </div>
                </dl>
              </section>

              <section className="aod-section">
                <h3>배송지 정보</h3>

                <dl className="aod-info-grid">
                  <div>
                    <dt>수령인</dt>
                    <dd>{orderDetail.receiverName}</dd>
                  </div>

                  <div>
                    <dt>연락처</dt>
                    <dd>{orderDetail.receiverPhone}</dd>
                  </div>

                  <div className="aod-info-wide">
                    <dt>주소</dt>
                    <dd>
                      ({orderDetail.postalCode}) {orderDetail.address}
                      {orderDetail.addressDetail
                        ? ` ${orderDetail.addressDetail}`
                        : ""}
                    </dd>
                  </div>
                </dl>
              </section>

              {renderItems("해외직구 상품", overseasItems)}
              {renderItems("공동구매 상품", groupBuyItems)}

              <section className="aod-section">
                <h3>결제 정보</h3>

                <dl className="aod-info-grid">
                  <div>
                    <dt>결제 수단</dt>
                    <dd>
                      {paymentMethodText[orderDetail.paymentMethod] ??
                        orderDetail.paymentMethod}
                    </dd>
                  </div>

                  <div>
                    <dt>결제 상태</dt>
                    <dd>
                      {paymentStatusText[orderDetail.paymentStatus] ??
                        orderDetail.paymentStatus}
                    </dd>
                  </div>

                  <div>
                    <dt>결제 일시</dt>
                    <dd>{formatDate(orderDetail.paidAt)}</dd>
                  </div>

                  <div>
                    <dt>취소 일시</dt>
                    <dd>{formatDate(orderDetail.cancelledAt)}</dd>
                  </div>
                </dl>
              </section>

              <section className="aod-section">
                <h3>배송 정보</h3>

                <dl className="aod-info-grid">
                  <div>
                    <dt>배송 상태</dt>
                    <dd>
                      {shippingStatusText[orderDetail.shippingStatus] ??
                        orderDetail.shippingStatus}
                    </dd>
                  </div>

                  <div>
                    <dt>택배사</dt>
                    <dd>{orderDetail.carrier ?? "-"}</dd>
                  </div>

                  <div>
                    <dt>운송장 번호</dt>
                    <dd>{orderDetail.trackingNumber ?? "-"}</dd>
                  </div>

                  <div>
                    <dt>발송 일시</dt>
                    <dd>{formatDate(orderDetail.shippedAt)}</dd>
                  </div>

                  <div>
                    <dt>배송 완료 일시</dt>
                    <dd>{formatDate(orderDetail.deliveredAt)}</dd>
                  </div>
                </dl>
              </section>

              <section className="aod-section aod-amount-section">
                <h3>결제 금액</h3>

                <dl>
                  <div>
                    <dt>상품 금액</dt>
                    <dd>{formatAmount(orderDetail.productAmount)}</dd>
                  </div>

                  <div>
                    <dt>배송비</dt>
                    <dd>{formatAmount(orderDetail.shippingFee)}</dd>
                  </div>

                  <div>
                    <dt>관세</dt>
                    <dd>{formatAmount(orderDetail.customsDuty)}</dd>
                  </div>

                  <div>
                    <dt>할인 금액</dt>
                    <dd>-{formatAmount(orderDetail.discountAmount)}</dd>
                  </div>

                  <div className="aod-total-amount">
                    <dt>최종 결제금액</dt>
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
