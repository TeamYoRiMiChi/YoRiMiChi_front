import {
  faBasketball,
  faBorderAll,
  faCapsules,
  faCouch,
  faMugHot,
  faPumpSoap,
  faPuzzlePiece,
  faShirt,
  faTv,
  faUtensils,
  faBabyCarriage,
  faPaw,
  faBook,
  faGamepad,
  faBasketShopping,
  faKitMedical,
  faStar,
  faStopwatch,
  faCamera,
  faGift,
} from '@fortawesome/free-solid-svg-icons';

/**
 * 전체 보기 카테고리
 *
 * DB에 없는 화면 전용 항목입니다.
 * id가 빈 문자열이면 서버에 categoryId를 보내지 않아 전체 상품이 조회됩니다.
 */
export const ALL_CATEGORY = {
  id: '',
  name: 'すべて',
  icon: faBorderAll,
};

/**
 * 카테고리 아이콘
 *
 * 아이콘은 화면에만 필요한 정보라 DB에 저장하지 않습니다.
 *
 * id 대신 이름으로 짝짓습니다.
 * DB를 다시 넣으면 id가 바뀔 수 있지만 이름은 그대로이기 때문입니다.
 * 카테고리가 추가되면 여기에도 이름을 넣어주세요.
 */
export const CATEGORY_ICONS = {
  'ファッション': faShirt,
  '美容・コスメ': faPumpSoap,
  '健康食品': faCapsules,
  '家電・デジタル': faTv,
  '食品・飲料': faMugHot,
  '文具・おもちゃ': faPuzzlePiece,
  'ホーム・インテリア': faCouch,
  'スポーツ・アウトドア': faBasketball,
  'キッチン用品': faUtensils,
  'ベビー・キッズ': faBabyCarriage,
  'ペット用品': faPaw,
  '本・雑誌': faBook,
  'CD・DVD・ゲーム': faGamepad,
  '日用品・雑貨': faBasketShopping,
  '医薬品・衛生用品': faKitMedical,
  'アニメ・キャラクター': faStar,
  '腕時計・アクセサリー': faStopwatch,
  'カメラ・光学機器': faCamera,
  'お土産・ご当地': faGift,
};

/** 목록에 없는 카테고리가 오면 쓰는 기본 아이콘 */
export const DEFAULT_CATEGORY_ICON = faBorderAll;

/**
 * 카테고리 기본값
 *
 * 평소에는 서버에서 받아오고,
 * 통신이 실패했을 때만 이 목록을 대신 써서 화면이 비지 않게 합니다.
 * 전체 보기(ALL_CATEGORY)는 훅에서 맨 앞에 붙입니다.
 */
export const CATEGORIES = [
  { id: 2, name: 'ファッション', icon: faShirt },
  { id: 3, name: '美容・コスメ', icon: faPumpSoap },
  { id: 4, name: '健康食品', icon: faCapsules },
  { id: 5, name: '家電・デジタル', icon: faTv },
  { id: 6, name: '食品・飲料', icon: faMugHot },
  { id: 7, name: '文具・おもちゃ', icon: faPuzzlePiece },
  { id: 8, name: 'ホーム・インテリア', icon: faCouch },
  { id: 9, name: 'スポーツ・アウトドア', icon: faBasketball },
  { id: 10, name: 'キッチン用品', icon: faUtensils },
];

/* 정렬 탭 */
export const SORT_TABS = [
  { key: 'recommend', label: 'おすすめ' },
  { key: 'popular', label: '人気' },
  { key: 'newest', label: '新着' },
];

/* 페이지당 상품 수 */
export const PER_PAGE = 8;

/*
 * 상품 목록은 서버(DB)에서 받아옵니다.
 *   → GET /api/overseas/products
 */
