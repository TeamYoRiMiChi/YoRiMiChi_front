import { useState } from 'react';
import { isLocalAuthentication } from '../../config/authMode';
import { loginWithGoogle } from '../../services/authentication';
import GoogleIcon from "../../assets/images/google_social_btn.png";
import LineIcon from "../../assets/images/line_social_btn.png";

function SocialAuthButtons({ googleText, lineText }) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  if (isLocalAuthentication()) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsRedirecting(true);

      await loginWithGoogle();
    } catch (error) {
      console.error("Failed to start Google sign-in.", error);
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
    </>
  );
}

export default SocialAuthButtons;
