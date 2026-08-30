import { useState } from "react";
import { login } from "../../api/userApi";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "../../components/auth/AuthLayout";
import SocialAuthButtons from "../../components/auth/SocialAuthButtons";
import "../../assets/styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });
      console.log(res.data.data);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

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
                placeholder="メールアドレスを入力してください"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group-with-icon">
              <label htmlFor="password">パスワード</label>
              <FontAwesomeIcon icon={faLock} />
              <input
                id="password"
                type="password"
                placeholder="パスワードを入力してください"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" />
                ログイン状態を保持する
              </label>

              <a href="#forgot-password">パスワードをお忘れですか?</a>
            </div>

            <button className="login-submit" type="submit">
              ログイン
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
