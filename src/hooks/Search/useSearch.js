import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../api/Search/searchApi';
import { toProductView } from '../../api/productApi';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import { usePagination } from '../common/usePagination';
import { useDebounce } from '../common/useDebounce';
import { PER_PAGE } from '../../data/Search/searchData';

/**
 * 검색 결과 페이지 로직
 *
 * 헤더 검색창에서 /search?q=키워드 로 들어옵니다.
 * URL의 q가 바뀌면(헤더에서 다시 검색) 검색어를 그 값으로 맞추고,
 * 이후 이 페이지 안의 검색창에 직접 입력하는 건 Overseas 페이지처럼
 * 디바운스를 걸어서 다시 요청합니다.
 *
 * redux의 product 슬라이스는 해외직구 전용(getOverseasProducts)이라
 * 여기서는 쓰지 않고, 이 훅 안에서 직접 API를 불러 로컬 상태로 관리합니다.
 * (그래야 검색 기능을 고칠 때 해외직구 쪽 코드를 안 건드립니다.)
 */
export function useSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const wishlistIds = useSelector((s) => s.wishlist.ids);
  const accessToken = useSelector((s) => s.auth.accessToken);

  const [keyword, setKeyword] = useState(initialQuery);
  const [sort, setSort] = useState('recommend');

  const [items, setItems] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | loading | succeeded | failed
  const [error, setError] = useState(null);

  const debouncedKeyword = useDebounce(keyword, 300);

  /* 페이징 — 서버가 잘라서 주므로 서버 모드 */
  const pagination = usePagination(items, PER_PAGE, {
    scrollTo: '.search-products',
    serverTotal: totalElements,
  });

  const { currentPage, reset: resetPage } = pagination;

  /* 헤더에서 새로 검색하면(q가 바뀌면) 검색어를 맞추고 1페이지로 */
  useEffect(() => {
    setKeyword(initialQuery);
    resetPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  /* 조건이 바뀌면 서버에 다시 요청 */
  useEffect(() => {
    let ignore = false;

    async function load() {
      setStatus('loading');
      setError(null);

      try {
        const res = await searchProducts({
          keyword: debouncedKeyword,
          sort,
          page: currentPage,
          size: PER_PAGE,
        });

        const page = res.data.data; // ApiResponse의 data = PageResponse

        if (!ignore) {
          setItems((page.content ?? []).map(toProductView));
          setTotalElements(page.totalElements ?? 0);
          setStatus('succeeded');
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message ?? '商品の取得に失敗しました。');
          setItems([]);
          setStatus('failed');
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [debouncedKeyword, sort, currentPage]);

  /* ===== 핸들러 =====
     조건이 바뀌면 1페이지로 돌아가야 하므로 resetPage를 함께 호출합니다. */
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
    setSort('recommend');
    resetPage();
  };

  /* 찜 토글 — 비로그인이면 로그인 안내 */
  const handleToggleWish = (productId) => {
    if (!accessToken) {
      alert('ログインが必要です。ログインページへ移動します。');
      navigate('/login', {
        state: { from: location.pathname + location.search },
      });
      return;
    }
    dispatch(toggleWishlist(productId));
  };

  return {
    // 상태
    keyword,
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
    handleSort,
    handleKeyword,
    handleReset,
  };
}

export default useSearch;
