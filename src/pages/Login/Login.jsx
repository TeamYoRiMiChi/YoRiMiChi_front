import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "../../components/Auth/AuthLayout";
import SocialAuthButtons from "../../components/Auth/SocialAuthButtons";
import "../../assets/styles/Login.css";
import { useLogin } from '../../hooks/Auth/useLogin';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
    error,
  } = useLogin();

  return (
    <div className="login-page">
      <AuthLayout
        description={
          <>
            海外直購と共同購入で、
            <br />
            日本の人気商品を安全・安心にお届けします。
          </>
        }
        showMembershipBenefit={false}
      >
        <section className="signup-content login-content">
          <h2>ログイン</h2>
          <p className="form-description">
            YoRiMiChiにログインしてお買い物を始めましょう。
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group-with-icon">
              <label htmlFor="email">メールアドレス</label>
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="メールアドレスを入力してください"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group-with-icon">
              <label htmlFor="password">パスワード</label>
              <FontAwesomeIcon icon={faLock} />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="パスワードを入力してください"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {error && (
              <p className="login-error" role="alert">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {error}
              </p>
            )}

            <div className="login-options">
              <label>
                <input type="checkbox" />
                ログイン状態を保持する
              </label>

              <a href="#forgot-password">パスワードをお忘れですか?</a>
            </div>

            <button className="login-submit" type="submit" disabled={isLoading}>
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </button>
          </form>

          <SocialAuthButtons
            googleText="Googleでログイン"
            lineText="LINEでログイン"
          />

          <p className="login-prompt">
            会員登録がお済みでないですか？
            <Link to="/join">会員登録はこちら</Link>
          </p>
        </section>
      </AuthLayout>
    </div>
  );
}

export default Login;
