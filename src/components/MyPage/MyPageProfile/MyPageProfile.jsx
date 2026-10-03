import useMyPageProfile from "../../../hooks/MyPage/MyPage/useMyPageProfile";
import "../../../assets/styles/MyPage/MyPageProfile.css";

function MyPageProfile() {
  const { profile, isLoading, error } = useMyPageProfile();

  if (isLoading) {
    return <div className="mp_profile">読み込み中です...</div>;
  }

  if (error) {
    return (
      <div className="mp_profile">
        <p className="mp_status_error">{error}</p>
      </div>
    );
  }

  const joinDate = profile.createdAt
    ? new Date(profile.createdAt)
        .toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replaceAll("/", ".")
    : "-";

  return (
    <div className="mp_profile">
      <div className="mp_avatar">{profile.name.charAt(0)}</div>
      <div className="mp_profile_text">
        <p className="mp_greet">
          <strong>{profile.name}</strong>님, 안녕하세요
        </p>
        <p className="mp_email">{profile.email}</p>
        <div className="mp_meta">
          <span className="mp_join">가입일 {joinDate}</span>
        </div>
      </div>
    </div>
  );
}

export default MyPageProfile;
