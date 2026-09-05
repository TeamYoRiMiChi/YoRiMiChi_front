import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import '../../../assets/styles/Overseas/ProductInfo/RelatedProducts.css';

/**
 * 추천 상품 (같은 카테고리)
 *
 * @param {Array} products 추천 상품 목록
 */
function RelatedProducts({ products = [] }) {
  if (products.length === 0) return null;

  return (
    <section className="pinfo-related" aria-label="おすすめ商品">
      <div className="pinfo-related-head">
        <h2>おすすめ商品</h2>
        <Link to="/overseas">
          もっと見る <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>

      <ul className="pinfo-related-list">
        {products.map((item) => (
          <li key={item.id}>
            <Link to={`/overseas/${item.id}`} className="pinfo-related-card">
              <div className="pinfo-related-thumb">
                {item.thumbnailUrl ? (
                  <img src={item.thumbnailUrl} alt="" />
                ) : (
                  <span>{item.brand || item.name}</span>
                )}
              </div>

              <p className="name">{item.name}</p>

              <div className="price-row">
                <strong>{item.price}</strong>
                <span className="cart-icon">
                  <FontAwesomeIcon icon={faCartShopping} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RelatedProducts;
