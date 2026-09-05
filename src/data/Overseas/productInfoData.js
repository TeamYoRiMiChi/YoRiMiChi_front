import {
  faSeedling,
  faShieldHalved,
  faTruckFast,
  faHeadset,
} from '@fortawesome/free-solid-svg-icons';

/**
 * 상품 상세 페이지에서 쓰는 고정 데이터
 *
 * 상품마다 달라지지 않는 안내 문구들이라 여기 모아둡니다.
 * 문구를 고칠 때 컴포넌트를 열지 않아도 됩니다.
 */

/* 하단 특징 배너 */
export const PRODUCT_BENEFITS = [
  {
    icon: faSeedling,
    title: '日本現地で購入',
    desc: '現地スタッフが直接購入し\n検品してお届けします。',
  },
  {
    icon: faShieldHalved,
    title: '安心・安全の取引',
    desc: '安全な決済システムで\n安心してご利用いただけます。',
  },
  {
    icon: faTruckFast,
    title: 'スピード配送',
    desc: '通関手続きまで代行し\n早く確実にお届けします。',
  },
  {
    icon: faHeadset,
    title: 'サポート体制',
    desc: 'ご不明な点はサポートが\n丁寧に対応します。',
  },
];

/* 상세 탭 */
export const PRODUCT_TABS = [
  { key: 'detail', label: '商品詳細' },
  { key: 'info', label: '商品情報' },
  { key: 'shipping', label: '配送・送料' },
  { key: 'review', label: 'レビュー' },
  { key: 'faq', label: 'よくある質問' },
];

/* 배송 단계 */
export const SHIPPING_STEPS = [
  { no: '01', title: 'ご注文・お支払い', desc: 'ご注文後、現地スタッフが商品を購入します。' },
  { no: '02', title: '現地倉庫へ入荷', desc: '日本の倉庫で検品・梱包を行います。（2〜3日）' },
  { no: '03', title: '国際配送', desc: '韓国へ向けて発送します。（2〜4日）' },
  { no: '04', title: '通関手続き', desc: '個人通関固有符号で通関を行います。（1〜2日）' },
  { no: '05', title: '国内配送', desc: 'ご指定の住所へお届けします。（1〜2日）' },
];

/* 상품 특징 */
export const PRODUCT_FEATURES = [
  '日本現地で購入した正規品です',
  '検品後、丁寧に梱包して発送します',
  '通関手続きまで代行いたします',
  '配送状況をリアルタイムで確認できます',
];

/* 주의사항 */
export const PRODUCT_CAUTIONS = [
  '商品パッケージは予告なく変更される場合があります。',
  '写真はイメージです。',
  '個人通関固有符号の登録が必要です。',
  '150ドルを超える場合、関税が発生します。',
];

/* 자주 묻는 질문 */
export const PRODUCT_FAQ = [
  {
    q: '個人通関固有符号は必ず必要ですか？',
    a: 'はい。海外直購商品の通関には必ず必要です。関税庁のサイトで無料で発行できます。',
  },
  {
    q: '関税はいつ発生しますか？',
    a: '物品価額が150ドルを超える場合に発生します。ご注文画面で概算をご確認いただけます。',
  },
  {
    q: '返品・交換はできますか？',
    a: '商品到着後7日以内であれば可能です。ただし、開封済みの食品・化粧品は対象外です。',
  },
  {
    q: '配送状況はどこで確認できますか？',
    a: 'マイページの「配送照会」から確認できます。',
  },
];

/**
 * 리뷰 임시 데이터
 * REVIEW 테이블 API가 준비되면 제거하고 서버 값을 씁니다.
 */
export const MOCK_REVIEW_SUMMARY = {
  average: 4.8,
  total: 128,
  bars: [
    { star: 5, percent: 92 },
    { star: 4, percent: 6 },
    { star: 3, percent: 2 },
    { star: 2, percent: 0 },
    { star: 1, percent: 0 },
  ],
};

export const MOCK_REVIEWS = [
  { id: 1, name: 'はるか', rating: 5, content: '思っていたより早く届きました。梱包も丁寧で満足です。', date: '2026.08.15' },
  { id: 2, name: 'ゆうた', rating: 5, content: '日本で買うのと同じ価格で助かります。また利用します。', date: '2026.08.14' },
  { id: 3, name: 'ミナ', rating: 4, content: '商品は良かったです。通関に少し時間がかかりました。', date: '2026.08.13' },
];
