import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleExclamation,
  faEnvelope,
  faKey,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import AuthLayout from '../../components/Auth/AuthLayout';
import {
  completePasswordReset,
  requestPasswordReset,
  toAuthenticationMessage,
} from '../../services/authentication';
import '../../assets/styles/Login.css';
import '../../assets/styles/ForgotPassword.css';

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleRequestCode = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const result = await requestPasswordReset(email.trim());

      if (result.nextStep.resetPasswordStep === 'DONE') {
        navigate('/login', { replace: true });
        return;
      }

      setStep('confirm');
      setMessage('確認コードをメールで送信しました。');
    } catch (requestError) {
      setError(
        toAuthenticationMessage(
          requestError,
          '確認コードの送信に失敗しました。',
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmReset = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!PASSWORD_PATTERN.test(newPassword)) {
      setError('パスワードは8文字以上で、英大文字・英小文字・数字・記号を含めてください。');
      return;
    }

    if (newPassword !== passwordConfirm) {
      setError('パスワードが一致しません。');
      return;
    }

    setIsLoading(true);

    try {
      await completePasswordReset(
        email.trim(),
        confirmationCode.trim(),
        newPassword,
      );
      setStep('complete');
    } catch (confirmError) {
      setError(
        toAuthenticationMessage(
          confirmError,
          'パスワードの再設定に失敗しました。',
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      await requestPasswordReset(email.trim());
      setMessage('確認コードを再送信しました。');
    } catch (resendError) {
      setError(
        toAuthenticationMessage(
          resendError,
          '確認コードの再送信に失敗しました。',
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <AuthLayout
        description={
          <>
            ご登録済みのメールアドレスを使って、
            <br />
            安全にパスワードを再設定できます。
          </>
        }
        showMembershipBenefit={false}
      >
        <section className="signup-content login-content forgot-password-content">
          <h2>パスワード再設定</h2>

          {step === 'request' && (
            <form className="login-form" onSubmit={handleRequestCode}>
              <p className="form-description">
                ご登録済みのメールアドレスを入力してください。
              </p>

              <div className="form-group-with-icon">
                <label htmlFor="reset-email">メールアドレス</label>
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              {error && <ErrorMessage message={error} />}

              <button className="login-submit" type="submit" disabled={isLoading}>
                {isLoading ? '送信中...' : '確認コードを送信'}
              </button>
            </form>
          )}

          {step === 'confirm' && (
            <form className="login-form" onSubmit={handleConfirmReset}>
              <p className="form-description">
                <strong>{email}</strong>に送信された確認コードと新しいパスワードを入力してください。
              </p>

              <div className="form-group-with-icon">
                <label htmlFor="confirmation-code">確認コード</label>
                <FontAwesomeIcon icon={faKey} />
                <input
                  id="confirmation-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={confirmationCode}
                  onChange={(event) => setConfirmationCode(event.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group-with-icon">
                <label htmlFor="new-password">新しいパスワード</label>
                <FontAwesomeIcon icon={faLock} />
                <input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  disabled={isLoading}
                  required
                />
                <p className="password-reset-hint">
                  8文字以上で、英大文字・英小文字・数字・記号をそれぞれ含めてください。
                </p>
              </div>

              <div className="form-group-with-icon">
                <label htmlFor="new-password-confirm">パスワード確認</label>
                <FontAwesomeIcon icon={faLock} />
                <input
                  id="new-password-confirm"
                  type="password"
                  autoComplete="new-password"
                  value={passwordConfirm}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              {message && <SuccessMessage message={message} />}
              {error && <ErrorMessage message={error} />}

              <button className="login-submit" type="submit" disabled={isLoading}>
                {isLoading ? '変更中...' : 'パスワードを変更'}
              </button>

              <button
                className="forgot-password-secondary"
                type="button"
                onClick={handleResendCode}
                disabled={isLoading}
              >
                確認コードを再送信
              </button>
            </form>
          )}

          {step === 'complete' && (
            <div className="forgot-password-complete">
              <FontAwesomeIcon icon={faCircleCheck} />
              <p>パスワードを変更しました。</p>
              <Link className="login-submit forgot-password-login-link" to="/login">
                新しいパスワードでログイン
              </Link>
            </div>
          )}

          {step !== 'complete' && (
            <p className="forgot-password-back-link">
              <Link to="/login">ログイン画面に戻る</Link>
            </p>
          )}
        </section>
      </AuthLayout>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="login-error" role="alert">
      <FontAwesomeIcon icon={faCircleExclamation} />
      {message}
    </p>
  );
}

function SuccessMessage({ message }) {
  return (
    <p className="forgot-password-success" role="status">
      <FontAwesomeIcon icon={faCircleCheck} />
      {message}
    </p>
  );
}

export default ForgotPassword;
