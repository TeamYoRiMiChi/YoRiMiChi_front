import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import OrderSection from './OrderSection';
import '../../assets/styles/Order/components/OrderItems.css';

/**
 * 주문 상품 목록
 *
 * @param {Array} items 주문할 상품 목록
 */
function OrderItems({ items }) {
  return (
    <OrderSection icon={faBoxOpen} title="주문 상품">
      <ul className="order-item-list">
        {items.map((item) => (
          <li className="order-item" key={item.productId}>
            <div className="order-item-main">
              <div className="order-item-thumb">
                {item.thumbnailUrl ? (
                  <img src={item.thumbnailUrl} alt="" />
                ) : (
                  <span>{item.brand}</span>
                )}
              </div>

              <div className="order-item-info">
                <p className="order-item-name">{item.name}</p>
                <p className="order-item-qty">수량 {item.quantity}개</p>
              </div>

              <strong className="order-item-price">
                ₩{(item.priceKrw * item.quantity).toLocaleString()}
              </strong>
            </div>

            <dl className="order-item-shipping">
              <div>
                <dt>해외 배송</dt>
                <dd>₩{item.overseasShipping.toLocaleString()}</dd>
              </div>
              <div>
                <dt>국내 배송</dt>
                <dd>₩{item.domesticShipping.toLocaleString()}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </OrderSection>
  );
}

export default OrderItems;
