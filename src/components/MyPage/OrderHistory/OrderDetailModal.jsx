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
          {/* 주문 기본 정보 */}
          <section className="order_detail_section">
            <h3>注文情報</h3>

            <dl className="order_detail_info">
              <div>
                <dt>注文ID</dt>
                <dd>{orderId}</dd>
              </div>
              <div>
                <dt>注文番号</dt>
                <dd>YM-TEST-001</dd>
              </div>
              <div>
                <dt>注文日時</dt>
                <dd>2026.09.08 10:30</dd>
              </div>
              <div>
                <dt>注文状況</dt>
                <dd>発送準備中</dd>
              </div>
            </dl>
          </section>

          {/* 주문 상품 */}
          <section className="order_detail_section">
            <h3>注文商品</h3>

            <ul className="order_detail_items">
              <li className="order_detail_item">
                <div className="order_detail_thumb" aria-hidden="true" />

                <div className="order_detail_item_info">
                  <h4>[小山園] 雲鶴 抹茶 100g</h4>
                  <p>単価：10,000ウォン</p>
                  <p>数量：1</p>
                </div>

                <strong className="order_detail_item_total">
                  10,000ウォン
                </strong>
              </li>

              <li className="order_detail_item">
                <div className="order_detail_thumb" aria-hidden="true" />

                <div className="order_detail_item_info">
                  <h4>[虎屋] 小形羊羹 5本入</h4>
                  <p>単価：7,500ウォン</p>
                  <p>数量：2</p>
                </div>

                <strong className="order_detail_item_total">
                  15,000ウォン
                </strong>
              </li>
            </ul>
          </section>

          {/* 주문 시 지정한 수령인과 주소 */}
          <section className="order_detail_section">
            <h3>お届け先</h3>

            <dl className="order_detail_info">
              <div>
                <dt>お名前</dt>
                <dd>テスト受取人</dd>
              </div>
              <div>
                <dt>電話番号</dt>
                <dd>010-0000-0000</dd>
              </div>
              <div>
                <dt>郵便番号</dt>
                <dd>00000</dd>
              </div>
              <div>
                <dt>住所</dt>
                <dd>テスト住所 101号室</dd>
              </div>
            </dl>
          </section>

          {/* 결제 금액과 결제 정보 */}
          <section className="order_detail_section">
            <h3>お支払い情報</h3>

            <dl className="order_detail_info">
              <div>
                <dt>商品合計</dt>
                <dd>25,000ウォン</dd>
              </div>
              <div>
                <dt>送料</dt>
                <dd>5,000ウォン</dd>
              </div>
              <div>
                <dt>関税</dt>
                <dd>0ウォン</dd>
              </div>
              <div className="order_detail_payment_total">
                <dt>お支払い合計</dt>
                <dd>
                  <strong>30,000ウォン</strong>
                </dd>
              </div>
              <div>
                <dt>お支払い方法</dt>
                <dd>クレジットカード</dd>
              </div>
              <div>
                <dt>お支払い状況</dt>
                <dd>支払い済み</dd>
              </div>
            </dl>
          </section>

          {/* 배송 정보 */}
          <section className="order_detail_section">
            <h3>配送情報</h3>

            <dl className="order_detail_info">
              <div>
                <dt>配送状況</dt>
                <dd>発送準備中</dd>
              </div>
              <div>
                <dt>配送会社</dt>
                <dd>未定</dd>
              </div>
              <div>
                <dt>追跡番号</dt>
                <dd>未発行</dd>
              </div>
            </dl>
          </section>
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
