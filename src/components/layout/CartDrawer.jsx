import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faTrash,
  faCartShopping,
  faHeart,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
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
  },
};

function CartDrawer({ open, onClose, lang = 'ko' }) {
  const [tab, setTab] = useState('cart');
  const t = TEXT[lang];

  // 임시 데이터 (나중에 Redux에서 가져오기)
  const cartItems = [
    { id: 1, name: '베이비 아기용품 세트', priceKrw: 32000, quantity: 1, image: null },
    { id: 2, name: '일본 한정 과자 박스', priceKrw: 18500, quantity: 2, image: null },
  ];

  const wishItems = [
    { id: 11, name: '무인양품 수납 박스 L', priceKrw: 24000, image: null },
    { id: 12, name: '시세이도 선크림 SPF50', priceKrw: 19800, image: null },
    { id: 13, name: '일본 문구 세트', priceKrw: 12500, image: null },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.priceKrw * item.quantity,
    0
  );

  // 드로어 닫힐 때 탭 초기화
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setTab('cart'), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  // 열려있을 때 배경 스크롤 막기
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
              {wishItems.length > 0 && (
                <span className="cart_tab_count">{wishItems.length}</span>
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
                    <li key={item.id} className="cart_item">
                      <div className="cart_item_img">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className="cart_item_noimg" />
                        )}
                      </div>

                      <div className="cart_item_info">
                        <p className="cart_item_name">{item.name}</p>
                        <p className="cart_item_price">
                          {item.priceKrw.toLocaleString()}원
                          <span className="cart_item_qty">× {item.quantity}</span>
                        </p>
                      </div>

                      <button className="cart_item_del" aria-label="delete">
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
                  <strong>{total.toLocaleString()}원</strong>
                </div>

                <div className="cart_actions">
                  <Link to="/mypage" className="cart_bt cart_bt_outline" onClick={onClose}>
                    {t.viewCart}
                  </Link>
                  <Link to="/mypage" className="cart_bt cart_bt_primary" onClick={onClose}>
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
              {wishItems.length === 0 ? (
                <div className="cart_empty">
                  <FontAwesomeIcon icon={faHeart} className="cart_empty_icon" />
                  <p>{t.wishEmpty}</p>
                </div>
              ) : (
                <ul className="cart_list">
                  {wishItems.map((item) => (
                    <li key={item.id} className="cart_item">
                      <div className="cart_item_img">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className="cart_item_noimg" />
                        )}
                      </div>

                      <div className="cart_item_info">
                        <p className="cart_item_name">{item.name}</p>
                        <p className="cart_item_price">
                          {item.priceKrw.toLocaleString()}원
                        </p>
                      </div>

                      <div className="wish_item_actions">
                        <button className="wish_add_bt" title={t.addToCart}>
                          <FontAwesomeIcon icon={faCartPlus} />
                        </button>
                        <button className="cart_item_del" aria-label="delete">
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