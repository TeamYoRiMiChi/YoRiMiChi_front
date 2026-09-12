import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import './AdminLayout.css';

/**
 * 관리자 페이지 공통 뼈대 (사이드바 + 상단바 + 실제 페이지 영역)
 *
 * 사이드 메뉴를 클릭하면 routes/Router.jsx에 등록된 /admin 하위 라우트가 바뀌고,
 * 그 라우트에 매칭된 페이지 컴포넌트가 <Outlet /> 자리에 렌더링됩니다.
 * 각 메뉴의 실제 내용(표, 차트, 폼 등)은 담당자가 해당 페이지 컴포넌트 안에서 구현하면 됩니다.
 */
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
