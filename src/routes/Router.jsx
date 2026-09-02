import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Faq from "../pages/Faq/Faq";

import GroupPurchase from "../pages/Group_purchase/Group_purchase";
import Overseas from '../pages/Overseas/Overseas';
import Guide from '../pages/Guide/Guide';
import CustomerService from '../pages/Customer_Service/CustomerService';
import SignUp from '../pages/SignUp/SignUp';
import MyPage from '../pages/MyPage/MyPage';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>

        {/* 누구나 접근 가능 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* 헤더 링크가 /join이라 같은 화면으로 연결 */}
        <Route path="/join" element={<Navigate to="/signup" replace />} />

        <Route path="/faq" element={<Faq />} />
        <Route path="/groupbuy" element={<GroupPurchase />} />
        <Route path="/overseas" element={<Overseas />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/support" element={<CustomerService />} />

        {/* 로그인 필요 */}
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        {/* 없는 경로는 홈으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default Router;
