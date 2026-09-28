import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLine, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '../../hooks/useTheme';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'よくある質問', to: '/faq' },
  { label: 'ご利用案内', to: '/guide' },
  { label: '利用規約', to: '/terms' },
  { label: 'プライバシーポリシー', to: '/privacy' },
];

const BIZ_INFO = [
  { label: '運営者', value: 'YoRiMiChi運営チーム' },
  { label: '個人情報保護責任者', value: 'YoRiMiChi運営チーム' },
  { label: 'メールアドレス', value: 'gusals0908@gmail.com' },
  { label: 'ホスティング提供', value: 'Amazon Web Services' },
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
  const theme = useTheme();

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer">
      <button
        type="button"
        className="footer_totop"
        onClick={scrollToTop}
        aria-label="ページ上部へ戻る"
      >
        <TopArrowIcon />
      </button>

      <div className="footer_inner">
        <div className="footer_top">
          {/* ブランド */}
          <div className="footer_col footer_brand">
            <div className="footer_brand_row">
              <img src={theme.logo} alt="YoRiMiChi" className="footer_logo" />
              <span className="footer_seal" aria-hidden="true">良</span>
            </div>
            <p className="footer_slogan">
              日本のいいものを、
              <br />
              もっと手軽に、もっとお得に
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

          {/* ご案内 */}
          <nav className="footer_col footer_links" aria-label="サポートリンク">
            <h4 className="footer_col_title">ご案内</h4>
            <ul>
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* カスタマーセンター */}
          <div className="footer_col footer_cs">
            <h4 className="footer_col_title">カスタマーセンター</h4>
            <p className="footer_cs_tel footer_cs_email">
              <a href="mailto:gusals0908@gmail.com">gusals0908@gmail.com</a>
            </p>
            <p className="footer_cs_time">
              お問い合わせはメールで受け付けています。
            </p>
          </div>
        </div>

        {/* 事業者情報（アコーディオン） */}
        <div className="footer_bizinfo">
          <button
            type="button"
            className="footer_bizinfo_toggle"
            aria-expanded={bizOpen}
            onClick={() => setBizOpen((prev) => !prev)}
          >
            事業者情報
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

        {/* 著作権 */}
        <div className="footer_bottom">
          <p className="footer_copy">&copy; 2026 YoRiMiChi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
