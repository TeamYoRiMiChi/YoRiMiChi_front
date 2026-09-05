import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/MyPage/Wishlist.css";
import useWishlist from "../../../hooks/MyPage/MyPage/useWishlist";

function Wishlist({ wishItems }) {

  const {
    wishlist,
    isLoading,
    error,
  } = useWishlist();



  return (
    <div className="mp_panel">
      <div className="grid_list">
        {wishlist.map((item) => (
          <div className="grid_card" key={item.id}>
            <div className="grid_thumb">
              {item.soldOut && <span className="soldout">품절</span>}
            </div>
            <p className="grid_name">{item.name}</p>
            <p className="grid_price">{item.price.toLocaleString()}원</p>
            <div className="grid_btns">
              <button className="mini_bt" disabled={item.soldOut}>
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
