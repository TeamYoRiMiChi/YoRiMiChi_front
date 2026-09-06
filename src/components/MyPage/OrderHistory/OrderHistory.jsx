import '../../../assets/styles/MyPage/OrderHistory.css';
import { useOrderHistory } from '../../../hooks/MyPage/OrderHistory/useOrderHistory';

function OrderHistory() {
  /* ===== 임시 데이터 ===== */
  // const orders = [
  //   {
  //     id: 1,
  //     orderNumber: 'YM-20260827-0012',
  //     date: '2026.08.25',
  //     status: '국제배송',
  //     statusType: 'shipping',
  //     items: [{ name: '[小山園] 雲鶴 100g', qty: 1, price: 222500 }],
  //     total: 222500,
  //   },
  //   {
  //     id: 2,
  //     orderNumber: 'YM-20260820-0008',
  //     date: '2026.08.20',
  //     status: '배송완료',
  //     statusType: 'done',
  //     items: [
  //       { name: '正広作 MV-本焼 牛刀 300mm', qty: 1, price: 425000 },
  //       { name: 'クァンチョンキム 味付けのり30g *2缶', qty: 3, price: 61500 },
  //     ],
  //     total: 486500,
  //   },
  // ];

  const { orders, isLoading, error } = useOrderHistory();

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
