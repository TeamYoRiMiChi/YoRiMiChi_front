import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { getGroupBuyProducts } from '../../api/Group_purchase/groupBuyProductApi';
import { toProductView } from '../../api/productApi';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import ProductCard from '../Overseas/ProductCard';
import '../../assets/styles/Overseas/components/ProductGrid.css';
import '../../assets/styles/Home/HomePopularProducts.css';

/* 화면 전체 폭을 쓰는 단독 섹션이라 한 줄에 5개씩, 10개(2줄)까지 보여줍니다. 더 보고 싶으면 /groupbuy로 */
const DISPLAY_COUNT = 10;

/**
 * 홈 화면 — 共同購入 おすすめ商品(추천 상품) 미리보기
 *
 * 공동구매 목록의 recommend 정렬(getGroupBuyProducts 기본값)을 그대로 가져와
 * 10개만 보여줍니다. 카드는 공동구매 전용 Purchase_product_card 대신
 * 海外直購 칸과 같은 ProductCard를 재사용합니다 — toProductView가
 * saleType에 따라 isGroupBuyOnly를 채워주므로 상세 링크도 자동으로
 * /groupbuy/:id로 잡히고, 두 칸의 카드 모양이 통일됩니다.
 *
 * 통신 실패나 상품이 하나도 없으면 칸 자체를 숨깁니다.
 * 홈 화면에 에러 박스나 빈 상태 문구를 두고 싶지 않아서입니다.
 */
function HomeGroupBuyProducts() {
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
        const res = await getGroupBuyProducts({
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

  /* 찜 토글 — 비로그인이면 로그인 안내 (Overseas 칸과 동일한 규칙) */
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
    <section className="home_product_section home_product_section_groupbuy">
      <div className="home_inner">
        <div className="home_section_head">
          <div className="home_section_head_left">
            <span className="home_section_chip home_section_chip_groupbuy">
              <FontAwesomeIcon icon={faHandshake} />
            </span>
            <div>
              <h2 className="home_section_title_new">共同購入 おすすめ商品</h2>
              <p className="home_section_sub">参加者が集まるほどお得に</p>
            </div>
          </div>

          <Link to="/groupbuy" className="home_section_more">
            もっと見る ›
          </Link>
        </div>

        <ul className="home_product_grid">
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
      </div>
    </section>
  );
}

export default HomeGroupBuyProducts;
