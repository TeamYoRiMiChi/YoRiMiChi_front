/*
 * 검색 결과 페이지 정렬 탭
 *
 * Overseas 페이지와 같은 4개 탭을 씁니다. 백엔드가
 * ProductMapper.xml의 findAll(saleType=null) 하나로 해외직구·공동구매를
 * 함께 처리하기 때문에 recommend/popular/newest/all 공식이 그대로 적용됩니다.
 */
export const SORT_TABS = [
  { key: 'recommend', label: 'おすすめ' },
  { key: 'popular', label: '人気' },
  { key: 'newest', label: '新着' },
  { key: 'all', label: 'すべて' },
];

/* 페이지당 상품 수 */
export const PER_PAGE = 8;
