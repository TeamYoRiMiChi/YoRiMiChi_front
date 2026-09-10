import { Link } from "react-router-dom";
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
                <ul className="line_list">
                    <li className="line_item">カートを読み込んでいます。</li>
                </ul>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mp_panel">
                <ul className="line_list">
                    <li className="line_item">{error}</li>
                </ul>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="mp_panel">
                <ul className="line_list">
                    <li className="line_item">カートに商品がありません。</li>
                </ul>
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