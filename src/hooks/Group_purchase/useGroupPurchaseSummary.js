import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addCartItem, fetchCart } from '../../features/cart/cartSlice';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import { getMyGroupBuyParticipation, participateGroupBuy } from '../../api/groupBuyApi';

// 공동구매 상품 요약 영역의 동작을 관리하는 Hook
function useGroupPurchaseSummary(product, onParticipantsChange) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const wishlistIds = useSelector((state) => state.wishlist.ids);
  // 현재 선택한 상품 수량을 기억 처음 수량은 1
  const [quantity, setQuantity] = useState(1);

  const isWished = wishlistIds.includes(product.productId);

  // 현재 선택한 상품 옵션을 기억
  const [selectedOption, setSelectedOption] = useState(product.options[0]);

  // 장바구니 버튼을 누른 뒤 보여줄 임시 안내 문구를 기억합니다.
  const [cartMessage, setCartMessage] = useState('');
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isApplicationSubmitting, setIsApplicationSubmitting] = useState(false);
  const [isApplicationLoading, setIsApplicationLoading] = useState(false);
  const [isApplicationComplete, setIsApplicationComplete] = useState(false);
  const [applicationError, setApplicationError] = useState('');
  const [appliedQuantity, setAppliedQuantity] = useState(null);
  const [currentParticipants, setCurrentParticipants] = useState(product.currentParticipants);
  const [existingApplicationQuantity, setExistingApplicationQuantity] = useState(0);

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

    dispatch(toggleWishlist(product.productId));
  };

  // 옵션 선택 상자에서 고른 값으로 상태를 변경
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // 공동구매 신청 모달 열기
  const handleApplyGroupBuy = async () => {
    if (!accessToken) {
      alert('ログインが必要です。ログインページへ移動します。');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    setApplicationError('');
    setIsApplicationComplete(false);
    setAppliedQuantity(null);
    setIsApplicationModalOpen(true);

    setIsApplicationLoading(true);
    try {
      const response = await getMyGroupBuyParticipation(product.productId);
      setExistingApplicationQuantity(response.data.data.quantity ?? 0);
      setCurrentParticipants(response.data.data.currentQuantity);
      onParticipantsChange?.(response.data.data.currentQuantity);
    } catch (error) {
      setApplicationError(
        error.response?.data?.message || '申し込み情報を読み込めませんでした。'
      );
    } finally {
      setIsApplicationLoading(false);
    }
  };

  const handleCloseApplicationModal = () => {
    if (isApplicationSubmitting) return;
    setIsApplicationModalOpen(false);
  };

  const handleConfirmApplication = async () => {
    setIsApplicationSubmitting(true);
    setApplicationError('');

    try {
      const response = await participateGroupBuy(product.productId, quantity);
      setCurrentParticipants(response.data.data.currentQuantity);
      onParticipantsChange?.(response.data.data.currentQuantity);
      setAppliedQuantity(response.data.data.quantity);
      setExistingApplicationQuantity(response.data.data.quantity);
      setIsApplicationComplete(true);
      dispatch(fetchCart());
    } catch (error) {
      setApplicationError(
        error.response?.data?.message || '共同購入への申し込みに失敗しました。'
      );
    } finally {
      setIsApplicationSubmitting(false);
    }
  };

  // API 연결 전까지 선택한 옵션과 수량을 안내 문구로 
  const handleAddToCart = async () => {
    if (!accessToken) {
      alert('ログインが必要です。ログインページへ移動します。');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    try {
      await dispatch(addCartItem({ productId: product.productId, quantity })).unwrap();
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
    currentParticipants,
    isApplicationModalOpen,
    isApplicationSubmitting,
    isApplicationLoading,
    isApplicationComplete,
    applicationError,
    appliedQuantity,
    existingApplicationQuantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleToggleWish,
    handleOptionChange,
    handleApplyGroupBuy,
    handleCloseApplicationModal,
    handleConfirmApplication,
    handleAddToCart,
  };
}

export default useGroupPurchaseSummary;
