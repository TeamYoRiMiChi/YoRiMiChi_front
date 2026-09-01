import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Cart({ cartItems }) {
  return (
    <div className="mp_panel">
      <ul className="line_list">
        {cartItems.map((item) => (
          <li className="line_item" key={item.id}>
            <div className="order_thumb" />
            <div className="order_item_info">
              <p className="order_item_name">{item.name}</p>
              <p className="order_item_sub">
                {item.price.toLocaleString()}원 · {item.qty}개
              </p>
            </div>
            <button className="icon_bt">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>

      <div className="cart_sum">
        <span>총 결제 예상금액</span>
        <strong>
          {cartItems.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString()}
          원
        </strong>
      </div>

      <Link to="/order" className="wide_bt">
        주문하러 가기
      </Link>
    </div>
  );
}

export default Cart;
