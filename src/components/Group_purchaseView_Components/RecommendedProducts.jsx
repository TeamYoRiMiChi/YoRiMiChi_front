import '../../assets/styles/Group_purchase/RecommendedProducts.css';
import recommendedProductsData from '../../data/Group_purchase/recommendedProductsData';

function RecommendedProducts() {
  return (
    <section className="recommended_products">
      {/* 추천 상품 제목 */}
      <div className="recommended_products_heading">
        <h2>おすすめ商品</h2>
        <button type="button">もっと見る ›</button>
      </div>

      {/* 추천 상품 카드 목록 */}
      <div className="recommended_product_list">
        {recommendedProductsData.map((product) => (
          <article className="recommended_product_card" key={product.id}>
            {/* 추천 상품 이미지 자리 */}
            <div className="recommended_product_image">商品画像</div>

            {/* 추천 상품 이름과 가격 */}
            <div className="recommended_product_info">
              <p>{product.name}</p>
              <strong>{product.price}</strong>
              <small>（税込）</small>
              <button type="button" aria-label={`${product.name}をカートに追加`}>
                🛒
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecommendedProducts;
