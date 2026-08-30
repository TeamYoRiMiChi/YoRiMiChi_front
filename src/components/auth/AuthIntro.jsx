import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faShieldHalved,
  faTruck,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import AuthImage from "../../assets/images/Auth/auth-image.png";

function AuthIntro({ description, showMembershipBenefit = true }) {
  return (
    <section className="auth-intro">
      <h1>
        日本の良い商品を
        <br />
        <strong>
          もっと簡単に
          <br />
          もっとお得に
        </strong>
      </h1>

      <p className="auth-description">{description}</p>

      <ul className="benefit-list">
        {showMembershipBenefit && (
          <li>
            <div className="benefit-icon">
              <FontAwesomeIcon icon={faGift} />
            </div>
            <div>
              <strong>お得な会員特典</strong>
              <p>新規会員限定クーポンやポイント特典を提供！</p>
            </div>
          </li>
        )}
        <li>
          <div className="benefit-icon">
            <FontAwesomeIcon icon={faShieldHalved} />
          </div>
          <div>
            <strong>安全で安心なサービス</strong>
            <p>お客様の情報を安全に保護します。</p>
          </div>
        </li>
        <li>
          <div className="benefit-icon">
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div>
            <strong>迅速な配送サービス</strong>
            <p>日本からご自宅まで素早くお届けします。</p>
          </div>
        </li>
        <li>
          <div className="benefit-icon">
            <FontAwesomeIcon icon={faHeadset} />
          </div>
          <div>
            <strong>24時間カスタマーサービス</strong>
            <p>いつでもお気軽にお問い合わせください。</p>
          </div>
        </li>
      </ul>

      <div className="auth-image-placeholder">
        <img src={AuthImage} alt="" />
      </div>
    </section>
  );
}

export default AuthIntro;
