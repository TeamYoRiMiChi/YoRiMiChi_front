import "../../../assets/styles/MyPage/ProfileManagement.css";
import useProfileManagement from "../../../hooks/MyPage/ProfileManagement/useProfileManagement";

function ProfileManagement() {
  // const user = {
  //   name: "安徳",
  //   email: "antoku@yahoo.com",
  //   joinDate: "1178.12.22",
  //   grade: "VIP",
  // };

  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    profile,
    setProfile,
    isLoading,
    error,
  } = useProfileManagement();

  return (
    <div className="mp_panel">
      <form className="form_box" onSubmit={handleSubmit}>
        <div className="form_row">
          <label>メールアドレス</label>
          <input type="email" value={profile.email} disabled />
          <span className="form_hint">メールアドレスは変更できません</span>
        </div>

        <div className="form_row">
          <label>名前</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            required
          />
        </div>

        <div className="form_row">
          <label>携帯電話番号</label>
          <div className="form_inline">
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              pattern="[0-9]{2,3}-[0-9]{4}-[0-9]{4}"
              title="電話番号の形式が正しくありません。"
              required
            />
          </div>
        </div>

        <div className="form_divider" />

        <div className="form_row">
          <label>新しいパスワード</label>
          <input
            type="password"
            placeholder="英字・数字を含む8文字以上"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            pattern="(?=.*[A-Za-z])(?=.*[0-9]).{8,100}"
            title="英字と数字を含めて8文字以上で入力してください。"
          />
        </div>

        <div className="form_row">
          <label>新しいパスワードの確認</label>
          <input
            type="password"
            placeholder="もう一度入力してください"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={newPassword.trim().length > 0}
          />
        </div>

        <button type="submit" className="wide_bt">
          保存する
        </button>
      </form>
    </div>
  );
}

export default ProfileManagement;
