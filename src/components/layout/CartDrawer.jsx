import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faTrash,
  faCartShopping,
  faHeart,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  removeCartItem,
  addCartItem,
  fetchCart,
  updateCartItem,
} from '../../features/cart/cartSlice';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import { getWishlistItems, toWishlistItemView } from '../../api/wishlistApi';
import CartGroupBuyApplicationModal from './CartGroupBuyApplicationModal';
import '../../assets/styles/Group_purchase/GroupBuyApplicationModal.css';
import './CartDrawer.css';

const TEXT = {
  ja: {
    cartTab: 'カート',
    wishTab: 'お気に入り',
    cartEmpty: 'カートに商品がありません',
    wishEmpty: 'お気に入りの商品がありません',
    total: '注文可能商品の合計',
    viewCart: 'カートを見る',
    selectedCheckout: '購入する',
    applyGroupBuy: '共同購入を申し込む',
    noOrderableItems: '現在注文できる商品がありません',
    mixedOrderNotice: '海外購入と共同購入は別々に注文してください。どちらか一方のチェックを外してください。',
    selectAll: 'すべて選択',
    addToCart: 'カートに入れる',
    viewWish: 'お気に入りをすべて見る',
    close: '閉じる',
    loading: '読み込み中...',
    groupBuyClosed: '募集終了',
    groupBuySuccess: '募集完了',
    groupBuyFailed: '目標未達で終了',
    groupBuyCancelled: '募集中止',
    overseasSection: '海外購入',
    groupBuySection: '共同購入',
    overseasEmpty: '海外購入の商品はありません',
    groupBuyEmpty: '共同購入の商品はありません',
    quantityUpdateFailed: '数量を変更できませんでした。',
  },
  ko: {
    cartTab: '장바구니',
    wishTab: '찜',
    cartEmpty: '장바구니에 상품이 없습니다',
    wishEmpty: '찜한 상품이 없습니다',
    total: '주문 가능 상품 합계',
    viewCart: '장바구니 보기',
    selectedCheckout: '구매하기',
    applyGroupBuy: '공동구매 신청하기',
    noOrderableItems: '현재 주문 가능한 상품이 없습니다',
    mixedOrderNotice: '해외직구와 공동구매는 따로 주문해야 합니다. 한 종류의 체크를 해제해주세요.',
    selectAll: '전체 선택',
    addToCart: '장바구니 담기',
    viewWish: '찜 목록 전체보기',
    close: '닫기',
    loading: '불러오는 중...',
    groupBuyClosed: '모집 마감',
    groupBuySuccess: '모집 완료',
    groupBuyFailed: '목표 미달 종료',
    groupBuyCancelled: '모집 중지',
    overseasSection: '해외직구',
    groupBuySection: '공동구매',
    overseasEmpty: '해외직구 상품이 없습니다',
    groupBuyEmpty: '공동구매 상품이 없습니다',
    quantityUpdateFailed: '수량을 변경하지 못했습니다.',
  },
};

const isGroupBuyItem = (item) => item.saleType
  ? item.saleType === 'GROUP_BUY'
  : item.groupBuyId != null;

const getDetailPath = (item) => isGroupBuyItem(item)
  ? `/groupbuy/${item.productId}`
  : `/overseas/${item.productId}`;

const splitBySaleType = (items) => ({
  overseas: items.filter((item) => !isGroupBuyItem(item)),
  groupBuy: items.filter(isGroupBuyItem),
});

const getClosedLabel = (item, t) => {
  if (item.groupBuyStatus === 'SUCCESS') return t.groupBuySuccess;
  if (item.groupBuyStatus === 'FAILED') return t.groupBuyFailed;
  if (item.groupBuyStatus === 'CANCELLED') return t.groupBuyCancelled;
  return t.groupBuyClosed;
};

