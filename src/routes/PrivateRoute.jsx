import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute() {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;