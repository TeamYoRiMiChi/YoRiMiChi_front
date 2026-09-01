import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './routes/Router';
import { fetchWishlist, clearWishlist } from './features/wishlist/wishlistSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((s) => s.auth.accessToken);

  /* 로그인하면 찜 목록을 한 번 불러오고, 로그아웃하면 비웁니다 */
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchWishlist());
    } else {
      dispatch(clearWishlist());
    }
  }, [accessToken, dispatch]);

  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
