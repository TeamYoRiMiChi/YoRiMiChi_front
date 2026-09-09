import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../assets/styles/MyPage/Wishlist.css";
import useWishlist from "../../../hooks/MyPage/MyPage/useWishlist";

function Wishlist() {

  const {
    wishlist,
  } = useWishlist();



  return (
    <div className="mp_panel">
      <div className="grid_list">
        {wishlist.map((item) => (
          <div className="grid_card" key={item.wishlistId}>
            <Link
              to={item.groupBuyId ? `/groupbuy/${item.groupBuyId}` : `/overseas/${item.productId}`}
            >
              <div className="grid_thumb">
                {!item.available && <span className="soldout">품절</span>}
              </div>
              <p className="grid_name">{item.name}</p>
              <p className="grid_price">{item.price}</p>
            </Link>
            <div className="grid_btns">
              <button className="mini_bt" disabled={!item.available}>
                <FontAwesomeIcon icon={faCartPlus} /> 담기
              </button>
              <button className="icon_bt">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
