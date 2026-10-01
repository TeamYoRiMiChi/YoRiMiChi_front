import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Group_purchase/RecommendedProducts.css';
import { getGroupBuyProducts } from '../../api/Group_purchase/groupBuyProductApi';
import { toProductView } from '../../api/productApi';

// 보여줄 추천 상품 개수 (한 줄 5칸)
const RECOMMENDED_COUNT = 5;

/**
 * 추천 상품 — 다른 공동구매 상품 5개
 *
 * 공동구매 상품 목록 API에서 가져오고, 지금 보고 있는 상품은 뺍니다.
 * 이미지는 서버가 내려주는 thumbnailUrl(PRODUCT_IMAGE 대표 이미지)을 씁니다.
 *
 * @param {number} currentProductId 지금 보고 있는 상품 id (추천에서 제외)
 */
const RecommendedProducts = ({ currentProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let ignore = false;

    getGroupBuyProducts({ size: RECOMMENDED_COUNT + 1 })
      .then((response) => {
        if (ignore) return;

        const list = (response.data.data.content ?? [])
          .map(toProductView)
          .filter((product) => product.id !== currentProductId)
          .slice(0, RECOMMENDED_COUNT);

        setProducts(list);
      })
      .catch(() => {
        // 추천 상품은 부가 영역이라, 실패하면 조용히 숨깁니다
        if (!ignore) setProducts([]);
      });

    return () => {
      ignore = true;
    };
  }, [currentProductId]);

  if (products.length === 0) return null;

  return (
    <section className="recommended_products">
      {/* 추천 상품 제목 */}
      <div className="recommended_products_heading">
        <h2>おすすめ商品</h2>
        <Link to="/groupbuy">もっと見る ›</Link>
      </div>

      {/* 추천 상품 카드 목록 */}
      <div className="recommended_product_list">
        {products.map((product) => (
          <article className="recommended_product_card" key={product.id}>
            {/* 추천 상품 이미지 */}
            <Link
              to={`/groupbuy/${product.id}`}
              className="recommended_product_image"
            >
              {product.thumbnailUrl ? (
                <img src={product.thumbnailUrl} alt={product.nameJp || product.name} />
              ) : (
                <span>{product.nameJp || product.name || '商品画像'}</span>
              )}
            </Link>

            {/* 추천 상품 이름과 가격 */}
            <div className="recommended_product_info">
              <Link to={`/groupbuy/${product.id}`}>
                <p>{product.nameJp || product.name}</p>
              </Link>
              <strong>{product.price}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
