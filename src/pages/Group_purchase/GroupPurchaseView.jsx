import '../../assets/styles/Group_purchase/GroupPurchaseView.css';
import GroupPurchaseTabs from '../../components/Group_purchase/GroupPurchaseTabs';
import GroupPurchaseGallery from '../../components/Group_purchase/GroupPurchaseGallery';
import GroupPurchaseSummary from '../../components/Group_purchase/GroupPurchaseSummary';
import GroupPurchaseBenefits from '../../components/Group_purchase/GroupPurchaseBenefits';
import RecommendedProducts from '../../components/Group_purchase/RecommendedProducts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupBuy, toGroupBuyDetailView } from '../../api/groupBuyApi';
function GroupPurchaseView() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getGroupBuy(productId)
      .then((response) => {
        if (active) setProduct(toGroupBuyDetailView(response.data.data));
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || '共同購入情報を読み込めませんでした。');
        }
      });

    return () => { active = false; };
  }, [productId]);

  if (error) return <main className="group_purchase_view"><p>{error}</p></main>;
  if (!product) return <main className="group_purchase_view"><p>読み込み中...</p></main>;

  return (
    <main className="group_purchase_view">
      <div className="group_purchase_view_inner">
        <nav className="group_purchase_breadcrumb">
          <span>ホーム</span>
          <span>›</span>
          <span>共同購入</span>
          <span>›</span>
          <span>食品・飲料</span>
          <span>›</span>
          <strong>{product.name}</strong>
        </nav>
        <section className="group_purchase_product">
          {/* 왼쪽 상품 이미지 컴포넌트 */}
          <GroupPurchaseGallery productName={product.name} />

          {/* 오른쪽 상품 정보 컴포넌트 */}
          <GroupPurchaseSummary product={product} />
        </section>
        
        {/* 공동구매 서비스 장점 컴포넌트 */}
        <GroupPurchaseBenefits />
        {/* 상품 상세 정보 탭 컴포넌트 */}
        <GroupPurchaseTabs product={product} />

        {/* 추천 상품 컴포넌트 */}
        <RecommendedProducts />
      </div>
    </main>
  );
}

export default GroupPurchaseView;
