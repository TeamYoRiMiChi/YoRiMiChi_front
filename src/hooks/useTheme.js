import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getTheme } from '../config/theme';

/**
 * 현재 경로에 맞는 테마를 가져오고,
 * CSS 변수(--brand 등)를 문서 전체에 적용합니다.
 *
 * 사용법: const theme = useTheme();  →  theme.logo 로 로고 접근
 */
export function useTheme() {
  const { pathname } = useLocation();
  const theme = useMemo(() => getTheme(pathname), [pathname]);

  useEffect(() => {
    const root = document.documentElement;

    // camelCase → kebab-case (brandDark → --brand-dark)
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;
      root.style.setProperty(cssVar, value);
    });

    // 필요하면 CSS에서 [data-theme="groupbuy"] 선택자로 추가 스타일 가능
    root.dataset.theme = theme.key;
  }, [theme]);

  return theme;
}

export default useTheme;