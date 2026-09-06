import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../../features/wishlist/wishlistSlice';
import { addCartItem } from '../../../features/cart/cartSlice';

/* 재고 정보가 없을 때 허용할 최대 수량 */
const DEFAULT_MAX_QUANTITY = 99;

/**
 * 상품 구매 관련 로직
 *
 * 수량 조절, 합계 계산, 장바구니 담기, 찜 토글을 담당합니다.
 * 로그인이 필요한 동작은 여기서 한 번에 막습니다.
 *
 * @param {Object} product 상품 데이터
 */
export function useProductPurchase(product) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const accessToken = useSelector((s) => s.auth.accessToken);
  const wishlistIds = useSelector((s) => s.wishlist.ids);
  const addStatus = useSelector((s) => s.cart.addStatus);

  const [quantity, setQuantity] = useState(1);

  /**
   * 담을 수 있는 최대 수량
   *
   * 재고를 못 받아왔거나(undefined) 값이 이상하면 99까지 허용합니다.
   * 이렇게 두지 않으면 stock이 없을 때 + 버튼이 막혀버립니다.
   */
  const stock = Number(product?.stock);
  const maxQuantity = Number.isFinite(stock) && stock > 0 ? stock : DEFAULT_MAX_QUANTITY;

  /* 재고가 0이라고 서버가 알려준 경우에만 품절로 봅니다 */
  const isSoldOut = Number.isFinite(stock) && stock <= 0;

  const isWished = product ? wishlistIds.includes(product.id) : false;
  const totalPrice = product ? product.priceNum * quantity : 0;
  const isAdding = addStatus === 'loading';

  /* 다른 상품으로 이동하면 수량을 1로 되돌립니다 */
  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  /** 1 이상 maxQuantity 이하로만 움직입니다 */
  const changeQuantity = (delta) => {
    setQuantity((cur) => {
      const next = cur + delta;
      if (next < 1) return 1;
      if (next > maxQuantity) return maxQuantity;
      return next;
    });
  };

  /** 로그인 여부 확인. 안 되어 있으면 로그인 페이지로 보냅니다 */
  const requireLogin = () => {
    if (accessToken) return true;

    alert('ログインが必要です。');
    navigate('/login', {
      state: { from: location.pathname + location.search },
    });
    return false;
  };

  const handleToggleWish = () => {
    if (!requireLogin()) return;
    dispatch(toggleWishlist(product.id));
  };

  const handleAddToCart = async () => {
    if (!requireLogin()) return;

    const result = await dispatch(
      addCartItem({ productId: product.id, quantity })
    );

    if (addCartItem.fulfilled.match(result)) {
      alert(`${quantity}点をカートに追加しました。`);
    } else {
      alert(result.payload ?? 'カートへの追加に失敗しました。');
    }
  };

  return {
    quantity,
    changeQuantity,
    maxQuantity,
    isSoldOut,
    totalPrice,
    isWished,
    isAdding,
    handleToggleWish,
    handleAddToCart,
  };
}

export default useProductPurchase;
