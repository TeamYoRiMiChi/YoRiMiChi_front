import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './routes/Router';
import { initializeAuthentication } from './features/auth/authSlice';
import { fetchWishlist, clearWishlist } from './features/wishlist/wishlistSlice';
import { fetchCart, resetCart } from './features/cart/cartSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { accessToken, initialized } = useSelector((s) => s.auth);

  /**
   * Amplify의 sessionStorage에서 Cognito 세션을 복원합니다.
   */
  useEffect(() => {
    dispatch(initializeAuthentication());
  }, [dispatch]);

  /* 로그인하면 찜·장바구니를 불러오고, 로그아웃하면 비웁니다 */
  useEffect(() => {
    if (!initialized) return;

    if (accessToken) {
      dispatch(fetchWishlist());
      dispatch(fetchCart());
    } else {
      dispatch(clearWishlist());
      dispatch(resetCart());
    }
  }, [accessToken, initialized, dispatch]);

  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
