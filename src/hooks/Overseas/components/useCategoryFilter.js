import { useRef, useState, useEffect } from 'react';

/**
 * 카테고리 가로 스크롤 로직
 *
 * 목록 ref, 좌우 끝 도달 여부, 스크롤 이동 함수를 돌려줍니다.
 * 화살표 버튼 비활성화 처리에 atStart / atEnd를 사용하세요.
 */
export function useCategoryFilter() {
  const listRef = useRef(null);
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: false });

  const updateScrollState = () => {
    const el = listRef.current;
    if (!el) return;
    setScrollState({
      atStart: el.scrollLeft <= 1,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  };

  useEffect(() => {
    updateScrollState();

    const el = listRef.current;
    el?.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    return () => {
      el?.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  /** dir: -1 = 왼쪽, 1 = 오른쪽. 보이는 폭만큼 이동 */
  const scroll = (dir) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  return {
    listRef,
    atStart: scrollState.atStart,
    atEnd: scrollState.atEnd,
    scroll,
  };
}

export default useCategoryFilter;
