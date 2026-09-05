import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProducts, toProductView } from '../../api/productApi';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';

/**
 * 상품 상세 페이지 로직
 *
 * URL의 productId로 상품을 불러오고,
 * 갤러리·수량·탭 상태를 함께 관리합니다.
 */
export function useProductInfo() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((s) => s.auth.accessToken);
  const wishlistIds = useSelector((s) => s.wishlist.ids);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('detail');

  const isWished = product ? wishlistIds.includes(product.id) : false;

  /* 상품 불러오기 */
  useEffect(() => {
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getProduct(productId);
        const view = toProductView(res.data.data);

        if (ignore) return;

        setProduct(view);
        setImageIndex(0);
        setQuantity(1);
        setActiveTab('detail');

        // 같은 카테고리 상품을 추천으로 함께 불러옵니다
        const rel = await getProducts({ categoryId: view.categoryId, size: 6 });
        if (ignore) return;

        setRelated(
          (rel.data.data.content ?? [])
            .map(toProductView)
            .filter((p) => p.id !== view.id)
            .slice(0, 5)
        );
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message ?? '商品の取得に失敗しました。');
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    window.scrollTo({ top: 0 });

    return () => {
      ignore = true;
    };
  }, [productId]);

  /* 이미지가 여러 장일 때를 대비한 목록.
     지금은 썸네일 하나뿐이라 자리만 잡아둡니다. */
  const images = product?.thumbnailUrl ? [product.thumbnailUrl] : [null, null, null, null];

  const moveImage = (dir) => {
    setImageIndex((cur) => (cur + dir + images.length) % images.length);
  };

  const changeQuantity = (delta) => {
    setQuantity((cur) => {
      const next = cur + delta;
      if (next < 1) return 1;
      if (product?.stock && next > product.stock) return product.stock;
      return next;
    });
  };

  const handleToggleWish = () => {
    if (!accessToken) {
      alert('ログインが必要です。');
      navigate('/login');
      return;
    }
    dispatch(toggleWishlist(product.id));
  };

  const handleAddToCart = () => {
    if (!accessToken) {
      alert('ログインが必要です。');
      navigate('/login');
      return;
    }
    // TODO: 장바구니 API 연동
    alert(`${quantity}点をカートに追加しました。`);
  };

  return {
    product,
    related,
    isLoading,
    error,

    images,
    imageIndex,
    setImageIndex,
    moveImage,

    quantity,
    changeQuantity,

    activeTab,
    setActiveTab,

    isWished,
    handleToggleWish,
    handleAddToCart,
  };
}

export default useProductInfo;