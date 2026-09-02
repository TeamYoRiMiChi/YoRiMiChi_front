import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * 로그인이 필요한 페이지를 감싸는 가드
 *
 * 비로그인 상태면 로그인 페이지로 보내되,
 * 원래 가려던 경로를 state.from에 담아둡니다.
 * 로그인에 성공하면 그 경로로 다시 돌려보냅니다.
 */
function PrivateRoute() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const location = useLocation();

  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}

export default PrivateRoute;
