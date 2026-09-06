import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PRODUCT_BENEFITS } from '../../../data/Overseas/productInfoData';
import '../../../assets/styles/Overseas/ProductInfo/ProductBenefits.css';

/**
 * 상품 상세 하단의 서비스 특징 배너
 *
 * 상품과 무관한 고정 안내라 props를 받지 않습니다.
 */
function ProductBenefits() {
  return (
    <section className="pinfo-benefits" aria-label="サービスの特徴">
      {PRODUCT_BENEFITS.map((b) => (
        <article className="pinfo-benefit" key={b.title}>
          <FontAwesomeIcon icon={b.icon} />
          <div>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default ProductBenefits;
