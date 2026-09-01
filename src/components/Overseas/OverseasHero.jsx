import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faShieldHalved,
  faSuitcaseRolling,
  faTruckFast,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import overseasBanner from '../../assets/images/overseas_banner.png';
import '../../assets/styles/Overseas/components/OverseasHero.css';

const FEATURES = [
  { icon: faShieldHalved, label: '100％正規品保証' },
  { icon: faSuitcaseRolling, label: '日本現地で購入' },
  { icon: faWallet, label: '安心・安全な決済' },
  { icon: faTruckFast, label: 'スピード配送' },
  { icon: faClock, label: 'リアルタイム配送追跡' },
];

function OverseasHero() {
  return (
    <section className="overseas-hero" aria-label="海外ショッピングのご案内">
      <img
        src={overseasBanner}
        alt="日本の商品をもっと手軽に、安心して購入できる海外ショッピング"
      />

      <div className="overseas-hero-content">
        <div className="overseas-hero-copy">
          <h1>
            欲しかった日本の商品を、
            <strong>もっと手軽に、安心に。</strong>
          </h1>
          <p>
            日本の人気商品を
            <span>簡単・安全にお届けします。</span>
          </p>
        </div>

        <ul className="overseas-hero-features" aria-label="海外ショッピングの特徴">
          {FEATURES.map((f) => (
            <li key={f.label}>
              <FontAwesomeIcon icon={f.icon} />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default OverseasHero;
