import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './routes/Router';
import { fetchMyInfo } from './features/auth/authSlice';
import { fetchWishlist, clearWishlist } from './features/wishlist/wishlistSlice';
import { fetchCart, resetCart } from './features/cart/cartSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((s) => s.auth.accessToken);

  /**
   * 새로고침 시 localStorage에서 복구한 토큰이 아직 유효한지 확인합니다.
   * 만료됐으면 fetchMyInfo가 실패하면서 자동으로 로그아웃 처리됩니다.
   */
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchMyInfo());
    }
    // 최초 1회만 검증
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 로그인하면 찜·장바구니를 불러오고, 로그아웃하면 비웁니다 */
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchWishlist());
      dispatch(fetchCart());
    } else {
      dispatch(clearWishlist());
      dispatch(resetCart());
    }
  }, [accessToken, dispatch]);

  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
