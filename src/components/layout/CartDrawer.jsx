import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faTrash,
  faCartShopping,
  faHeart,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import { removeCartItem, addCartItem, fetchCart } from '../../features/cart/cartSlice';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import { getWishlistItems, toWishlistItemView } from '../../api/wishlistApi';
import './CartDrawer.css';

const TEXT = {
  ja: {
    cartTab: 'カート',
    wishTab: 'お気に入り',
    cartEmpty: 'カートに商品がありません',
    wishEmpty: 'お気に入りの商品がありません',
    total: '合計',
    viewCart: 'カートを見る',
    checkout: 'ご購入手続きへ',
    addToCart: 'カートに入れる',
    viewWish: 'お気に入りをすべて見る',
    close: '閉じる',
    loading: '読み込み中...',
    groupBuyClosed: '募集終了',
    groupBuySuccess: '募集完了',
    groupBuyFailed: '目標未達で終了',
    groupBuyCancelled: '募集中止',
  },
  ko: {
    cartTab: '장바구니',
    wishTab: '찜',
    cartEmpty: '장바구니에 상품이 없습니다',
    wishEmpty: '찜한 상품이 없습니다',
    total: '합계',
    viewCart: '장바구니 보기',
    checkout: '주문하기',
    addToCart: '장바구니 담기',
    viewWish: '찜 목록 전체보기',
    close: '닫기',
    loading: '불러오는 중...',
    groupBuyClosed: '모집 마감',
    groupBuySuccess: '모집 완료',
    groupBuyFailed: '목표 미달 종료',
    groupBuyCancelled: '모집 중지',
  },
};

const getDetailPath = (item) => item.groupBuyId
  ? `/groupbuy/${item.productId}`
  : `/overseas/${item.productId}`;

const getClosedLabel = (item, t) => {
  if (item.groupBuyStatus === 'SUCCESS') return t.groupBuySuccess;
  if (item.groupBuyStatus === 'FAILED') return t.groupBuyFailed;
  if (item.groupBuyStatus === 'CANCELLED') return t.groupBuyCancelled;
  return t.groupBuyClosed;
};

