import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getOverseasProducts } from '../../api/Overseas/overseasProductApi';
import { toProductView } from '../../api/productApi';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import ProductCard from '../Overseas/ProductCard';
import '../../assets/styles/Overseas/components/ProductGrid.css';
import '../../assets/styles/Home/HomePopularProducts.css';

/* 홈에서는 한 줄만 깔끔하게 보여줍니다. 더 보고 싶으면 /overseas로 */
const DISPLAY_COUNT = 4;

/**
 * 홈 화면 — おすすめ商品(추천 상품) 미리보기
 *
 * 해외직구 목록의 recommend 정렬(ProductMapper.xml findAll)을 그대로 가져와
 * 4개만 보여줍니다. 정렬 탭·페이지네이션 없이 딱 한 줄만 둬서
 * 다른 홈 섹션들처럼 담백하게 유지합니다.
 *
 * 통신 실패나 상품이 하나도 없으면 섹션 자체를 숨깁니다.
 * 홈 화면에 에러 박스나 빈 상태 문구를 두고 싶지 않아서입니다.
 */
function HomePopularProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const wishlistIds = useSelector((s) => s.wishlist.ids);
  const accessToken = useSelector((s) => s.auth.accessToken);

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | succeeded | failed

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await getOverseasProducts({
          sort: 'recommend',
          page: 1,
          size: DISPLAY_COUNT,
        });
        const page = res.data.data; // ApiResponse의 data = PageResponse

        if (!ignore) {
          setProducts((page.content ?? []).map(toProductView));
          setStatus('succeeded');
        }
      } catch {
        if (!ignore) setStatus('failed');
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  /* 찜 토글 — 비로그인이면 로그인 안내 (Overseas 페이지와 동일한 규칙) */
  const handleToggleWish = (productId) => {
    if (!accessToken) {
      alert('ログインが必要です。ログインページへ移動します。');
      navigate('/login', {
        state: { from: location.pathname },
      });
      return;
    }
    dispatch(toggleWishlist(productId));
  };

  if (status === 'failed' || (status === 'succeeded' && products.length === 0)) {
    return null;
  }

  return (
    <section className="home_popular">
      <div className="home_inner">
        <h2 className="home_section_title">おすすめ商品</h2>

        <ul className="home_popular_list">
          {status === 'loading'
            ? Array.from({ length: DISPLAY_COUNT }, (_, i) => (
                <li key={i} className="product-skeleton" aria-hidden="true">
                  <div className="skeleton-thumb" />
                  <div className="skeleton-line short" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line price" />
                </li>
              ))
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWished={wishlistIds.includes(product.id)}
                  onToggleWish={handleToggleWish}
                />
              ))}
        </ul>

        <div className="home_popular_more_wrap">
          <Link to="/overseas" className="home_popular_more">
            商品をもっと見る
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePopularProducts;
