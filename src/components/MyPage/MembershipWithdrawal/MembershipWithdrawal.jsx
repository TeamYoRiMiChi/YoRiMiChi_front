import "../../../assets/styles/MyPage/MembershipWithdrawal.css";
import useMembershipWithdrawal from "../../../hooks/MyPage/MyPage/useMembershipWithdrawal";

function MembershipWithdrawal() {
  const {
    isAgreed,
    isSubmitting,
    error,
    handleAgreementChange,
    handleWithdraw,
  } = useMembershipWithdrawal();

  return (
    <div className="mp_panel">
      <div className="withdraw_box">
        <h3>本当に退会しますか？</h3>

        <ul className="withdraw_list">
          <li>保有しているクーポンとポイントはすべて失効します。</li>
          <li>進行中の注文と共同購入は退会後も継続されます。</li>
          <li>作成したレビューとコメントは削除されません。</li>
          <li>退会後、同じメールアドレスでは再登録できません。</li>
        </ul>

        <label className="withdraw_check">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleAgreementChange}
            disabled={isSubmitting}
          />

          <span>上記の内容をすべて確認しました。</span>
        </label>

        {error && (
          <p className="withdraw_error" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          className="wide_bt wide_bt_danger"
          onClick={handleWithdraw}
          disabled={!isAgreed || isSubmitting}
        >
          {isSubmitting ? "退会処理中..." : "退会する"}
        </button>
      </div>
    </div>
  );
}

export default MembershipWithdrawal;