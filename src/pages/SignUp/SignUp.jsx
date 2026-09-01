import "../../assets/styles/SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import SocialAuthButtons from "../../components/Auth/SocialAuthButtons";
import AuthLayout from "../../components/Auth/AuthLayout";

function Sign_up() {
  return (
    <div className="signup-page">
      <AuthLayout
        description={
          <>
            YoRiMiChiの会員になって、
            <br />
            便利でお得な海外直購◦共同購買を始めましょう。
          </>
        }
      >
        <section className="signup-content">
          <h2>会員登録</h2>
          <p className="form-description">YoRiMiChiの新規会員登録を行います</p>
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

          <SocialAuthButtons googleText="Googleで登録" lineText="LINEで登録" />

          <p className="login-prompt">
            すでに会員ですか？
            <a href="#login">ログインはこちら</a>
          </p>
        </section>
      </AuthLayout>
    </div>
  );
}

export default Sign_up;
