import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import PrivateRoute from './PrivateRoute';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}> {/* 로그인 이후 사용 가능 router */}
          {/* <Route path="/mypage" element={<MyPage />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;