import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faUsers,
  faShieldHalved,
  faHeadset,
  faCircleCheck,
  faTag,
  faEye,
  faGift,
  faHeart,
  faCartShopping,
  faFaceSmile,
  faBoxOpen,
  faTruckFast,
  faPlane,
} from '@fortawesome/free-solid-svg-icons';
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

const COMPARISON_ITEMS = [
  {
    id: 1,
    type: 'overseas',
    icon: faBagShopping,
    title: '海外購入',
    description: '欲しい商品をいつでも自由に購入できます。',
    points: [
      '商品を1点から注文可能',
      '在庫を確認してすぐに注文',
      '幅広い商品から自由に選択',
    ],
  },
  {
    id: 2,
    type: 'group',
    icon: faUsers,
    title: '共同購入',
    description: 'みんなでまとめて、もっとお得に購入できます。',
    points: [
      '参加者が集まるほどお得',
      '目標人数の達成後に購入',
      '同じ商品をみんなで注文',
    ],
  }
];

const REASONS = [
  {
    id: 1,
    icon: faTag,
    title: '納得できる価格',
    description: '海外購入と共同購入の割引で、お得な価格を実現します。',
  },
  {
    id: 2,
    icon: faEye,
    title: '透明な進行状況',
    description: '注文から配送まで、商品の状況を分かりやすくご案内します。',
  },
  {
    id: 3,
    icon: faGift,
    title: 'さまざまなイベント',
    description: '会員特典や割引クーポンなど、多様なイベントを実施します。',
  },
  {
    id: 4,
    icon: faHeart,
    title: '高いリピート満足度',
    description: '安心できるサービスで、また利用したい体験をお届けします。',
  },
];

const STATISTICS = [
  {
    id: 1,
    icon: faUsers,
    value: '10,000+',
    label: '累計会員数',
    color: 'purple',
  },
  {
    id: 2,
    icon: faCartShopping,
    value: '5,000+',
    label: '累計注文数',
    color: 'pink',
  },
  {
    id: 3,
    icon: faFaceSmile,
    value: '98%',
    label: '顧客満足度',
    color: 'green',
  },
  {
    id: 4,
    icon: faBoxOpen,
    value: '100%',
    label: '検品・梱包',
    color: 'blue',
  },
  {
    id: 5,
    icon: faTruckFast,
    value: '7～10日',
    label: '平均配送期間',
    color: 'violet',
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
      <section className="home_comparison">
        <div className="home_inner">
          <h2 className="home_section_title">
            海外購入と共同購入
          </h2>

          <div className="home_comparison_list">
            {COMPARISON_ITEMS.map((item) => (
              <article
                className={`home_comparison_card home_comparison_card_${item.type}`}
                key={item.id}
              >
                <div
                  className={`home_comparison_icon home_comparison_icon_${item.type}`}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </div>

                <h3 className="home_comparison_card_title">
                  {item.title}
                </h3>

                <p className="home_comparison_description">
                  {item.description}
                </p>

                <ul className="home_comparison_points">
                  {item.points.map((point) => (
                    <li key={point}>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="home_comparison_check"
                      />

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <span className="home_comparison_vs">VS</span>
          </div>
        </div>
      </section>

      {/* why choose us */}
      <section className="home_reasons">
        <div className="home_inner">
          <h2 className="home_section_title">
            なぜYoRiMiChiなのか？
          </h2>

          <div className="home_reason_list">
            {REASONS.map((reason) => (
              <article className="home_reason_item" key={reason.id}>
                <div className="home_reason_icon">
                  <FontAwesomeIcon icon={reason.icon} />
                </div>

                <div className="home_reason_content">
                  <h3 className="home_reason_title">
                    {reason.title}
                  </h3>

                  <p className="home_reason_description">
                    {reason.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* service stats */}
      <section className="home_statistics">
        <div className="home_inner">
          <h2 className="home_section_title">
            数字で見るYoRiMiChi
          </h2>

          <div className="home_statistic_list">
            {STATISTICS.map((statistic) => (
              <article className="home_statistic_item" key={statistic.id}>
                <div
                  className={`home_statistic_icon home_statistic_icon_${statistic.color}`}
                >
                  <FontAwesomeIcon icon={statistic.icon} />
                </div>

                <div className="home_statistic_content">
                  <strong className="home_statistic_value">
                    {statistic.value}
                  </strong>

                  <p className="home_statistic_label">
                    {statistic.label}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
