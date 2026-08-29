// ============================================
// 카테고리별 테마 설정
//
// 색상이나 로고를 바꾸고 싶으면 이 파일만 수정하면 됩니다.
// 새 카테고리를 추가할 때도 THEMES에 항목만 추가하세요.
// ============================================

import logoDefault from '../assets/images/yomi_logo_jp.png';
import logoGreen from '../assets/images/yomi_logo_green_deep.png';

/* 기본 테마 (보라) — 해외직구 / 이용안내 / 고객센터 / FAQ / 홈 */
export const DEFAULT_THEME = {
  key: 'default',
  logo: logoDefault,
  colors: {
    brand: 'rgb(117, 84, 239)',      // 메인 색상
    brandDark: 'rgb(90, 63, 200)',   // hover, 진한 텍스트
    brandLight: '#f5f2ff',           // 아주 연한 배경 (hover 배경)
    brandSoft: '#efebff',            // 연한 배경 (뱃지, 아이콘 배경)
  },
};

/* 경로별 테마 — key가 경로 prefix */
export const THEMES = {
  '/groupbuy': {
    key: 'groupbuy',
    logo: logoGreen,
    colors: {
      brand: '#0c5c27',
      brandDark: '#083f1a',
      brandLight: '#f971f4',
      brandSoft: '#e0efe5',
    },
  },

  // 나중에 색상 바꿀 카테고리는 아래 형식으로 추가하면 됩니다.
  //
  // '/overseas': {
  //   key: 'overseas',
  //   logo: logoBlue,
  //   colors: {
  //     brand: '#1565c0',
  //     brandDark: '#0d47a1',
  //     brandLight: '#f0f6fd',
  //     brandSoft: '#dfeafa',
  //   },
  // },
};

/* 현재 경로에 맞는 테마 반환 */
export function getTheme(pathname) {
  const matched = Object.keys(THEMES).find(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  return matched ? THEMES[matched] : DEFAULT_THEME;
}