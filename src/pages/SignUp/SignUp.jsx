import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import SocialAuthButtons from "../../components/Auth/SocialAuthButtons";
import AuthLayout from "../../components/Auth/AuthLayout";
import JapaneseMobileFields from "../../components/Auth/JapaneseMobileFields";
import { useSignUp } from "../../hooks/Auth/useSignUp";
import "../../assets/styles/SignUp.css";

function Sign_up() {
  const {
    form,
    errors,
    isLoading,
    isConfirmationRequired,
    isConfirmed,
    signupError,
    confirmationMessage,
    confirmationCode,
    setConfirmationCode,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    handleConfirm,
    handleResendCode,
    handleSearchPostal,
    isSearchingPostal,
    resendRemainingSeconds,
  } = useSignUp();

  if (isConfirmed) {
    return (
      <div className="signup-page">
        <AuthLayout description={<>YoRiMiChiへの会員登録が完了しました。</>}>
          <section className="signup-content signup-complete" role="status">
            <FontAwesomeIcon className="signup-complete-icon" icon={faCircleCheck} />
            <h2>会員登録が完了しました</h2>
            <p className="form-description">
              ご登録いただいたメールアドレスとパスワードでログインできます。
            </p>
            <Link className="signup-submit signup-login-link" to="/login">
              ログイン画面へ
            </Link>
          </section>
        </AuthLayout>
      </div>
    );
  }

  if (isConfirmationRequired) {
    return (
      <div className="signup-page">
        <AuthLayout
          description={<>メールに届いた確認コードを入力してください。</>}
        >
          <section className="signup-content">
            <h2>メールアドレス確認</h2>
            <p className="form-description">
              {form.email} に確認コードを送信しました。
            </p>

            <form className="signup-form" onSubmit={handleConfirm}>
              <div className="form-group-with-icon">
                <label htmlFor="confirmation-code">確認コード</label>
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  id="confirmation-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="6桁の確認コード"
                  value={confirmationCode}
                  onChange={(event) => setConfirmationCode(event.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              {signupError && (
                <p className="signup-error" role="alert">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  {signupError}
                </p>
              )}

              {confirmationMessage && (
                <p className="signup-success" role="status">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  {confirmationMessage}
                </p>
              )}

              <button className="signup-submit" type="submit" disabled={isLoading}>
                {isLoading ? '確認中...' : 'メールアドレスを確認'}
              </button>
              <button
                className="email-check-btn confirmation-resend-btn"
                type="button"
                onClick={handleResendCode}
                disabled={isLoading || resendRemainingSeconds > 0}
              >
                {resendRemainingSeconds > 0
                  ? `再送信まで ${formatCountdown(resendRemainingSeconds)}`
                  : '確認コードを再送信'}
              </button>
            </form>
          </section>
        </AuthLayout>
      </div>
    );
  }

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
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="メールアドレスを入力してください"
                value={form.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
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
                8文字以上で、英大文字・英小文字・数字・記号を含めてください。
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
            <div className="form-group">
              <label htmlFor="phone-prefix">携帯電話番号</label>
              <JapaneseMobileFields
                idPrefix="phone"
                value={form.phone}
                onChange={handlePhoneChange}
                disabled={isLoading}
              />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>

            {/* 배송지 (임의) */}
            <div className="form-group">
              <label htmlFor="postal-code">配送先住所（任意）</label>

              <div className="email-row">
                <input
                  className="address-field"
                  id="postal-code"
                  type="text"
                  placeholder="郵便番号（例）111-0053"
                  value={form.postalCode}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="email-check-btn"
                  onClick={handleSearchPostal}
                  disabled={isLoading || isSearchingPostal || !form.postalCode.trim()}
                >
                  {isSearchingPostal ? "検索中..." : "郵便番号検索"}
                </button>
              </div>
              {errors.postalCode && (
                <p className="field-error">{errors.postalCode}</p>
              )}

              <input
                className="address-field"
                id="address"
                type="text"
                placeholder="郵便番号検索を押すと自動入力されます"
                value={form.address}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.address && <p className="field-error">{errors.address}</p>}

              <input
                className="address-field"
                id="address-detail"
                type="text"
                placeholder="建物名・部屋番号など（任意）"
                value={form.addressDetail}
                onChange={handleChange}
                disabled={isLoading}
              />
              <p className="address-hint">
                会員登録後、マイページから配送先として登録できます。
              </p>
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

function formatCountdown(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default Sign_up;
