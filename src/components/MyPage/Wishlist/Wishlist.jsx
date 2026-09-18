import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../assets/styles/MyPage/Wishlist.css";
import useWishlist from "../../../hooks/MyPage/MyPage/useWishlist";

function Wishlist() {

  const {
    wishlist,
    isLoading,
    error,
  } = useWishlist();

  const getUnavailableLabel = (item) => {
    if (item.groupBuyStatus === 'SUCCESS') return '募集完了';
    if (item.groupBuyStatus === 'FAILED') return '目標未達で終了';
    if (item.groupBuyStatus === 'CANCELLED') return '募集中止';
    if (item.groupBuyClosed) return '募集終了';
    return '売り切れ';
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

  if (wishlist.length === 0) {
    return (
      <div className="mp_panel">
        <div className="mp_empty">
          <div className="mp_empty_icon">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <p className="mp_empty_title">お気に入りに登録した商品がありません</p>
          <p className="mp_empty_desc">
            気になる商品のハートボタンを押すと、ここに集めて見返せます。
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
      <div className="grid_list">
        {wishlist.map((item) => (
          <div className="grid_card" key={item.wishlistId}>
            <Link
              to={item.groupBuyId ? `/groupbuy/${item.productId}` : `/overseas/${item.productId}`}
            >
              <div className="grid_thumb">
                {item.thumbnailUrl && (
                  <img
                    className="grid_thumb_img"
                    src={item.thumbnailUrl}
                    alt={item.name}
                  />
                )}
                {!item.available && (
                  <span className={`soldout ${item.groupBuyStatus === 'FAILED' ? 'group_failed' : ''}`}>
                    {getUnavailableLabel(item)}
                  </span>
                )}
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
