import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../features/auth/authSlice';
import { ADMIN_NAV_ITEMS } from './AdminSidebar';
import './AdminTopbar.css';

/**
 * 관리자 공통 상단바 (현재 페이지 타이틀 + 알림 + 관리자 프로필)
 *
 * 왼쪽 타이틀은 AdminSidebar의 메뉴 목록(ADMIN_NAV_ITEMS)을 기준으로
 * 현재 경로에 맞는 라벨을 자동으로 찾아 보여줍니다.
 * 메뉴가 추가되면 AdminSidebar의 NAV_GROUPS에만 등록하면 여기도 자동 반영됩니다.
 *
 * 페이지별 상세 필터(날짜 범위 등)는 각 페이지 컴포넌트에서 그립니다.
 * 여기서는 모든 관리자 페이지에 공통으로 떠 있어야 하는 요소만 둡니다.
 */
const getPageTitle = (pathname) => {
  const matched = ADMIN_NAV_ITEMS.find((item) =>
    item.end
      ? pathname === item.to
      : pathname === item.to || pathname.startsWith(`${item.to}/`)
  );
  return matched?.label || '대시보드';
};

const AdminTopbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.auth.user);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const pageTitle = getPageTitle(pathname);
  const initial = (user?.name || '관').charAt(0);

  return (
    <div className="admin-topbar">
      <h1 className="admin-topbar-title">{pageTitle}</h1>

      <div className="admin-topbar-actions">
        {/* TODO: 실제 알림 목록/개수는 알림 기능 붙을 때 연동 */}
        <button className="admin-icon-bt" aria-label="알림">
          <FontAwesomeIcon icon={faBell} />
          <span className="admin-notif-badge">3</span>
        </button>

        <div className="admin-profile" ref={menuRef}>
          <button
            className={`admin-profile-bt${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="admin-profile-avatar">{initial}</span>
            <span className="admin-profile-name">{user?.name || '관리자'}</span>
            <FontAwesomeIcon icon={faChevronDown} className="admin-profile-arrow" />
          </button>

          {menuOpen && (
            <ul className="admin-profile-dropdown">
              <li>
                <button onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span>로그아웃</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
