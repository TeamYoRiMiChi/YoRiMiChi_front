import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addCartItem } from '../../features/cart/cartSlice';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';

// 공동구매 상품 요약 영역의 동작을 관리하는 Hook
function useGroupPurchaseSummary(initialOption, productId) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const wishlistIds = useSelector((state) => state.wishlist.ids);
  // 현재 선택한 상품 수량을 기억 처음 수량은 1
  const [quantity, setQuantity] = useState(1);

  const isWished = wishlistIds.includes(productId);

  // 현재 선택한 상품 옵션을 기억
  const [selectedOption, setSelectedOption] = useState(initialOption);

  // 장바구니 버튼을 누른 뒤 보여줄 임시 안내 문구를 기억합니다.
  const [cartMessage, setCartMessage] = useState('');

  // ＋ 버튼을 누르면 수량을 1 증가
  const handleIncreaseQuantity = () => {
    setQuantity((previousQuantity) => previousQuantity + 1);
  };

  // − 버튼을 누르면 수량을 줄이되, 1보다 작아지지 않게
  const handleDecreaseQuantity = () => {
    setQuantity((previousQuantity) => Math.max(1, previousQuantity - 1));
  };

  // 찜 버튼을 누를 때마다 선택 상태를 반대로
  const handleToggleWish = () => {
    if (!accessToken) {
      alert('ログインが必要です。ログインページへ移動します。');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    dispatch(toggleWishlist(productId));
  };

  // 옵션 선택 상자에서 고른 값으로 상태를 변경
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // API 연결 전까지 선택한 옵션과 수량을 안내 문구로 
  const handleAddToCart = async () => {
    if (!accessToken) {
      alert('ログインが必要です。ログインページへ移動します。');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    try {
      await dispatch(addCartItem({ productId, quantity })).unwrap();
      setCartMessage(`${selectedOption}を${quantity}個、カートに入れました。`);
    } catch (message) {
      setCartMessage(message || 'カートへの追加に失敗しました。');
    }
  };

  return {
    quantity,
    isWished,
    selectedOption,
    cartMessage,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleToggleWish,
    handleOptionChange,
    handleAddToCart,
  };
}

export default useGroupPurchaseSummary;
