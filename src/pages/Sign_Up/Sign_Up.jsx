import "../../assets/styles/Sign_Up.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faShieldHalved,
  faTruck,
  faHeadset,
  faEnvelope,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import SignupImage from "../../assets/images/Sign_Up/signup-image.png";
import GoogleIcon from "../../assets/images/google_social_btn.png";
import LineIcon from "../../assets/images/line_social_btn.png";

function Sign_up() {
  return (
    <div className="signup-page">
      <main className="signup-main">
        <div className="signup-card">
          <section className="signup-intro">
            <h1>
              日本の良い商品を
              <br />
              <strong>
                もっと簡単に
                <br />
                もっとお得に
              </strong>
            </h1>

            <p className="signup-description">
              YoRiMiChiの会員になって、
              <br />
              便利でお得な海外直購◦共同購買を始めましょう。
            </p>

            <ul className="benefit-list">
              <li>
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faGift} />
                </div>
                <div>
                  <strong>お得な会員特典</strong>
                  <p>新規会員限定クーポンやポイント特典を提供！</p>
                </div>
              </li>
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

            <div className="signup-image-placeholder">
              <img src={SignupImage} />
            </div>
          </section>

          <section className="signup-content">
            <h2>会員登録</h2>
            <p className="form-description">
              YoRiMiChiの新規会員登録を行います
            </p>
            <form className="signup-form">
              <div className="form-group">
                <label htmlFor="last-name">お名前</label>
                <div className="name-row">
                  <input
                    id="last-name"
                    type="text"
                    placeholder="姓を入力してください"
                  />
                  <input
                    id="first-name"
                    type="text"
                    placeholder="名を入力してください"
                  />
                </div>
              </div>
              <div className="form-group-with-icon">
                <label htmlFor="email">メールアドレス</label>
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  id="email"
                  type="email"
                  placeholder="メールアドレスを入力してください"
                />
              </div>
              <div className="form-group-with-icon">
                <label htmlFor="password">パスワード</label>
                <FontAwesomeIcon icon={faLock} />
                <input
                  id="password"
                  type="password"
                  placeholder="パスワードを入力してください"
                />
                <p className="password-hint">
                  8文字以上で、英字・数字・記号を含めてください。
                </p>
              </div>
              <div className="form-group-with-icon">
                <label htmlFor="password-confirm">パスワード確認</label>
                <FontAwesomeIcon icon={faLock} />
                <input
                  id="password-confirm"
                  type="text"
                  placeholder="パスワードを再入力してください"
                />
              </div>
              <div className="form-group-with-icon">
                <label htmlFor="phone">電話番号（任意）</label>
                <FontAwesomeIcon icon={faPhone} />
                <input id="phone" type="text" placeholder="例）080-1234-5678" />
              </div>

              <div className="agreement">
                <input id="term-agreement" type="checkbox" />
                <label htmlFor="term-agreement">
                  <a href="#terms">利用規約</a>および
                  <a href="#privacy">プライバシーポリシー</a>に同意します。
                </label>
              </div>

              <button className="signup-submit" type="button">
                会員登録
              </button>
            </form>

            <div className="social-divider">
              <span>または</span>
            </div>

            <div className="social-signup">
              <button className="social-button google-button" type="button">
                <img src={GoogleIcon} alt="" />
                <span>Googleで登録</span>
              </button>

              <button className="social-button line-button" type="button">
                <img src={LineIcon} alt="" />
                <span>LINEで登録</span>
              </button>
            </div>

            <p className="login-prompt">
              すでに会員ですか？
              <a href="#login">ログインはこちら</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Sign_up;
