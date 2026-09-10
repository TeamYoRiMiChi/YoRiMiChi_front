import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadset,
  faLeaf,
  faShieldHalved,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Group_purchase/GroupPurchaseBenefits.css';

function GroupPurchaseBenefits() {
  return (
    <section className="group_purchase_benefits">
      {/* YOMI 공동구매 서비스 장점 */}
      <div className="group_purchase_benefit">
        <FontAwesomeIcon icon={faLeaf} className="benefit_icon" />
        <div>
          <strong>みんなで買うからお得に</strong>
          <p>まとめて購入することで最大50%OFFの特別価格に。</p>
        </div>
      </div>

      <div className="group_purchase_benefit">
        <FontAwesomeIcon icon={faShieldHalved} className="benefit_icon" />
        <div>
          <strong>安心・安全の取引</strong>
          <p>安全な決済システムで安心してご利用いただけます。</p>
        </div>
      </div>

      <div className="group_purchase_benefit">
        <FontAwesomeIcon icon={faTruckFast} className="benefit_icon" />
        <div>
          <strong>日本国内配送</strong>
          <p>国内からの発送で早くて確実にお届けします。</p>
        </div>
      </div>

      <div className="group_purchase_benefit">
        <FontAwesomeIcon icon={faHeadset} className="benefit_icon" />
        <div>
          <strong>サポート体制</strong>
          <p>ご不明な点はYOMIが丁寧に対応します。</p>
        </div>
      </div>
    </section>
  );
}

export default GroupPurchaseBenefits;
