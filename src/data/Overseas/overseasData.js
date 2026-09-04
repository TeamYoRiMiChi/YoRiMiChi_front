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
} from '@fortawesome/free-solid-svg-icons';

/**
 * 카테고리 아이콘
 *
 * 아이콘은 화면에만 필요한 정보라 DB에 저장하지 않고
 * category_id 기준으로 여기서 짝짓습니다.
 * 카테고리가 추가되면 이 목록에도 넣어주세요.
 */
export const CATEGORY_ICONS = {
  1: faBorderAll,      // すべて
  2: faShirt,          // ファッション
  3: faPumpSoap,       // 美容・コスメ
  4: faCapsules,       // 健康食品
  5: faTv,             // 家電・デジタル
  6: faMugHot,         // 食品・飲料
  7: faPuzzlePiece,    // 文具・おもちゃ
  8: faCouch,          // ホーム・インテリア
  9: faBasketball,     // スポーツ・アウトドア
  10: faUtensils,      // キッチン用品
};

/** 목록에 없는 카테고리가 오면 쓰는 기본 아이콘 */
export const DEFAULT_CATEGORY_ICON = faBorderAll;

/**
 * 카테고리 기본값 (id 1 = 전체)
 *
 * 평소에는 서버에서 받아오고,
 * 통신이 실패했을 때만 이 목록을 대신 써서 화면이 비지 않게 합니다.
 */
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
 * 상품 목록은 이제 서버(DB)에서 받아옵니다.
 * 기존의 임시 PRODUCTS 배열은 제거했습니다.
 *   → GET /api/products
 */