function CartDrawer({ open, onClose, lang = 'ja' }) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('cart');

  const t = TEXT[lang] ?? TEXT.ja;

  /* 장바구니는 Redux에서 (App에서 로그인 시 이미 불러옴) */
  const cartItems = useSelector((s) => s.cart.items);
  const cartTotal = useSelector((s) => s.cart.totalPriceNum);
  const accessToken = useSelector((s) => s.auth.accessToken);

  /**
   * 찜 목록은 상품 정보까지 필요해서 별도로 받아옵니다.
   * Redux의 wishlist에는 id만 들어 있어서 이름·가격을 못 보여주거든요.
   */
  const wishlistIds = useSelector((s) => s.wishlist.ids);
  const [wishItems, setWishItems] = useState([]);
  const [wishLoading, setWishLoading] = useState(false);

  /* 찜 탭을 열 때만 불러옵니다 */
  useEffect(() => {
    if (!open || tab !== 'wish') return;

    let ignore = false;
    setWishLoading(true);

    getWishlistItems()
      .then((res) => {
        if (ignore) return;
        setWishItems((res.data.data ?? []).map(toWishlistItemView));
      })
      .catch(() => {
        if (!ignore) setWishItems([]);
      })
      .finally(() => {
        if (!ignore) setWishLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [open, tab, wishlistIds.length]);

  /* 열 때마다 모집 종료 여부를 포함한 최신 장바구니를 받습니다. */
  useEffect(() => {
    if (open && tab === 'cart' && accessToken) {
      dispatch(fetchCart());
    }
  }, [open, tab, accessToken, dispatch]);

  /* 드로어 닫힐 때 탭 초기화 */
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setTab('cart'), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  /* ESC 키로 닫기 */
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  /* 열려있을 때 배경 스크롤 막기 */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* ===== 핸들러 ===== */
  const handleRemoveCartItem = (cartItemId) => {
    dispatch(removeCartItem(cartItemId));
  };

  const handleRemoveWish = (productId) => {
    dispatch(toggleWishlist(productId));
    setWishItems((cur) => cur.filter((it) => it.productId !== productId));
  };

  const handleWishToCart = async (productId) => {
    const result = await dispatch(addCartItem({ productId, quantity: 1 }));
    if (addCartItem.fulfilled.match(result)) {
      setTab('cart');
    }
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={`cart_overlay ${open ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* 사이드바 */}
      <aside className={`cart_drawer ${open ? 'open' : ''}`}>

        {/* 헤더 */}
        <div className="cart_drawer_head">
          <div className="cart_tabs">
            <button
              className={`cart_tab ${tab === 'cart' ? 'active' : ''}`}
              onClick={() => setTab('cart')}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {t.cartTab}
              {cartItems.length > 0 && (
                <span className="cart_tab_count">{cartItems.length}</span>
              )}
            </button>

            <button
              className={`cart_tab ${tab === 'wish' ? 'active' : ''}`}
              onClick={() => setTab('wish')}
            >
              <FontAwesomeIcon icon={faHeart} />
              {t.wishTab}
              {wishlistIds.length > 0 && (
                <span className="cart_tab_count">{wishlistIds.length}</span>
              )}
            </button>
          </div>

          <button className="cart_close_bt" onClick={onClose} aria-label={t.close}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* ===== 장바구니 탭 ===== */}
        {tab === 'cart' && (
          <>
            <div className="cart_drawer_body">
              {cartItems.length === 0 ? (
                <div className="cart_empty">
                  <FontAwesomeIcon icon={faCartShopping} className="cart_empty_icon" />
                  <p>{t.cartEmpty}</p>
                </div>
              ) : (
                <ul className="cart_list">
                  {cartItems.map((item) => (
                    <li
                      key={item.cartItemId}
                      className={`cart_item ${item.groupBuyClosed ? 'is_closed' : ''}`}
                    >
                      <Link
                        to={getDetailPath(item)}
                        className="cart_item_img"
                        onClick={onClose}
                      >
                        {item.thumbnailUrl ? (
                          <img src={item.thumbnailUrl} alt={item.name} />
                        ) : (
                          <div className="cart_item_noimg" />
                        )}
                      </Link>

                      <Link
                        to={getDetailPath(item)}
                        className="cart_item_info"
                        onClick={onClose}
                      >
                        <p className="cart_item_name">{item.name}</p>
                        {item.groupBuyClosed && (
                          <span className={`cart_item_closed ${item.groupBuyStatus === 'FAILED' ? 'failed' : ''}`}>
                            {getClosedLabel(item, t)}
                          </span>
                        )}
                        <p className="cart_item_price">
                          {item.price}
                          <span className="cart_item_qty">× {item.quantity}</span>
                        </p>
                      </Link>

                      <button
                        className="cart_item_del"
                        onClick={() => handleRemoveCartItem(item.cartItemId)}
                        aria-label="delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart_drawer_foot">
                <div className="cart_total">
                  <span>{t.total}</span>
                  <strong>¥{cartTotal.toLocaleString()}</strong>
                </div>

                <div className="cart_actions">
                  <Link to="/cart" className="cart_bt cart_bt_outline" onClick={onClose}>
                    {t.viewCart}
                  </Link>
                  <Link to="/order" className="cart_bt cart_bt_primary" onClick={onClose}>
                    {t.checkout}
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* ===== 찜 탭 ===== */}
        {tab === 'wish' && (
          <>
            <div className="cart_drawer_body">
              {wishLoading ? (
                <div className="cart_empty">
                  <p>{t.loading}</p>
                </div>
              ) : wishItems.length === 0 ? (
                <div className="cart_empty">
                  <FontAwesomeIcon icon={faHeart} className="cart_empty_icon" />
                  <p>{t.wishEmpty}</p>
                </div>
              ) : (
                <ul className="cart_list">
                  {wishItems.map((item) => (
                    <li
                      key={item.wishlistId}
                      className={`cart_item ${item.groupBuyClosed ? 'is_closed' : ''}`}
                    >
                      <Link
                        to={getDetailPath(item)}
                        className="cart_item_img"
                        onClick={onClose}
                      >
                        {item.thumbnailUrl ? (
                          <img src={item.thumbnailUrl} alt={item.name} />
                        ) : (
                          <div className="cart_item_noimg" />
                        )}
                      </Link>

                      <Link
                        to={getDetailPath(item)}
                        className="cart_item_info"
                        onClick={onClose}
                      >
                        <p className="cart_item_name">{item.name}</p>
                        {item.groupBuyClosed && (
                          <span className={`cart_item_closed ${item.groupBuyStatus === 'FAILED' ? 'failed' : ''}`}>
                            {getClosedLabel(item, t)}
                          </span>
                        )}
                        <p className="cart_item_price">{item.price}</p>
                      </Link>

                      <div className="wish_item_actions">
                        <button
                          className="wish_add_bt"
                          title={t.addToCart}
                          onClick={() => handleWishToCart(item.productId)}
                          disabled={!item.available}
                        >
                          <FontAwesomeIcon icon={faCartPlus} />
                        </button>
                        <button
                          className="cart_item_del"
                          onClick={() => handleRemoveWish(item.productId)}
                          aria-label="delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {wishItems.length > 0 && (
              <div className="cart_drawer_foot">
                <Link
                  to="/mypage"
                  className="cart_bt cart_bt_outline cart_bt_full"
                  onClick={onClose}
                >
                  {t.viewWish}
                </Link>
              </div>
            )}
          </>
        )}

      </aside>
    </>
  );
}

export default CartDrawer;
