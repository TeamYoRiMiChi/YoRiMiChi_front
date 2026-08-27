import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLine, faYoutube } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/images/yomi_logo_jp.png';
import './Footer.css';

const QUICK_LINKS = [
  { label: '공지사항', href: '#' },
  { label: '자주 묻는 질문', href: '/faq' },
  { label: '배송·교환·환불', href: '#' },
  { label: '이용약관', href: '/guide' },
  { label: '개인정보처리방침', href: '#' },
];

const BIZ_INFO = [
  { label: '상호명', value: '(주)요리미치' },
  { label: '대표자', value: '요리미치' },
  { label: '사업자등록번호', value: '123-45-67890' },
  { label: '통신판매업신고', value: '제 2026-대전유성-0000호' },
  { label: '개인정보보호책임자', value: '요리미치' },
  { label: '주소', value: '대전광역시 유성구 대학로 99, 3층 (궁동)' },
  { label: '이메일', value: 'help@yorimichi.co.kr' },
  { label: '호스팅 제공', value: '(주)요리미치' },
];

const ChevronIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 12 8" width="10" height="7" aria-hidden="true">
    <path
      d="M1 1L6 6L11 1"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TopArrowIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M8 3L13 9H10V13H6V9H3L8 3Z" fill="currentColor" />
  </svg>
);

const Footer = () => {
  const [bizOpen, setBizOpen] = useState(false);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer">
      <button type="button" className="footer_totop" onClick={scrollToTop} aria-label="맨 위로 이동">
        <TopArrowIcon />
      </button>

      <div className="footer_inner">
        <div className="footer_top">
          {/* 브랜드 */}
          <div className="footer_col footer_brand">
            <div className="footer_brand_row">
              <img src={logo} alt="YoRiMiChi" className="footer_logo" />
              <span className="footer_seal" aria-hidden="true">良</span>
            </div>
            <p className="footer_slogan">
              일본의 좋은 것들을
              <br />
              더 쉽고 저렴하게
            </p>
            <div className="footer_sns">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://line.me" target="_blank" rel="noreferrer" aria-label="LINE">
                <FontAwesomeIcon icon={faLine} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* 바로가기 */}
          <nav className="footer_col footer_links" aria-label="고객지원 링크">
            <h4 className="footer_col_title">바로가기</h4>
            <ul>
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 고객센터 */}
          <div className="footer_col footer_cs">
            <h4 className="footer_col_title">고객센터</h4>
            <p className="footer_cs_tel">1588-0000</p>
            <p className="footer_cs_time">
              평일 10:00 - 18:00
              <br />
              점심 12:30 - 13:30
              <br />
              주말·공휴일 휴무
            </p>
          </div>
        </div>

        {/* 사업자 정보 (아코디언) */}
        <div className="footer_bizinfo">
          <button
            type="button"
            className="footer_bizinfo_toggle"
            aria-expanded={bizOpen}
            onClick={() => setBizOpen((prev) => !prev)}
          >
            사업자 정보
            <ChevronIcon className={`footer_chevron ${bizOpen ? 'is-open' : ''}`} />
          </button>

          <div className={`footer_bizinfo_panel ${bizOpen ? 'is-open' : ''}`}>
            <div className="footer_bizinfo_panel_inner">
              <dl className="footer_bizinfo_grid">
                {BIZ_INFO.map((item) => (
                  <div className="footer_bizinfo_item" key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="footer_bottom">
          <p className="footer_copy">&copy; 2026 YoRiMiChi Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;