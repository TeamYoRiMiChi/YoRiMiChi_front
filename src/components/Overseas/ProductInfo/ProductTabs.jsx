import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import ProductReviews from './ProductReviews';
import {
  PRODUCT_TABS,
  PRODUCT_FEATURES,
  PRODUCT_CAUTIONS,
  PRODUCT_FAQ,
  SHIPPING_STEPS,
  MOCK_REVIEW_SUMMARY,
} from '../../../data/Overseas/productInfoData';
import '../../../assets/styles/Overseas/ProductInfo/ProductTabs.css';

/**
 * 상품 상세 탭
 *
 * 탭 버튼과 내용을 함께 담당합니다.
 * 리뷰 탭만 별도 컴포넌트로 분리했습니다.
 *
 * @param {Object}   product     상품 데이터
 * @param {string}   productCode 표시용 상품 코드
 * @param {string}   activeTab   현재 탭 key
 * @param {Function} onTabChange 탭 변경 콜백
 */
function ProductTabs({ product, productCode, activeTab, onTabChange }) {
  return (
    <section className="pinfo-tabs-section">

      <div className="pinfo-tabs" role="tablist" aria-label="商品情報">
        {PRODUCT_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            className={activeTab === tab.key ? 'active' : ''}
            aria-selected={activeTab === tab.key}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
            {tab.key === 'review' && <em>（{MOCK_REVIEW_SUMMARY.total}）</em>}
          </button>
        ))}
      </div>

      <div className="pinfo-tab-body">

        {/* 상품 상세 */}
        {activeTab === 'detail' && (
          <div className="pinfo-detail-grid">
            <div className="pinfo-detail-col">
              <h3>商品の特徴</h3>
              <ul className="pinfo-check-list">
                {PRODUCT_FEATURES.map((f) => (
                  <li key={f}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pinfo-detail-col">
              <h3>商品情報</h3>
              <table className="pinfo-spec">
                <tbody>
                  <tr><th>ブランド</th><td>{product.brand || '-'}</td></tr>
                  <tr><th>商品名</th><td>{product.nameJp || product.name}</td></tr>
                  <tr><th>原産国</th><td>日本</td></tr>
                  <tr><th>商品コード</th><td>{productCode}</td></tr>
                  <tr><th>在庫</th><td>{product.stock} 点</td></tr>
                </tbody>
              </table>
            </div>

            <div className="pinfo-detail-col">
              <h3>注意事項</h3>
              <ul className="pinfo-dot-list">
                {PRODUCT_CAUTIONS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 상품 정보 */}
        {activeTab === 'info' && (
          <table className="pinfo-spec wide">
            <tbody>
              <tr><th>ブランド</th><td>{product.brand || '-'}</td></tr>
              <tr><th>商品名（日本語）</th><td>{product.nameJp || '-'}</td></tr>
              <tr><th>販売価格</th><td>{product.price}（税込）</td></tr>
              <tr><th>参考価格</th><td>{product.originalPrice ?? '-'}</td></tr>
              <tr><th>在庫数</th><td>{product.stock} 点</td></tr>
              <tr><th>累計販売数</th><td>{product.sales} 点</td></tr>
              <tr><th>商品コード</th><td>{productCode}</td></tr>
            </tbody>
          </table>
        )}

        {/* 배송·송료 */}
        {activeTab === 'shipping' && (
          <div className="pinfo-shipping">
            <ol className="pinfo-steps">
              {SHIPPING_STEPS.map((s) => (
                <li key={s.no}>
                  <span>{s.no}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="pinfo-shipping-note">
              <strong>送料について</strong>
              <p>
                重量とサイズにより変動します。
                ご注文画面で最終金額をご確認ください。
              </p>
            </div>
          </div>
        )}

        {/* 리뷰 */}
        {activeTab === 'review' && <ProductReviews />}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <ul className="pinfo-faq">
            {PRODUCT_FAQ.map((item) => (
              <li key={item.q}>
                <strong>Q. {item.q}</strong>
                <p>A. {item.a}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ProductTabs;
