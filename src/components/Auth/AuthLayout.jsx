import AuthIntro from "./AuthIntro";
import "../../assets/styles/Auth.css";

function AuthLayout({ children, description, showMembershipBenefit = true }) {
  return (
    <main className="auth-main">
      <div className="auth-card">
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
