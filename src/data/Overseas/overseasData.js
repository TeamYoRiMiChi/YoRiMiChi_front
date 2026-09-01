import {
  faBasketball,
  faBorderAll,
  faCapsules,
  faCar,
  faCouch,
  faMugHot,
  faPumpSoap,
  faPuzzlePiece,
  faShirt,
  faTv,
} from '@fortawesome/free-solid-svg-icons';

/* 카테고리 (id 1 = 전체) */
export const CATEGORIES = [
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
];

/* 정렬 탭 */
export const SORT_TABS = [
  { key: 'recommend', label: 'おすすめ' },
  { key: 'popular', label: '人気' },
  { key: 'newest', label: '新着' },
];

/* 페이지당 상품 수 */
export const PER_PAGE = 8;

/* 임시 상품 데이터 (추후 API로 대체) */
export const PRODUCTS = [
  { id: 1, categoryId: 3, brand: 'SK-II', name: 'フェイシャル トリートメント エッセンス 230ml', price: '¥12,650', originalPrice: '¥15,400', discount: '18%', placeholder: 'SK-II', priceNum: 12650, sales: 320, createdAt: '2026-08-10' },
  { id: 2, categoryId: 5, brand: 'Nintendo', name: 'Nintendo Switch（有機ELモデル）', price: '¥37,980', originalPrice: '¥42,978', discount: '12%', placeholder: 'Nintendo', priceNum: 37980, sales: 890, createdAt: '2026-07-22' },
  { id: 3, categoryId: 5, brand: 'YA-MAN', name: '美顔器 フォトプラス', price: '¥48,800', originalPrice: '¥60,500', discount: '19%', placeholder: 'YA-MAN', priceNum: 48800, sales: 145, createdAt: '2026-08-25' },
  { id: 4, categoryId: 4, brand: 'FANCL', name: 'えんきん 30日分', price: '¥1,280', originalPrice: '¥1,500', discount: '15%', placeholder: 'FANCL', priceNum: 1280, sales: 1240, createdAt: '2026-06-15' },
  { id: 5, categoryId: 3, brand: 'SENKA', name: 'パーフェクトホイップ', price: '¥528', originalPrice: '¥660', discount: '20%', placeholder: 'SENKA', priceNum: 528, sales: 2100, createdAt: '2026-05-30' },
  { id: 6, categoryId: 6, brand: 'Calbee', name: 'じゃがりこ サラダ 57g', price: '¥110', originalPrice: '¥150', discount: '27%', placeholder: 'Calbee', priceNum: 110, sales: 3050, createdAt: '2026-08-28' },
  { id: 7, categoryId: 8, brand: 'MUJI', name: 'ポリプロピレン収納ケース 引出式・大', price: '¥1,490', originalPrice: '¥1,790', discount: '17%', placeholder: 'MUJI', priceNum: 1490, sales: 670, createdAt: '2026-07-08' },
  { id: 8, categoryId: 3, brand: 'Shiseido', name: 'アネッサ パーフェクトUV スキンケアミルク', price: '¥2,530', originalPrice: '¥3,300', discount: '23%', placeholder: 'Shiseido', priceNum: 2530, sales: 1580, createdAt: '2026-08-18' },
  { id: 9, categoryId: 2, brand: 'Uniqlo', name: 'ウルトラライトダウン ジャケット', price: '¥5,990', originalPrice: '¥7,990', discount: '25%', placeholder: 'Uniqlo', priceNum: 5990, sales: 940, createdAt: '2026-08-01' },
  { id: 10, categoryId: 5, brand: 'Sony', name: 'ワイヤレスノイズキャンセリング WH-1000XM5', price: '¥41,800', originalPrice: '¥49,500', discount: '15%', placeholder: 'Sony', priceNum: 41800, sales: 510, createdAt: '2026-08-26' },
  { id: 11, categoryId: 8, brand: 'Zojirushi', name: '電気ケトル 1.0L', price: '¥6,480', originalPrice: '¥8,100', discount: '20%', placeholder: 'Zojirushi', priceNum: 6480, sales: 380, createdAt: '2026-06-02' },
  { id: 12, categoryId: 7, brand: 'Pilot', name: 'フリクションボール 3色セット', price: '¥660', originalPrice: '¥880', discount: '25%', placeholder: 'Pilot', priceNum: 660, sales: 1820, createdAt: '2026-07-19' },
  { id: 13, categoryId: 6, brand: 'Meiji', name: 'ザ・チョコレート 詰め合わせ', price: '¥1,180', originalPrice: '¥1,480', discount: '20%', placeholder: 'Meiji', priceNum: 1180, sales: 2240, createdAt: '2026-08-22' },
  { id: 14, categoryId: 9, brand: 'Asics', name: 'ゲルカヤノ 31 ランニングシューズ', price: '¥16,500', originalPrice: '¥19,800', discount: '17%', placeholder: 'Asics', priceNum: 16500, sales: 720, createdAt: '2026-08-05' },
];
