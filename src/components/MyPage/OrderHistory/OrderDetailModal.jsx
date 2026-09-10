import '../../../assets/styles/MyPage/OrderDetailModal.css';
import { useOrderDetail } from '../../../hooks/MyPage/OrderHistory/useOrderDetail';

function OrderDetailModal({ orderId, onClose }) {
  const { detail, isLoading, error } = useOrderDetail(orderId);

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div
        className="order_modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order_detail_title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal_header">
          <h2 id="order_detail_title">注文詳細</h2>
        </div>

        <div className="modal_body">
          {detail && (
            <>
              {/* 주문 기본 정보 */}
              <section className="order_detail_section">
                <h3>注文情報</h3>

                <dl className="order_detail_info">
                  <div>
                    <dt>注文ID</dt>
                    <dd>{detail.orderId}</dd>
                  </div>
                  <div>
                    <dt>注文番号</dt>
                    <dd>{detail.orderNumber}</dd>
                  </div>
                  <div>
                    <dt>注文日時</dt>
                    <dd>{detail.orderedAt}</dd>
                  </div>
                  <div>
                    <dt>注文状況</dt>
                    <dd>{detail.orderStatus}</dd>
                  </div>
                </dl>
              </section>

              {/* 주문 상품 */}
              <section className="order_detail_section">
                <h3>注文商品</h3>

                <ul className="order_detail_items">
                  {detail.items.map((item) => (
                    <li className="order_detail_item" key={item.orderItemId}>
                      <div className="order_detail_thumb" aria-hidden="true" />

                      <div className="order_detail_item_info">
                        <h4>{item.productName}</h4>
                        <p>単価：{Number(item.priceJpy).toLocaleString()}￥</p>
                        <p>数量：{item.quantity}</p>
                      </div>

                      <strong className="order_detail_item_total">
                        {Number(item.itemTotal).toLocaleString()}￥
                      </strong>
                    </li>
                  ))}
                </ul>
              </section>

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
                      {detail.addressDetail ? ` ${detail.addressDetail}` : ''}
                    </dd>
                  </div>
                  <div>
                    <dt>個人通関固有符号</dt>
                    <dd>{detail.personalCustomsCode ?? '未登録'}</dd>
                  </div>
                </dl>
              </section>

              {/* 결제 금액과 결제 정보 */}
              <section className="order_detail_section">
                <h3>お支払い情報</h3>

                <dl className="order_detail_info">
                  <div>
                    <dt>商品合計</dt>
                    <dd>{Number(detail.productAmount).toLocaleString()}￥</dd>
                  </div>
                  <div>
                    <dt>送料</dt>
                    <dd>{Number(detail.shippingFee).toLocaleString()}￥</dd>
                  </div>
                  <div>
                    <dt>関税</dt>
                    <dd>{Number(detail.customsDuty).toLocaleString()}￥</dd>
                  </div>
                  <div className="order_detail_payment_total">
                    <dt>お支払い合計</dt>
                    <dd>
                      <strong>
                        {Number(detail.totalAmount).toLocaleString()}￥
                      </strong>
                    </dd>
                  </div>
                  {detail.payment ? (
                    <>
                      <div>
                        <dt>お支払い方法</dt>
                        <dd>{detail.payment.paymentMethod}</dd>
                      </div>

                      <div>
                        <dt>お支払い状況</dt>
                        <dd>{detail.payment.paymentStatus}</dd>
                      </div>
                    </>
                  ) : (
                    <div>
                      <dt>決済情報</dt>
                      <dd>決済情報がありません。</dd>
                    </div>
                  )}
                </dl>
              </section>

              {/* 배송 정보 */}
              <section className="order_detail_section">
                <h3>配送情報</h3>

                <dl className="order_detail_info">
                  {detail.shipping ? (
                    <>
                      <div>
                        <dt>配送状況</dt>
                        <dd>{detail.shipping.shippingStatus}</dd>
                      </div>

                      <div>
                        <dt>配送会社</dt>
                        <dd>{detail.shipping.carrier ?? '未定'}</dd>
                      </div>

                      <div>
                        <dt>追跡番号</dt>
                        <dd>{detail.shipping.trackingNumber ?? '未発行'}</dd>
                      </div>
                    </>
                  ) : (
                    <div>
                      <dt>配送情報</dt>
                      <dd>配送情報がありません。</dd>
                    </div>
                  )}
                </dl>
              </section>
            </>
          )}
        </div>

        <div className="modal_footer">
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
