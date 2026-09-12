import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Faq from "../pages/Faq/Faq";

import GroupPurchase from "../pages/Group_purchase/Group_purchase";
import Overseas from '../pages/Overseas/Overseas';
import Guide from '../pages/Guide/Guide';
import CustomerService from '../pages/Customer_Service/CustomerService';
import SignUp from '../pages/SignUp/SignUp';
import MyPage from '../pages/MyPage/MyPage';
import ProductInfo from "../pages/Overseas/ProductInfo";
import GroupPurchaseView from "../pages/Group_purchase/GroupPurchaseView";
import Order from "../pages/Order/Order";
import AdminLayout from "../components/layout/AdminLayout";
import AdminPage from "../pages/Admin/AdminPage";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminOrders from "../pages/Admin/AdminOrders";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminCategories from "../pages/Admin/AdminCategories";
import AdminGroupBuy from "../pages/Admin/AdminGroupBuy";
import AdminInquiries from "../pages/Admin/AdminInquiries";
import AdminCoupons from "../pages/Admin/AdminCoupons";

function Router() {
  return (
    <Routes>
      {/* 관리자 전용 */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="groupbuy" element={<AdminGroupBuy />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="coupons" element={<AdminCoupons />} />
        </Route>
      </Route>

      <Route element={<Layout />}>

        {/* 누구나 접근 가능 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* 헤더 링크가 /join이라 같은 화면으로 연결 */}
        <Route path="/join" element={<Navigate to="/signup" replace />} />

        <Route path="/faq" element={<Faq />} />
        <Route path="/groupbuy" element={<GroupPurchase />} />
        <Route path="/groupbuy/:productId" element={<GroupPurchaseView />} />
        <Route path="/overseas" element={<Overseas />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/support" element={<CustomerService />} />
        <Route path="/overseas/:productId" element={<ProductInfo />} />

        {/* 로그인 필요 */}
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPage />} />
          {/* 장바구니에서 여러 상품을 한 번에 주문하는 경우 */}
          <Route path="/order" element={<Order />} />
          {/* 상품 상세에서 바로구매하는 경우 */}
          <Route path="/order/:productId" element={<Order />} />
        </Route>

        {/* 없는 경로는 홈으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default Router;
