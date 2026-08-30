import GoogleIcon from "../../assets/images/google_social_btn.png";
import LineIcon from "../../assets/images/line_social_btn.png";

function SocialAuthButtons({ googleText, lineText }) {
  return (
    <>
      <div className="social-divider">
        <span>または</span>
      </div>

      <div className="social-signup">
        <button className="social-button" type="button">
          <img src={GoogleIcon} alt="" />
          <span>{googleText}</span>
        </button>

        <button className="social-button" type="button">
          <img src={LineIcon} alt="" />
          <span>{lineText}</span>
        </button>
      </div>
    </>
  );
}

export default SocialAuthButtons;
