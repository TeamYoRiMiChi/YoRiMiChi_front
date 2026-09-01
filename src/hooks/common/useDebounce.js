import { useState, useEffect } from 'react';

/**
 * 값이 잠잠해질 때까지 기다렸다가 돌려주는 훅
 *
 * 검색어를 한 글자 칠 때마다 서버에 요청하면 낭비이므로,
 * 입력이 멈춘 뒤 delay 밀리초가 지나야 값이 반영됩니다.
 *
 * @param {*}      value 감시할 값
 * @param {number} delay 지연 시간 (기본 300ms)
 *
 * @example
 * const debouncedKeyword = useDebounce(keyword, 300);
 * useEffect(() => { fetch(debouncedKeyword); }, [debouncedKeyword]);
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default useDebounce;
