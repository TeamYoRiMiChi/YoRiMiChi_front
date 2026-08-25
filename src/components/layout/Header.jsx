import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import logo from '../../assets/images/yomi_logo_jp.png';
import './Header.css';
import CartDrawer from './CartDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faUser,
  faUserPlus,
  faCartShopping,
  faGlobe,
  faChevronDown,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';

const TEXT = {
  ja: {
    overseas: '海外購入',
    groupBuy: '共同購入',
    guide: 'ご利用案内',
    support: 'カスタマーセンター',
    searchPlaceholder: '商品名、キーワードで検索',
    login: 'ログイン',
    logout: 'ログアウト',
    join: '会員登録',
    cart: 'カート',
    currentLang: '日本語',     // ← 현재 선택된 언어 표시
    mypage: 'mypage',
  },
  ko: {
    overseas: '해외직구',
    groupBuy: '공동구매',
    guide: '이용안내',
    support: '고객센터',
    searchPlaceholder: '상품명, 키워드로 검색',
    login: '로그인',
    logout: '로그아웃',
    join: '회원가입',
    cart: '장바구니',
    currentLang: '한국어',     // ← 현재 선택된 언어 표시
    mypage: '마이페이지',
  },
};

function Header() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  // const accessToken = 'test-token';
  const [lang, setLang] = useState('ko');
  const [keyword, setKeyword] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef(null);   // 검색 영역 전체
  const inputRef = useRef(null);    // 인풋 자체 (자동 포커스용)

  const t = TEXT[lang];
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = 2;

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  // 검색창이 열리면 자동으로 인풋에 포커스
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // 언어 드롭다운 바깥 클릭 → 닫기
  useEffect(() => {
    if (!langOpen) return;

    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langOpen]);

  // 바깥 클릭 감지 → 검색창 닫기
  useEffect(() => {
    if (!searchOpen) return;

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // ESC 키로도 닫기
  useEffect(() => {
    if (!searchOpen) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [searchOpen]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const selectLang = (code) => {
    setLang(code);
    setLangOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    console.log(keyword);
    // 검색 로직 (예: navigate(`/search?q=${keyword}`))
  };

  const handleSearchClick = () => {
    // 닫혀있으면 열기, 열려있으면 검색 실행
    if (!searchOpen) {
      setSearchOpen(true);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header_inner">

          <div className="logo">
            <Link to="/">
              <img src={logo} alt="YoRiMiChi" />
            </Link>
          </div>

          <nav className="featurs">
            <Link to="/overseas" className="featurs_menu">{t.overseas}</Link>
            <Link to="/groupbuy" className="featurs_menu">{t.groupBuy}</Link>
            <Link to="/guide" className="featurs_menu">{t.guide}</Link>
            <Link to="/support" className="featurs_menu">{t.support}</Link>
          </nav>

          {/* 검색 (접힘/펼침) */}
          <div className={`search_wrap ${searchOpen ? 'open' : ''}`} ref={searchRef}>
            <form className="search_box" onSubmit={handleSearch}>
              <input
                ref={inputRef}
                type="text"
                className="search_input"
                placeholder={t.searchPlaceholder}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                tabIndex={searchOpen ? 0 : -1}
              />
              <button
                type={searchOpen ? 'submit' : 'button'}
                className="search_bt"
                onClick={handleSearchClick}
                aria-label="search"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>

          <div className="member">

            <div className="lang_wrap" ref={langRef}>
              <button
                className={`lang_bt ${langOpen ? 'open' : ''}`}
                onClick={() => setLangOpen((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faGlobe} className="lang_globe" />
                <span className="lang_text">{t.currentLang}</span>
                <FontAwesomeIcon icon={faChevronDown} className="lang_arrow" />
              </button>

              {langOpen && (
                <ul className="lang_dropdown">
                  <li>
                    <button
                      className={`lang_option ${lang === 'ko' ? 'active' : ''}`}
                      onClick={() => selectLang('ko')}
                    >
                      한국어
                    </button>
                  </li>
                  <li>
                    <button
                      className={`lang_option ${lang === 'ja' ? 'active' : ''}`}
                      onClick={() => selectLang('ja')}
                    >
                      日本語
                    </button>
                  </li>
                </ul>
              )}
            </div>


            {accessToken ? (
              <button className="icon_menu" onClick={handleLogout}>
                <FontAwesomeIcon icon={faUser} />
                <span>{t.logout}</span>
              </button>
            ) : (
              <Link to="/login" className='login_bt'>
                <span>{t.login}</span>
              </Link>
            )}

            {accessToken ? (
              <Link to="/join" className="icon_menu">
                <FontAwesomeIcon icon={faUserGear} />
                <span>{t.mypage}</span>
              </Link>

            ) : (
              <Link to="join/" className='join_bt'>
                <span>{t.join}</span>
              </Link>
            )}

            {accessToken ? (
              <button className="icon_menu cart_menu" onClick={() => setCartOpen(true)}>
                <div className="cart_icon_wrap">
                  <FontAwesomeIcon icon={faCartShopping} />
                  {cartCount > 0 && <span className="cart_badge">{cartCount}</span>}
                </div>
                <span>{t.cart}</span>
              </button>

            ) : (
              <div></div>
            )}




          </div>
        </div>
      </header>

      {/* 장바구니 사이드바 */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lang={lang}
      />
    </>
  );
}

export default Header;