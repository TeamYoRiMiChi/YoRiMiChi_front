import { useState, useEffect } from 'react';
import { getCategories } from '../../../api/Overseas/categoryApi';
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from '../../../data/Overseas/overseasData';

/**
 * 카테고리를 서버에서 불러옵니다.
 *
 * ── 전체 흐름 ──
 * 이 훅  →  categoryApi  →  (HTTP)  →  CategoryController
 *        →  CategoryService  →  CategoryMapper  →  CategoryMapper.xml  →  MySQL
 *
 * 아이콘은 DB에 없는 화면 전용 정보라 프론트에서 id로 매칭합니다.
 *
 * 서버가 꺼져 있거나 통신에 실패하면 화면이 비어버리지 않도록
 * 기존 하드코딩 목록으로 대체합니다.
 */
export function useCategories(fallback = []) {
  const [categories, setCategories] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // 컴포넌트가 사라진 뒤 setState 하는 걸 막습니다

    async function load() {
      try {
        const res = await getCategories();

        // 서버 응답: { success, data: [...], message }
        const list = res.data.data ?? [];

        // DB 값 + 화면용 아이콘을 합칩니다
        const withIcons = list.map((c) => ({
          id: c.id,
          name: c.name,
          icon: CATEGORY_ICONS[c.id] ?? DEFAULT_CATEGORY_ICON,
        }));
        
        if (!ignore) {
          setCategories(withIcons);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message ?? 'カテゴリの取得に失敗しました。');
          setCategories(fallback); // 실패해도 화면은 보이도록
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { categories, isLoading, error };
}

export default useCategories;
