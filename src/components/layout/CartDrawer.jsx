import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './CartDrawer.css';

function CartDrawer({ open, onClose, lang = 'ko' }) {
  const TEXT = {
    ja: {
      title: 'カート',
      empty: 'カートに商品がありません',
      total: '合計',
      viewCart: 'カートを見る',
      checkout: 'ご購入手続きへ',
      close: '閉じる',
    },
    ko: {
      title: '장바구니',
      empty: '장바구니에 상품이 없습니다',
      total: '합계',
      viewCart: '장바구니 보기',
      checkout: '주문하기',
      close: '닫기',
    },
  };
  const t = TEXT[lang];

  // 임시 데이터 (나중에 Redux에서 가져오기)
  const items = [
    { id: 1, name: '베이비 아기용품 세트', priceKrw: 32000, quantity: 1, image: null },
    { id: 2, name: '일본 한정 과자 박스', priceKrw: 18500, quantity: 2, image: null },
  ];

  const total = items.reduce((sum, item) => sum + item.priceKrw * item.quantity, 0);

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
      {/* 배경 오버레이 — 클릭하면 닫힘 */}
      <div
        className={`cart_overlay ${open ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* 사이드바 */}
      <aside className={`cart_drawer ${open ? 'open' : ''}`}>

        {/* 헤더 */}
        <div className="cart_drawer_head">
          <h2 className="cart_drawer_title">
            {t.title}
            <span className="cart_drawer_count">{items.length}</span>
          </h2>
          <button className="cart_close_bt" onClick={onClose} aria-label={t.close}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* 상품 목록 */}
        <div className="cart_drawer_body">
          {items.length === 0 ? (
            <div className="cart_empty">
              <FontAwesomeIcon icon={faCartShopping} className="cart_empty_icon" />
              <p>{t.empty}</p>
            </div>
          ) : (
            <ul className="cart_list">
              {items.map((item) => (
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

        {/* 하단 합계 + 버튼 */}
        {items.length > 0 && (
          <div className="cart_drawer_foot">
            <div className="cart_total">
              <span>{t.total}</span>
              <strong>{total.toLocaleString()}원</strong>
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

      </aside>
    </>
  );
}

export default CartDrawer;