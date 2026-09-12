import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeaf,
  faHouse,
  faBoxOpen,
  faClipboardList,
  faUser,
  faFolder,
  faUserGroup,
  faCommentDots,
  faTicket,
} from '@fortawesome/free-solid-svg-icons';
import './AdminSidebar.css';

/**
 * 관리자 사이드 메뉴 목록
 * to: 실제 라우트 경로 (routes/Router.jsx의 /admin 하위 라우트와 1:1로 맞춰야 함)
 * end: true면 하위 경로에서는 active 표시가 꺼짐 (대시보드 index 라우트용)
 */
const NAV_ITEMS = [
  { to: '/admin', label: '대시보드', icon: faHouse, end: true },
  { to: '/admin/products', label: '상품 관리', icon: faBoxOpen },
  { to: '/admin/orders', label: '주문 관리', icon: faClipboardList },
  { to: '/admin/users', label: '회원 관리', icon: faUser },
  { to: '/admin/categories', label: '카테고리 관리', icon: faFolder },
  { to: '/admin/groupbuy', label: '공동구매 관리', icon: faUserGroup },
  { to: '/admin/inquiries', label: '문의 답변', icon: faCommentDots },
  { to: '/admin/coupons', label: '쿠폰·포인트 관리', icon: faTicket },
];

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <FontAwesomeIcon icon={faLeaf} className="admin-logo-icon" />
        <span>YORIMICHI <b>ADMIN</b></span>
      </div>

      <nav className="admin-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `admin-nav-item${isActive ? ' active' : ''}`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="admin-nav-icon" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <p>좋은 먹거리가<br />좋은 일상을 만듭니다.</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
