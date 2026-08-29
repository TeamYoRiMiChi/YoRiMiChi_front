import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketball,
  faBorderAll,
  faBoxOpen,
  faCapsules,
  faCar,
  faClock,
  faChevronLeft,
  faChevronRight,
  faCouch,
  faEllipsis,
  faHeart,
  faMugHot,
  faPercent,
  faPumpSoap,
  faPuzzlePiece,
  faShieldHalved,
  faShirt,
  faSuitcaseRolling,
  faTv,
  faTruckFast,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import overseasBanner from '../../assets/images/overseas_banner.png';
import '../../assets/styles/Overseas.css';

const categories = [
  { id: 1, name: 'すべて', icon: faBorderAll },
  { id: 2, name: 'ファッション', icon: faShirt },
  { id: 3, name: '美容・コスメ', icon: faPumpSoap },
  { id: 4, name: '健康食品', icon: faCapsules },
  { id: 5, name: '家電・デジタル', icon: faTv },
  { id: 6, name: '食品・飲料', icon: faMugHot },
  { id: 7, name: '文具・おもちゃ', icon: faPuzzlePiece },
  { id: 8, name: 'ホーム・インテリア', icon: faCouch },
  { id: 9, name: 'スポーツ・アウトドア', icon: faBasketball },
  { id: 10, name: '自動車・バイク', icon: faCar },
  { id: 11, name: 'その他', icon: faEllipsis },
];

const products = [
  {
    id: 1,
    brand: 'SK-II',
    name: 'フェイシャル トリートメント エッセンス 230ml',
    price: '¥12,650',
    originalPrice: '¥15,400',
    discount: '18%',
    placeholder: 'SK-II',
  },
  {
    id: 2,
    brand: 'Nintendo',
    name: 'Nintendo Switch（有機ELモデル）',
    price: '¥37,980',
    originalPrice: '¥42,978',
    discount: '12%',
    placeholder: 'Nintendo',
  },
  {
    id: 3,
    brand: 'YA-MAN',
    name: '美顔器 フォトプラス',
    price: '¥48,800',
    originalPrice: '¥60,500',
    discount: '19%',
    placeholder: 'YA-MAN',
  },
  {
    id: 4,
    brand: 'FANCL',
    name: 'えんきん 30日分',
    price: '¥1,280',
    originalPrice: '¥1,500',
    discount: '15%',
    placeholder: 'FANCL',
  },
  {
    id: 5,
    brand: 'SENKA',
    name: 'パーフェクトホイップ',
    price: '¥528',
    originalPrice: '¥660',
    discount: '20%',
    placeholder: 'SENKA',
  },
  {
    id: 6,
    brand: 'Calbee',
    name: 'じゃがりこ サラダ 57g',
    price: '¥110',
    originalPrice: '¥150',
    discount: '27%',
    placeholder: 'Calbee',
  },
];

function Overseas() {
  return (
    <div className="overseas-page">
      <section className="overseas-hero" aria-label="海外ショッピングのご案内">
        <img src={overseasBanner} alt="日本の商品をもっと手軽に、安心して購入できる海外ショッピング" />
        <div className="overseas-hero-content">
          <div className="overseas-hero-copy">
            <h1>
              일본의 인기 상품을
              <strong>빠르고 안전하게 직구하세요!</strong>
            </h1>
            <p>
              よりみち가 정품만을 선별하여
              <span>안전하고 빠르게 배송해드립니다.</span>
            </p>
          </div>

          <ul className="overseas-hero-features" aria-label="해외 직구 서비스 특징">
            <li><FontAwesomeIcon icon={faShieldHalved} /><span>100% 정품 보장</span></li>
            <li><FontAwesomeIcon icon={faSuitcaseRolling} /><span>일본 현지 구매</span></li>
            <li><FontAwesomeIcon icon={faWallet} /><span>안전한 결제</span></li>
            <li><FontAwesomeIcon icon={faTruckFast} /><span>빠른 배송</span></li>
            <li><FontAwesomeIcon icon={faClock} /><span>실시간 배송<br />조회</span></li>
          </ul>
        </div>
      </section>

      <section className="overseas-categories" aria-label="商品カテゴリー">
        <button className="carousel-arrow arrow-left" type="button" aria-label="前へ">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id} className="category-item">
              <button type="button" className="category-button">
                <FontAwesomeIcon icon={category.icon} className="category-icon" />
                <span>{category.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <button className="carousel-arrow arrow-right" type="button" aria-label="次へ">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </section>

      <section className="overseas-products">
        <div className="products-heading">
          <div className="products-title-group">
            <h2>日本の人気商品</h2>
            <div className="product-tabs" role="tablist" aria-label="商品一覧の並び替え">
              <button className="active" type="button" role="tab" aria-selected="true">
                おすすめ
              </button>
              <button type="button" role="tab" aria-selected="false">人気</button>
              <button type="button" role="tab" aria-selected="false">新着</button>
            </div>
          </div>
          <button className="more-button" type="button">もっと見る &gt;</button>
        </div>

        <div className="product-carousel">
          <button className="carousel-arrow arrow-left" type="button" aria-label="前の商品">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product-card">
                <button className="favorite-button" type="button" aria-label={`${product.name}をお気に入りに追加`}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>

                <div className="product-image-placeholder" aria-hidden="true">
                  <span>{product.placeholder}</span>
                </div>

                <p className="product-brand">{product.brand}</p>
                <h3>{product.name}</h3>

                <div className="product-price-row">
                  <strong>{product.price}</strong>
                  <del>{product.originalPrice}</del>
                  <span>{product.discount}</span>
                </div>
              </li>
            ))}
          </ul>

          <button className="carousel-arrow arrow-right" type="button" aria-label="次の商品">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      <section className="overseas-benefits" aria-label="ご利用特典">
        <article className="benefit-item">
          <div>
            <span>初めての方へ</span>
            <h2>ご利用ガイド</h2>
            <p>初めてでも簡単にご利用いただけます。</p>
          </div>
          <FontAwesomeIcon icon={faBoxOpen} />
        </article>

        <article className="benefit-item">
          <div>
            <span>新規会員特典</span>
            <h2>2,000ポイントプレゼント</h2>
            <p>会員登録で2,000ポイントを進呈します。</p>
          </div>
          <FontAwesomeIcon icon={faWallet} />
        </article>

        <article className="benefit-item">
          <div>
            <span>配送料クーポン</span>
            <h2>最大10％OFF</h2>
            <p>お得なクーポンをご利用ください。</p>
          </div>
          <FontAwesomeIcon icon={faPercent} />
        </article>
      </section>
    </div>
  );
}

export default Overseas;
