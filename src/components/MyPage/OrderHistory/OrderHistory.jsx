import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
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

  if (isLoading) {
    return (
      <div className="mp_panel">
        <p className="mp_status mp_status_loading">読み込み中です...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mp_panel">
        <p className="mp_status mp_status_error">{error}</p>
      </div>
    );
  }

  if (pagination.visible.length === 0) {
    return (
      <div className="mp_panel">
        <div className="mp_empty">
          <div className="mp_empty_icon">
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>
          <p className="mp_empty_title">まだ注文履歴がありません</p>
          <p className="mp_empty_desc">
            商品を注文すると、ここで注文内容と配送状況を確認できます。
          </p>
          <Link to="/overseas" className="mp_empty_bt">
            商品を見てみる
          </Link>
        </div>
      </div>
    );
  }

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
