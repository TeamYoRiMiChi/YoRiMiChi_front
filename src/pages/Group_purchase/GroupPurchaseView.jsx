import '../../assets/styles/Group_purchase/GroupPurchaseView.css';
import GroupPurchaseTabs from '../../components/Group_purchase/GroupPurchaseTabs';
import GroupPurchaseGallery from '../../components/Group_purchase/GroupPurchaseGallery';
import GroupPurchaseSummary from '../../components/Group_purchase/GroupPurchaseSummary';
import GroupPurchaseBenefits from '../../components/Group_purchase/GroupPurchaseBenefits';
import RecommendedProducts from '../../components/Group_purchase/RecommendedProducts';
function GroupPurchaseView() {
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
          <strong>Calbee じゃがりこ サラダ味</strong>
        </nav>
        <section className="group_purchase_product">
          {/* 왼쪽 상품 이미지 컴포넌트 */}
          <GroupPurchaseGallery />

          {/* 오른쪽 상품 정보 컴포넌트 */}
          <GroupPurchaseSummary />
        </section>
        
        {/* 공동구매 서비스 장점 컴포넌트 */}
        <GroupPurchaseBenefits />
        {/* 상품 상세 정보 탭 컴포넌트 */}
        <GroupPurchaseTabs />

        {/* 추천 상품 컴포넌트 */}
        <RecommendedProducts />
      </div>
    </main>
  );
}

export default GroupPurchaseView;
