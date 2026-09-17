import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/MyPage/Cart.css";
import useMypageCart from "../../../hooks/MyPage/MyPage/useMypageCart";

function MypageCart() {
    const {
        cartItems,
        totalPrice,
        isLoading,
        error,
    } = useMypageCart();

    if (isLoading) {
        return(
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

    if (cartItems.length === 0) {
        return (
            <div className="mp_panel">
                <div className="mp_empty">
                    <div className="mp_empty_icon">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                    <p className="mp_empty_title">カートに商品がありません</p>
                    <p className="mp_empty_desc">
                        気になる商品をカートに入れると、ここでまとめて確認できます。
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
            <ul className="line_list">
                {cartItems.map((item) => (
                    <li className="line_item" key={item.id}>
                        <div className="order_thumb" />

                        <div className="order_item_info">
                            <p className="order_item_name">{item.name}</p>
                            <p className="order_item_sub">
                                {Number(item.price).toLocaleString('ja-JP')}円・
                                {item.qty}点
                            </p>

                            {item.soldOut &&(
                                <p className="order_item_sub">売り切れ</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            <div className="cart_sum">
                <span>お支払い予定金額</span>
                <strong>
                    {totalPrice.toLocaleString('ja-JP')}円
                </strong>
            </div>

            <Link to="/order" className="wide_bt">
                注文手続きへ
            </Link>
        </div>
    );
}

export default MypageCart;