import { Link } from 'react-router-dom';
import ProductBreadcrumb from '../../components/Overseas/ProductInfo/ProductBreadcrumb';
import ProductGallery from '../../components/Overseas/ProductInfo/ProductGallery';
import ProductSummary from '../../components/Overseas/ProductInfo/ProductSummary';
import ProductBenefits from '../../components/Overseas/ProductInfo/ProductBenefits';
import ProductTabs from '../../components/Overseas/ProductInfo/ProductTabs';
import RelatedProducts from '../../components/Overseas/ProductInfo/RelatedProducts';
import { useProductInfo } from '../../hooks/Overseas/useProductInfo';
import '../../assets/styles/Overseas/ProductInfo/ProductInfo.css';

function ProductInfo() {
  const {
    product,
    related,
    isLoading,
    error,
    productCode,
    gallery,
    purchase,
    activeTab,
    setActiveTab,
  } = useProductInfo();

  /* 로딩 중 */
  if (isLoading) {
    return (
      <div className="pinfo-page">
        <div className="pinfo-loading">読み込み中...</div>
      </div>
    );
  }

  /* 실패했거나 없는 상품 */
  if (error || !product) {
    return (
      <div className="pinfo-page">
        <div className="pinfo-error">
          <p>{error ?? '商品が見つかりませんでした。'}</p>
          <Link to="/overseas" className="pinfo-btn-line">
            商品一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pinfo-page">

      <ProductBreadcrumb
        items={[
          { label: 'ホーム', to: '/' },
          { label: '海外直購', to: '/overseas' },
          { label: product.name },
        ]}
      />

      <section className="pinfo-top">
        <ProductGallery
          gallery={gallery}
          altText={product.name}
          fallback={product.brand || product.name}
        />

        <ProductSummary
          product={product}
          productCode={productCode}
          purchase={purchase}
        />
      </section>

      <ProductBenefits />

      <ProductTabs
        product={product}
        productCode={productCode}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <RelatedProducts products={related} />
    </div>
  );
}

export default ProductInfo;
