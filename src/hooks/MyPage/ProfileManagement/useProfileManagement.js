import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../../api/MyPage/profileApi";

export function useProfileManagement(fallback = {}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasNewPassword = newPassword.trim().length > 0;

    if (hasNewPassword && newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const updateData = {
      name: profile.name?.trim() ?? "",
      phone: profile.phone?.trim() ?? "",
    };

    if (hasNewPassword) {
      updateData.newPassword = newPassword;
    }

    try {
      const res = await updateProfile(updateData);
      const updatedProfile = res.data.data ?? profile;

      setProfile(updatedProfile);

      setNewPassword("");
      setConfirmPassword("");

      setError(null);
      alert("会員情報の修正に成功しました。");
    } catch (err) {
      setError(err.response?.data?.message ?? "会員情報の修正に失敗しました。");
    }
  };

  useEffect(() => {
    let ignore = false; // 컴포넌트가 사라진 뒤 setState 하는 걸 막습니다

    async function load() {
      try {
        const res = await getProfile();

        // 서버 응답: { success, data: [...], message }
        const profileData = res.data.data ?? {};

        if (!ignore) {
          setProfile(profileData);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message ?? "プロフィールの取得に失敗しました。",
          );
          setProfile(fallback); // 실패해도 화면은 보이도록
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    profile,
    setProfile,
    isLoading,
    error,
  };
}

export default useProfileManagement;
