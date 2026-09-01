import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/product/productSlice';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import { usePagination } from '../common/usePagination';
import { useDebounce } from '../common/useDebounce';
import { CATEGORIES, PER_PAGE } from '../../data/Overseas/overseasData';

/**
 * 해외직구 페이지 로직
 *
 * 필터·정렬·페이지 조건이 바뀌면 서버에 상품을 다시 요청합니다.
 * 검색어는 입력이 멈춘 뒤에만 요청하도록 디바운스를 겁니다.
 */
export function useOverseas() {
  const dispatch = useDispatch();

  const { items, totalElements, status, error } = useSelector((s) => s.product);
  const wishlistIds = useSelector((s) => s.wishlist.ids);
  const accessToken = useSelector((s) => s.auth.accessToken);

  const [keyword, setKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState(1);
  const [sort, setSort] = useState('recommend');

  const debouncedKeyword = useDebounce(keyword, 300);

  /* 페이징 — 서버가 잘라서 주므로 서버 모드 */
  const pagination = usePagination(items, PER_PAGE, {
    scrollTo: '.overseas-products',
    serverTotal: totalElements,
  });

  const { currentPage, reset: resetPage } = pagination;

  /* 조건이 바뀌면 서버에 다시 요청 */
  useEffect(() => {
    dispatch(
      fetchProducts({
        categoryId: activeCategory,
        keyword: debouncedKeyword,
        sort,
        page: currentPage,
        size: PER_PAGE,
      })
    );
  }, [dispatch, activeCategory, debouncedKeyword, sort, currentPage]);

  const activeCategoryName = CATEGORIES.find((c) => c.id === activeCategory)?.name;

  /* ===== 핸들러 =====
     필터가 바뀌면 1페이지로 돌아가야 하므로 resetPage를 함께 호출합니다. */
  const handleCategory = (id) => {
    setActiveCategory(id);
    resetPage();
  };

  const handleSort = (key) => {
    setSort(key);
    resetPage();
  };

  const handleKeyword = (value) => {
    setKeyword(value);
    resetPage();
  };

  const handleReset = () => {
    setKeyword('');
    setActiveCategory(1);
    resetPage();
  };

  /* 찜 토글 — 비로그인이면 로그인 안내 */
  const handleToggleWish = (productId) => {
    if (!accessToken) {
      alert('ログインが必要です。');
      return;
    }
    dispatch(toggleWishlist(productId));
  };

  return {
    // 상태
    keyword,
    activeCategory,
    activeCategoryName,
    sort,

    // 서버 응답
    totalElements,
    isLoading: status === 'loading',
    isError: status === 'failed',
    error,

    // 찜
    wishlistIds,
    handleToggleWish,

    // 페이징
    pagination,

    // 핸들러
    handleCategory,
    handleSort,
    handleKeyword,
    handleReset,
  };
}

export default useOverseas;
