import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleUser, faChevronDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../features/auth/authSlice';
import './AdminTopbar.css';

/**
 * 관리자 공통 상단바 (알림 + 관리자 프로필)
 *
 * 페이지 제목/필터(날짜 범위 등)는 각 페이지 컴포넌트에서 그립니다.
 * 여기서는 모든 관리자 페이지에 공통으로 떠 있어야 하는 요소만 둡니다.
 */
const AdminTopbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return (
    <div className="admin-topbar">
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
          <FontAwesomeIcon icon={faCircleUser} className="admin-profile-avatar" />
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
  );
};

export default AdminTopbar;
