import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * 관리자 전용 페이지를 감싸는 가드
 *
 * 비로그인 상태면 로그인 페이지로 보내고,
 * 로그인은 되어 있지만 관리자 권한이 없으면 홈으로 보냅니다.
 *
 * TODO: user.role 필드명/값은 백엔드 응답에 맞춰 확인 필요
 */
const AdminRoute = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
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

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
