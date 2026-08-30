import AuthIntro from "./AuthIntro";
import "../../assets/styles/Auth.css";

function AuthLayout({ children, description, showMembershipBenefit = true }) {
  return (
    <main className="signup-main">
      <div className="signup-card">
        <AuthIntro
          description={description}
          showMembershipBenefit={showMembershipBenefit}
        />

        {children}
      </div>
    </main>
  );
}

export default AuthLayout;
