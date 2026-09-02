import "../../../assets/styles/MyPage/OrderHistory.css";

function OrderHistory({ orders }) {
  return (
    <div className="mp_panel">
      {orders.map((order) => (
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
                    {it.price.toLocaleString()}원 · {it.qty}개
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="order_foot">
            <span className="order_total">
              결제금액 <strong>{order.total.toLocaleString()}원</strong>
            </span>
            <div className="order_btns">
              <button className="mini_bt">배송 조회</button>
              <button className="mini_bt mini_bt_line">주문 상세</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
