import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import OrderSection from './OrderSection';
import '../../assets/styles/Order/components/OrderItems.css';

/**
 * 주문 상품 목록
 *
 * @param {Array} items 주문할 상품 목록
 */
function OrderItems({ items }) {
  const sections = [
    {
      key: 'OVERSEAS',
      title: '海外購入商品',
      items: items.filter((item) => item.saleType !== 'GROUP_BUY'),
    },
    {
      key: 'GROUP_BUY',
      title: '共同購入商品',
      items: items.filter((item) => item.saleType === 'GROUP_BUY'),
    },
  ].filter((section) => section.items.length > 0);

  return (
    <OrderSection icon={faBoxOpen} title="注文商品">
      <div className="order-item-sections">
        {sections.map((section) => (
          <section className={`order-item-section is-${section.key.toLowerCase()}`} key={section.key}>
            <h3>{section.title}<span>{section.items.length}</span></h3>
            <ul className="order-item-list">
              {section.items.map((item) => (
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
                <p className="order-item-qty">数量 {item.quantity}個</p>
              </div>

              <div className="order-item-price">
                <strong>¥{(item.priceJpy * item.quantity).toLocaleString()}</strong>
              </div>
            </div>

            {item.saleType !== 'GROUP_BUY' && (
              <p className="order-item-shipping-note">送料は海外購入の注文ごとに一度だけ課金されます。</p>
            )}
          </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </OrderSection>
  );
}

export default OrderItems;
