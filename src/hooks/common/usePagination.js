import { useState, useMemo, useEffect, useCallback } from 'react';

/**
 * 공통 페이지네이션 훅
 *
 * 두 가지 모드를 지원합니다.
 *
 * 1) 클라이언트 모드 — 전체 목록을 넘기면 알아서 잘라줍니다.
 *    const p = usePagination(filtered, 8, { scrollTo: '.list' });
 *    → p.visible 이 현재 페이지 항목
 *
 * 2) 서버 모드 — 서버가 이미 잘라서 준 경우.
 *    serverTotal(전체 개수)만 넘기면 페이지 계산만 해줍니다.
 *    const p = usePagination(items, 8, { serverTotal: totalElements });
 *    → p.visible 은 넘긴 items 그대로
 *
 * @param {Array}  items   목록 (클라이언트 모드=전체 / 서버 모드=현재 페이지분)
 * @param {number} perPage 페이지당 개수 (기본 10)
 * @param {Object} options
 * @param {string} options.scrollTo      페이지 이동 시 스크롤할 요소 선택자
 * @param {number} options.scrollOffset  스크롤 위쪽 여백 (기본 80)
 * @param {number} options.serverTotal   서버가 알려준 전체 개수 (있으면 서버 모드)
 * @param {boolean} options.resetOnChange 목록이 바뀌면 1페이지로 (클라이언트 모드 기본 true)
 */
export function usePagination(items = [], perPage = 10, options = {}) {
  const {
    scrollTo = null,
    scrollOffset = 80,
    serverTotal = null,
    resetOnChange,
  } = options;

  const isServerMode = typeof serverTotal === 'number';

  /* 서버 모드에서는 items가 매 요청마다 바뀌므로 자동 리셋을 끕니다.
     (켜두면 요청 → items 변경 → 페이지 리셋 → 재요청 무한 반복) */
  const shouldResetOnChange = resetOnChange ?? !isServerMode;

  const [page, setPage] = useState(1);

  const totalItems = isServerMode ? serverTotal : items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  /* page가 범위를 벗어나도 안전하게 보정 */
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  useEffect(() => {
    if (shouldResetOnChange) setPage(1);
  }, [items, shouldResetOnChange]);

  /* 현재 페이지에 보여줄 항목 */
  const visible = useMemo(() => {
    if (isServerMode) return items;
    return items.slice((currentPage - 1) * perPage, currentPage * perPage);
  }, [items, currentPage, perPage, isServerMode]);

  const goPage = useCallback(
    (n) => {
      if (n < 1 || n > totalPages) return;
      setPage(n);

      if (scrollTo) {
        const target = document.querySelector(scrollTo);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - scrollOffset,
            behavior: 'smooth',
          });
        }
      }
    },
    [totalPages, scrollTo, scrollOffset]
  );

  const next = useCallback(() => goPage(currentPage + 1), [goPage, currentPage]);
  const prev = useCallback(() => goPage(currentPage - 1), [goPage, currentPage]);
  const reset = useCallback(() => setPage(1), []);

  /* 현재 페이지가 보여주는 범위 (예: "9-16 / 145件") */
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, totalItems);

  return {
    // 화면에 그릴 데이터
    visible,

    // 페이지 정보
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,

    // 상태 판단
    isFirst: currentPage <= 1,
    isLast: currentPage >= totalPages,
    shouldRender: totalPages > 1,

    // 이동
    goPage,
    next,
    prev,
    reset,
  };
}

export default usePagination;
