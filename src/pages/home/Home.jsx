import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faUsers,
  faShieldHalved,
  faHeadset,
} from '@fortawesome/free-solid-svg-icons';
import HomeReasons from '../../components/Home_components/HomeReasons';
import HomeComparison from '../../components/Home_components/HomeComparison';
import HomeStatistics from '../../components/Home_components/HomeStatistics';
import HomePopularProducts from '../../components/Home_components/HomePopularProducts';
import HomeGroupBuyProducts from '../../components/Home_components/HomeGroupBuyProducts';
import homeHeroBanner from '../../assets/images/home_hero_banner_v7.png';
import overseasPromoBanner from '../../assets/images/Overseas_banner.png';
import groupbuyPromoBanner from '../../assets/images/purchase_hero_v2.png';
import '../../assets/styles/Home.css';
import '../../assets/styles/Home/HomePromo.css';

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
      {/* 1. main promo banner — 기존 .home_hero를 대체합니다.
          기존 히어로 이미지(home_hero_banner_v7)를 메인 배너 배경으로 그대로 쓰고,
          해외직구·공동구매 각각 실제 배너 이미지 에셋을 작은 카드 배경으로 씁니다.
          카피(2,000포인트/3인 무료배송)는 예시 문구이니 실제 진행 중인 이벤트가 있으면 교체해 주세요. */}
      <section className="home_promo">
        <div className="home_inner">
          <div className="home_promo_grid">
            <div
              className="home_promo_main"
              style={{ backgroundImage: `url(${homeHeroBanner})` }}
            >
              <div className="home_promo_main_cap">
                <span className="home_promo_tag">MONTHLY BEST</span>

                <h1 className="home_promo_title">
                  日本のいいものを、
                  <br />
                  もっと手軽に、もっとお得に
                </h1>

                <p className="home_promo_desc">
                  海外購入・共同購入 人気商品を今すぐチェック
                </p>

                <div className="home_promo_buttons">
                  <Link
                    to="/overseas"
                    className="home_promo_btn home_promo_btn_primary"
                  >
                    海外購入を始める
                  </Link>

                  <Link
                    to="/groupbuy"
                    className="home_promo_btn home_promo_btn_outline"
                  >
                    共同購入に参加する
                  </Link>
                </div>
              </div>
            </div>

            <div className="home_promo_side">
              <Link
                to="/overseas"
                className="home_promo_card home_promo_card_overseas"
                style={{ backgroundImage: `url(${overseasPromoBanner})` }}
              >
                <div className="home_promo_card_cap">
                  <span className="home_promo_card_small">海外直購 特典</span>
                  <span className="home_promo_card_big">
                    新規会員 2,000ポイント進呈
                  </span>
                </div>
              </Link>

              <Link
                to="/groupbuy"
                className="home_promo_card home_promo_card_groupbuy"
                style={{ backgroundImage: `url(${groupbuyPromoBanner})` }}
              >
                <div className="home_promo_card_cap">
                  <span className="home_promo_card_small">共同購入イベント</span>
                  <span className="home_promo_card_big">
                    3人集めて送料無料
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 실제 상품 미리보기 — 히어로 바로 아래에 둬서 소개 문구만 있지 않게.
          海外直購·共同購入 추천상품을 각각 화면 전체 폭 섹션으로 두고,
          그 사이에 무료배송/쿠폰 스트립 배너를 끼워 넣습니다 (mall 컨셉 목업과 동일한 순서) */}
      <HomePopularProducts />

      {/* 무료배송 / 첫가입 쿠폰 스트립 배너 — 신규 섹션. 문구는 예시이니 실제 이벤트로 교체해 주세요 */}
      <section className="home_promo_strip">
        <div className="home_promo_strip_inner">
          <div className="home_strip_card home_strip_card_shipping">
            <p className="home_strip_title">🚚 送料無料イベント</p>
            <p className="home_strip_desc">5,000円以上のご注文で送料無料</p>
          </div>

          <div className="home_strip_card home_strip_card_coupon">
            <p className="home_strip_title">🎟️ 初回限定クーポン</p>
            <p className="home_strip_desc">会員登録するだけで3,000円クーポン</p>
          </div>
        </div>
      </section>

      <HomeGroupBuyProducts />

      {/* service features — 잠정적으로 화면에서 제외. 코드는 필요 시 재사용할 수 있도록 남겨둡니다
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
      */}

      {/* why choose us — 잠정적으로 화면에서 제외. 코드는 필요 시 재사용할 수 있도록 남겨둡니다
      <HomeReasons />
      */}

      {/* home comparison + service stats — 세로로 두 섹션이 쌓이면 스크롤이 길어 보인다는
          피드백에 따라 한 섹션 안에서 2열로 나란히 배치합니다. 화면이 좁아지면 다시 위아래로 쌓입니다 */}
      <section className="home_compare_stats">
        <div className="home_inner">
          <div className="home_compare_stats_grid">
            <HomeComparison />
            <HomeStatistics />
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
