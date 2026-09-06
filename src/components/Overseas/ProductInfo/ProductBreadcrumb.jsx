import { Link } from 'react-router-dom';
import '../../../assets/styles/Overseas/ProductInfo/ProductBreadcrumb.css';

/**
 * 현재 위치 표시 (빵부스러기)
 *
 * @param {Array} items [{ label, to }] — to가 없으면 링크가 아닌 텍스트로 표시
 */
function ProductBreadcrumb({ items = [] }) {
  return (
    <nav className="pinfo-breadcrumb" aria-label="現在地">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="pinfo-breadcrumb-item">
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span className="current">{item.label}</span>
          )}

          {i < items.length - 1 && <span className="sep">/</span>}
        </span>
      ))}
    </nav>
  );
}

export default ProductBreadcrumb;
