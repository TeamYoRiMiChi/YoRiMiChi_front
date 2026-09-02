import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faPhone,
  faCircleExclamation,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import SocialAuthButtons from "../../components/Auth/SocialAuthButtons";
import AuthLayout from "../../components/Auth/AuthLayout";
import { useSignUp } from "../../hooks/Auth/useSignUp";
import "../../assets/styles/SignUp.css";

function Sign_up() {
  const {
    form,
    errors,
    emailChecked,
    isLoading,
    signupError,
    handleChange,
    handleCheckEmail,
    handleSubmit,
  } = useSignUp();

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

          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            {/* 이름 */}
            <div className="form-group">
              <label htmlFor="last-name">お名前</label>
              <div className="name-row">
                <input
                  id="last-name"
                  type="text"
                  placeholder="姓を入力してください"
                  value={form.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <input
                  id="first-name"
                  type="text"
                  placeholder="名を入力してください"
                  value={form.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              {(errors.lastName || errors.firstName) && (
                <p className="field-error">
                  {errors.lastName ?? errors.firstName}
                </p>
              )}
            </div>

            {/* 이메일 */}
            <div className="form-group-with-icon">
              <label htmlFor="email">メールアドレス</label>
              <FontAwesomeIcon icon={faEnvelope} />
              <div className="email-row">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="メールアドレスを入力してください"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="email-check-btn"
                  onClick={handleCheckEmail}
                  disabled={isLoading || !form.email.trim()}
                >
                  重複確認
                </button>
              </div>
              {errors.email && <p className="field-error">{errors.email}</p>}
              {emailChecked === true && !errors.email && (
                <p className="field-success">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  使用できるメールアドレスです。
                </p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="form-group-with-icon">
              <label htmlFor="password">パスワード</label>
              <FontAwesomeIcon icon={faLock} />
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="パスワードを入力してください"
                value={form.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <p className="password-hint">
                8文字以上で、英字・数字・記号を含めてください。
              </p>
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            {/* 비밀번호 확인 */}
            <div className="form-group-with-icon">
              <label htmlFor="password-confirm">パスワード確認</label>
              <FontAwesomeIcon icon={faLock} />
              <input
                id="password-confirm"
                type="password"
                autoComplete="new-password"
                placeholder="パスワードを再入力してください"
                value={form.passwordConfirm}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.passwordConfirm && (
                <p className="field-error">{errors.passwordConfirm}</p>
              )}
            </div>

            {/* 전화번호 */}
            <div className="form-group-with-icon">
              <label htmlFor="phone">電話番号（任意）</label>
              <FontAwesomeIcon icon={faPhone} />
              <input
                id="phone"
                type="tel"
                placeholder="例）080-1234-5678"
                value={form.phone}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>

            {/* 약관 동의 */}
            <div className="agreement">
              <input
                id="term-agreement"
                type="checkbox"
                checked={form.agreed}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label htmlFor="term-agreement">
                <a href="#terms">利用規約</a>および
                <a href="#privacy">プライバシーポリシー</a>に同意します。
              </label>
            </div>
            {errors.agreed && <p className="field-error">{errors.agreed}</p>}

            {/* 서버 에러 */}
            {signupError && (
              <p className="signup-error" role="alert">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {signupError}
              </p>
            )}

            <button className="signup-submit" type="submit" disabled={isLoading}>
              {isLoading ? "登録中..." : "会員登録"}
            </button>
          </form>

          <SocialAuthButtons googleText="Googleで登録" lineText="LINEで登録" />

          <p className="login-prompt">
            すでに会員ですか？
            <Link to="/login">ログインはこちら</Link>
          </p>
        </section>
      </AuthLayout>
    </div>
  );
}

export default Sign_up;
