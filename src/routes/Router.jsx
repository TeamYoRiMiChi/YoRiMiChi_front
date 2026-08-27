import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import PrivateRoute from './PrivateRoute';
import Faq from '../pages/Faq/Faq';


import GroupPurchase from "../pages/group_purchase/group_purchase";
import Overseas from '../pages/Overseas/Overseas';
import Guide from '../pages/Guide/Guide';
import CustomerService from '../pages/Customer_Service/CustomerService';
import Sign_Up from '../pages/Sign_Up/Sign_Up';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/groupbuy" element={<GroupPurchase />} />
        <Route path="/overseas" element={<Overseas />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/support" element={<CustomerService />} />
        <Route path="/join" element={<Sign_Up />} />

        <Route element={<PrivateRoute />}> {/* 로그인 이후 사용 가능 router */}
          {/* <Route path="/mypage" element={<MyPage />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;