function CartDrawer({ open, onClose, lang = 'ja' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState('cart');
  const [excludedCartItemIds, setExcludedCartItemIds] = useState([]);
  const [isGroupBuyModalOpen, setIsGroupBuyModalOpen] = useState(false);
  const [groupBuyApplicationItems, setGroupBuyApplicationItems] = useState([]);
  const [pendingQuantities, setPendingQuantities] = useState({});
  const pendingQuantityRef = useRef({});
  const quantityUpdateTimers = useRef(new Map());

  const t = TEXT[lang] ?? TEXT.ja;

  /* 장바구니는 Redux에서 (App에서 로그인 시 이미 불러옴) */
  const cartItems = useSelector((s) => s.cart.items);
  const accessToken = useSelector((s) => s.auth.accessToken);

  /**
   * 찜 목록은 상품 정보까지 필요해서 별도로 받아옵니다.
   * Redux의 wishlist에는 id만 들어 있어서 이름·가격을 못 보여줌
   */
  const wishlistIds = useSelector((s) => s.wishlist.ids);
  const [wishItems, setWishItems] = useState([]);
  const [wishLoading, setWishLoading] = useState(false);
  const cartGroups = splitBySaleType(cartItems);
  const wishGroups = splitBySaleType(wishItems);
  const orderableOverseas = cartGroups.overseas.filter((item) => item.available);
  const orderableGroupBuy = cartGroups.groupBuy.filter((item) => item.available);
  const selectedCartItems = [...orderableOverseas, ...orderableGroupBuy]
    .filter((item) => !excludedCartItemIds.includes(item.cartItemId))
    .map((item) => {
      const quantity = pendingQuantities[item.cartItemId] ?? item.quantity;
      return {
        ...item,
        quantity,
        subtotalNum: item.priceNum * quantity,
      };
    });
  const selectedTotal = selectedCartItems
    .reduce((sum, item) => sum + item.subtotalNum, 0);
  const selectedSaleTypes = new Set(selectedCartItems.map((item) => item.saleType));
  const isOnlyGroupBuySelected = selectedCartItems.length > 0
    && selectedSaleTypes.size === 1
    && selectedCartItems[0].saleType === 'GROUP_BUY';

  /* 찜 탭을 열 때만 불러옴 */
  useEffect(() => {
    if (!open || tab !== 'wish') return;

    let ignore = false;

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

  /* 열 때와 열린 동안 모집 종료 여부를 포함한 최신 장바구니를 받음 */
  useEffect(() => {
    if (!open || tab !== 'cart' || !accessToken) return undefined;

    dispatch(fetchCart());
    const refreshId = window.setInterval(() => {
      dispatch(fetchCart());
    }, 10000);

    return () => window.clearInterval(refreshId);
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

  useEffect(() => () => {
    quantityUpdateTimers.current.forEach((timerId) => window.clearTimeout(timerId));
  }, []);

  /* ===== 핸들러 ===== */
  const handleRemoveCartItem = (cartItemId) => {
    window.clearTimeout(quantityUpdateTimers.current.get(cartItemId));
    quantityUpdateTimers.current.delete(cartItemId);
    dispatch(removeCartItem(cartItemId));
  };

  const handleQuantityChange = (item, nextQuantity) => {
    if (!item.available || nextQuantity < 1 || nextQuantity > item.stock) return;

    const { cartItemId } = item;
    pendingQuantityRef.current[cartItemId] = nextQuantity;
    setPendingQuantities((current) => ({ ...current, [cartItemId]: nextQuantity }));

    window.clearTimeout(quantityUpdateTimers.current.get(cartItemId));
    const timerId = window.setTimeout(async () => {
      try {
        await dispatch(updateCartItem({ cartItemId, quantity: nextQuantity })).unwrap();
        if (pendingQuantityRef.current[cartItemId] === nextQuantity) {
          delete pendingQuantityRef.current[cartItemId];
          setPendingQuantities((current) => {
            const next = { ...current };
            delete next[cartItemId];
            return next;
          });
        }
      } catch (message) {
        if (pendingQuantityRef.current[cartItemId] === nextQuantity) {
          delete pendingQuantityRef.current[cartItemId];
          setPendingQuantities((current) => {
            const next = { ...current };
            delete next[cartItemId];
            return next;
          });
          window.alert(message || t.quantityUpdateFailed);
        }
      } finally {
        if (quantityUpdateTimers.current.get(cartItemId) === timerId) {
          quantityUpdateTimers.current.delete(cartItemId);
        }
      }
    }, 350);

    quantityUpdateTimers.current.set(cartItemId, timerId);
  };

  const handleCartItemCheck = (cartItemId) => {
    setExcludedCartItemIds((current) => current.includes(cartItemId)
      ? current.filter((id) => id !== cartItemId)
      : [...current, cartItemId]);
  };

  const handleSectionCheck = (items) => {
    const itemIds = items.filter((item) => item.available)
      .map((item) => item.cartItemId);
    const allSelected = itemIds.every((id) => !excludedCartItemIds.includes(id));

    setExcludedCartItemIds((current) => allSelected
      ? [...new Set([...current, ...itemIds])]
      : current.filter((id) => !itemIds.includes(id)));
  };

  const getDisplayQuantity = (item) => pendingQuantities[item.cartItemId] ?? item.quantity;

  const handleSelectedCheckout = () => {
    if (selectedCartItems.length === 0) return;

    if (selectedSaleTypes.size > 1) {
      window.alert(t.mixedOrderNotice);
      return;
    }

    if (isOnlyGroupBuySelected) {
      setGroupBuyApplicationItems(selectedCartItems.filter(isGroupBuyItem));
      setIsGroupBuyModalOpen(true);
      return;
    }

    const saleType = selectedCartItems[0].saleType;
    const cartItemIds = selectedCartItems.map((item) => item.cartItemId).join(',');
    navigate(`/order?saleType=${saleType}&cartItemIds=${cartItemIds}`);
    onClose();
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
              onClick={() => {
                setWishLoading(true);
                setTab('wish');
              }}
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
                <div className="cart_sections">
                  {[
                    { key: 'overseas', title: t.overseasSection, items: cartGroups.overseas, empty: t.overseasEmpty },
                    { key: 'groupbuy', title: t.groupBuySection, items: cartGroups.groupBuy, empty: t.groupBuyEmpty },
                  ].map((section) => (
                    <section className={`cart_section cart_section_${section.key}`} key={section.key}>
                      <div className="cart_section_head">
                        <h3>{section.title}</h3>
                        <div className="cart_section_tools">
                          <label className="cart_section_check">
                            <input
                              type="checkbox"
                              checked={section.items.some((item) => item.available)
                                && section.items.filter((item) => item.available)
                                  .every((item) => !excludedCartItemIds.includes(item.cartItemId))}
                              disabled={!section.items.some((item) => item.available)}
                              onChange={() => handleSectionCheck(section.items)}
                            />
                            <span>{t.selectAll}</span>
                          </label>
                          <span className="cart_section_count">{section.items.length}</span>
                        </div>
                      </div>
                      {section.items.length === 0 ? (
                        <p className="cart_section_empty">{section.empty}</p>
                      ) : (
                        <ul className="cart_list">
                          {section.items.map((item) => (
                    <li
                      key={item.cartItemId}
                      className={`cart_item ${item.available === false ? 'is_unavailable' : ''}`}
                    >
                      {item.available && (
                        <label className="cart_item_check" aria-label={item.name}>
                          <input
                            type="checkbox"
                            checked={!excludedCartItemIds.includes(item.cartItemId)}
                            onChange={() => handleCartItemCheck(item.cartItemId)}
                          />
                          <span />
                        </label>
                      )}
                      <Link
                        to={getDetailPath(item)}
                        className={`cart_item_img ${!item.available ? 'is_disabled' : ''}`}
                        onClick={(event) => {
                          if (!item.available) event.preventDefault();
                          else onClose();
                        }}
                      >
                        {item.thumbnailUrl ? (
                          <img src={item.thumbnailUrl} alt={item.name} />
                        ) : (
                          <div className="cart_item_noimg" />
                        )}
                      </Link>

                      <div className="cart_item_info">
                        <Link
                          to={getDetailPath(item)}
                          className={`cart_item_detail_link ${!item.available ? 'is_disabled' : ''}`}
                          onClick={(event) => {
                            if (!item.available) event.preventDefault();
                            else onClose();
                          }}
                        >
                          <p className="cart_item_name">{item.name}</p>
                          {item.groupBuyClosed && (
                            <span className={`cart_item_closed ${item.groupBuyStatus === 'FAILED' ? 'failed' : ''}`}>
                              {getClosedLabel(item, t)}
                            </span>
                          )}
                          <p className="cart_item_price">{item.price}</p>
                        </Link>
                        {item.available && (
                          <div className="cart_item_quantity">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(item, getDisplayQuantity(item) - 1)}
                              disabled={getDisplayQuantity(item) <= 1}
                              aria-label="数量を減らす"
                            >
                              −
                            </button>
                            <strong>{getDisplayQuantity(item)}</strong>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(item, getDisplayQuantity(item) + 1)}
                              disabled={getDisplayQuantity(item) >= item.stock}
                              aria-label="数量を増やす"
                            >
                              ＋
                            </button>
                          </div>
                        )}
                      </div>

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
                    </section>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart_drawer_foot">
                <div className="cart_total">
                  <span>{t.total}</span>
                  <strong>¥{selectedTotal.toLocaleString()}</strong>
                </div>

                <div className="cart_actions">
                  {selectedCartItems.length > 0 ? (
                    <>
                      <Link
                        to="/mypage?menu=cart"
                        className="cart_bt cart_bt_outline"
                        onClick={onClose}
                      >
                        {t.viewCart}
                      </Link>
                      <button
                        type="button"
                        className={`cart_bt cart_bt_primary ${isOnlyGroupBuySelected ? 'is_group_buy' : ''}`}
                        onClick={handleSelectedCheckout}
                      >
                        {isOnlyGroupBuySelected ? t.applyGroupBuy : t.selectedCheckout}
                        {' '}({selectedCartItems.length})
                      </button>
                    </>
                  ) : (
                    <p className="cart_no_orderable">{t.noOrderableItems}</p>
                  )}
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
                <div className="cart_sections">
                  {[
                    { key: 'overseas', title: t.overseasSection, items: wishGroups.overseas, empty: t.overseasEmpty },
                    { key: 'groupbuy', title: t.groupBuySection, items: wishGroups.groupBuy, empty: t.groupBuyEmpty },
                  ].map((section) => (
                    <section className={`cart_section cart_section_${section.key}`} key={section.key}>
                      <div className="cart_section_head">
                        <h3>{section.title}</h3>
                        <span className="cart_section_count">{section.items.length}</span>
                      </div>
                      {section.items.length === 0 ? (
                        <p className="cart_section_empty">{section.empty}</p>
                      ) : (
                        <ul className="cart_list">
                          {section.items.map((item) => (
                    <li
                      key={item.wishlistId}
                      className={`cart_item ${item.available === false ? 'is_unavailable' : ''}`}
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
                    </section>
                  ))}
                </div>
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

      {isGroupBuyModalOpen && (
        <CartGroupBuyApplicationModal
          isOpen
          items={groupBuyApplicationItems}
          onClose={() => {
            setIsGroupBuyModalOpen(false);
            setGroupBuyApplicationItems([]);
          }}
          onComplete={() => dispatch(fetchCart())}
        />
      )}
    </>
  );
}

export default CartDrawer;
