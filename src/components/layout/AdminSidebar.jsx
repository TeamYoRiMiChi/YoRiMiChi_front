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
 * 관리자 사이드 메뉴 목록 (섹션별로 그룹핑)
 * to: 실제 라우트 경로 (routes/Router.jsx의 /admin 하위 라우트와 1:1로 맞춰야 함)
 * end: true면 하위 경로에서는 active 표시가 꺼짐 (대시보드 index 라우트용)
 *
 * 메뉴를 추가/변경할 때는 이 배열만 수정하면 됩니다.
 * AdminTopbar의 페이지 타이틀도 이 목록을 그대로 참조합니다.
 */
const NAV_GROUPS = [
  {
    title: null,
    items: [{ to: '/admin', label: '대시보드', icon: faHouse, end: true }],
  },
  {
    title: '운영 관리',
    items: [
      { to: '/admin/products', label: '상품 관리', icon: faBoxOpen },
      { to: '/admin/orders', label: '주문 관리', icon: faClipboardList },
      { to: '/admin/groupbuy', label: '공동구매 관리', icon: faUserGroup },
      { to: '/admin/categories', label: '카테고리 관리', icon: faFolder },
    ],
  },
  {
    title: '고객 관리',
    items: [
      { to: '/admin/users', label: '회원 관리', icon: faUser },
      { to: '/admin/inquiries', label: '문의 답변', icon: faCommentDots },
    ],
  },
  {
    title: '프로모션',
    items: [{ to: '/admin/coupons', label: '쿠폰·포인트 관리', icon: faTicket }],
  },
];

// AdminTopbar에서 현재 페이지 타이틀을 찾을 때 재사용하는 평탄화 목록
export const ADMIN_NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <span className="admin-logo-badge">
          <FontAwesomeIcon icon={faLeaf} />
        </span>
        <span className="admin-logo-text">
          <span className="admin-logo-main">YORIMICHI</span>
          <span className="admin-logo-sub">ADMIN CONSOLE</span>
        </span>
      </div>

      <nav className="admin-nav">
        {NAV_GROUPS.map((group, idx) => (
          <div className="admin-nav-group" key={group.title ?? `group-${idx}`}>
            {group.title && (
              <p className="admin-nav-group-title">{group.title}</p>
            )}
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `admin-nav-item${isActive ? ' active' : ''}`
                }
              >
                <span className="admin-nav-icon-wrap">
                  <FontAwesomeIcon icon={item.icon} className="admin-nav-icon" />
                </span>
                <span className="admin-nav-label">{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <FontAwesomeIcon icon={faLeaf} className="admin-sidebar-footer-icon" />
        <p>좋은 먹거리가<br />좋은 일상을 만듭니다.</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
