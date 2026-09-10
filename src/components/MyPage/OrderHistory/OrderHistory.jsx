import { useState } from 'react';
import '../../../assets/styles/MyPage/OrderHistory.css';
import { useOrderHistory } from '../../../hooks/MyPage/OrderHistory/useOrderHistory';
import Pagination from '../../common/Pagination';
import OrderDetailModal from './OrderDetailModal';

function OrderHistory() {
  const { pagination, isLoading, error } = useOrderHistory();

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const closeModal = () => {
    setSelectedOrderId(null);
  };

  return (
    <div className="mp_panel">
      {pagination.visible.map((order) => (
        <div className="order_card" key={order.id}>
          <div className="order_head">
            <div>
              <span className="order_date">{order.date}</span>
              <span className="order_num">{order.orderNumber}</span>
            </div>
            <span className={`badge badge_${order.statusType}`}>
              {order.status}
            </span>
          </div>

          <ul className="order_items">
            {order.items.map((it, i) => (
              <li key={i}>
                <div className="order_thumb" />
                <div className="order_item_info">
                  <p className="order_item_name">{it.name}</p>
                  <p className="order_item_sub">
                    {it.price.toLocaleString()}￥ · {it.qty}個
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="order_foot">
            <span className="order_total">
              総額 <strong>{order.total.toLocaleString()}￥</strong>
            </span>
            <div className="order_btns">
              <button
                className="mini_bt mini_bt_line"
                onClick={() => openModal(order.id)}
              >
                注文詳細
              </button>
            </div>
          </div>
        </div>
      ))}

      <Pagination {...pagination} onChange={pagination.goPage} maxVisible={3} />

      {selectedOrderId && (
        <OrderDetailModal orderId={selectedOrderId} onClose={closeModal} />
      )}
    </div>
  );
}

export default OrderHistory;
