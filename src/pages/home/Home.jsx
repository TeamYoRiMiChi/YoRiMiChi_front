import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faUsers,
  faShieldHalved,
  faHeadset,
  faTruckFast,
  faPlane,
} from '@fortawesome/free-solid-svg-icons';
import HomeReasons from '../../components/Home_components/HomeReasons';
import HomeComparison from '../../components/Home_components/HomeComparison';
import HomeStatistics from '../../components/Home_components/HomeStatistics';
import homeHeroBanner from '../../assets/images/home_hero_banner_v7.png';
import '../../assets/styles/Home.css';

const HERO_BENEFITS = [
  {
    id: 1,
    icon: faPlane,
    label: '日本現地購入',
    path: '/mypage',
  },
  {
    id: 2,
    icon: faShieldHalved,
    label: '安心の検品',
    path: '/mypage',
  },
  {
    id: 3,
    icon: faTruckFast,
    label: 'スピード配送',
    path: '/mypage',
  },
  {
    id: 4,
    icon: faHeadset,
    label: '24時間サポート',
    path: '/support',
  },
];

const FEATURES = [
  {
    id: 1,
    icon: faBagShopping,
    title: '豊富な日本の商品',
    description: '日本各地のさまざまな商品を手軽に購入できます。',
    color: 'purple',
  },
  {
    id: 2,
    icon: faUsers,
    title: 'みんなでお得に購入',
    description: '共同購入なら、参加者が集まるほどお得になります。',
    color: 'pink',
  },
  {
    id: 3,
    icon: faShieldHalved,
    title: '安心できるサービス',
    description: '丁寧な検品と安全な梱包で商品をお届けします。',
    color: 'green',
  },
  {
    id: 4,
    icon: faHeadset,
    title: '親切なカスタマーサポート',
    description: 'お困りの時はカスタマーセンターがサポートします。',
    color: 'blue',
  },
];

function Home() {
  return (
    <div className="home">
      {/* 1. main banner */}
      <section className="home_hero">
        <div className="home_hero_inner">
          {/* left banner text */}
          <div className="home_hero_content">
            <h1 className="home_hero_title">
              日本のいいものを、
              <br />
              <strong>もっと手軽に、もっとお得に</strong>
            </h1>

            <p className="home_hero_description">
              日本の商品を海外購入でもっと手軽に。
              <br />
              共同購入なら、みんなでお得に購入できます。
              <br />
              YoRiMiChiが新しいショッピング体験をお届けします。
            </p>

            <div className="home_hero_buttons">
              <Link
                to="/overseas"
                className="home_hero_button home_hero_button_primary"
                >
                  海外購入を始める
                </Link>

                <Link
                  to="/groupbuy"
                  className="home_hero_button home_hero_button_outline"
                >
                  共同購入に参加する
                </Link>
            </div>

            <nav 
              className="home_hero_benefits"
              aria-label="サービスメニュー"
            >
              {HERO_BENEFITS.map((benefit) => (
                <Link
                  to={benefit.path}
                  className="home_hero_benefit"
                  key={benefit.id}
                >
                  <FontAwesomeIcon icon={benefit.icon} />
                  <span>{benefit.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* banner image area */}
          <div className="home_hero_visual">
            <img
              src={homeHeroBanner}
              alt="YoRiMiChiの海外購入と共同購入サービス"
            />
          </div>
        </div>
      </section>

      {/* service features */}
      <section className="home_features">
        <div className="home_inner">
          <h2 className="home_section_title">YoRiMiChiの特徴</h2>

          <div className="home_feature_list">
            {FEATURES.map((feature) => (
              <article className='home_feature_card' key={feature.id}>
                <div
                  className={`home_feature_icon home_feature_icon_${feature.color}`}
                >
                  <FontAwesomeIcon icon={feature.icon} />
                </div>

                <div className="home_feature_content">
                  <h3 className="home_feature_title">
                    {feature.title}
                  </h3>

                  <p className="home_feature_description">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* home comparison */}
      <HomeComparison />

      {/* why choose us */}
      <HomeReasons />

      {/* service stats */}
      <HomeStatistics />

    </div>
  );
}

export default Home;
