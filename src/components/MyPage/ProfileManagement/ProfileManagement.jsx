import "../../../assets/styles/MyPage/ProfileManagement.css";
import useProfileManagement from "../../../hooks/MyPage/ProfileManagement/useProfileManagement";
import JapaneseMobileFields from "../../Auth/JapaneseMobileFields";

function ProfileManagement() {
  // const user = {
  //   name: "安徳",
  //   email: "antoku@yahoo.com",
  //   joinDate: "1178.12.22",
  //   grade: "VIP",
  // };

  const {
    handleSubmit,
    profile,
    setProfile,
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
          <JapaneseMobileFields
            idPrefix="profile-phone"
            value={profile.phone}
            onChange={(phone) =>
              setProfile((prev) => ({ ...prev, phone }))
            }
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
