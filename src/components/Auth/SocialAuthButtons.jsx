import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { completeOAuthAuthentication } from '../../features/auth/authSlice';
import { isLocalAuthentication } from '../../config/authMode';
import { loginWithGoogle } from '../../services/authentication';
import GoogleIcon from "../../assets/images/google_social_btn.png";
import LineIcon from "../../assets/images/line_social_btn.png";

function SocialAuthButtons({ googleText, lineText }) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Back navigation may restore the page with its pre-redirect button state.
    const resetRedirectState = () => setIsRedirecting(false);
    window.addEventListener('pageshow', resetRedirectState);
    return () => window.removeEventListener('pageshow', resetRedirectState);
  }, []);
  if (isLocalAuthentication()) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsRedirecting(true);
      setError(null);

      // Resume an authenticated account instead of starting a second OAuth flow.
      const authentication = await dispatch(completeOAuthAuthentication()).unwrap();
      if (authentication.accessToken) {
        navigate(authentication.requiresOnboarding ? '/onboarding' : '/', { replace: true });
        setIsRedirecting(false);
        return;
      }

      await loginWithGoogle();
    } catch (error) {
      setError(typeof error === 'string' ? error : error.message ?? 'Googleログインに失敗しました。');
      setIsRedirecting(false);
    }
  };

  return (
    <>
      <div className="social-divider">
        <span>または</span>
      </div>

      <div className="social-signup">
        <button className="social-button" type="button" onClick={handleGoogleSignIn} disabled={isRedirecting}>
          <img src={GoogleIcon} alt="" />
          <span>{isRedirecting ? 'Googleに移動中...' : googleText}</span>
        </button>

        <button className="social-button" type="button" disabled>
          <img src={LineIcon} alt="" />
          <span>{lineText}</span>
        </button>
      </div>
      {error && <p className="login-error" role="alert">{error}</p>}
    </>
  );
}

export default SocialAuthButtons;
