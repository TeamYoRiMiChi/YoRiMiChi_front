import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../../api/MyPage/profileApi";

const EMPTY_PROFILE = { email: "", name: "", phone: "" };

export function useProfileManagement(fallback = EMPTY_PROFILE) {
  const [profile, setProfile] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      name: profile.name?.trim() ?? "",
      phone: profile.phone?.trim() ?? "",
    };

    try {
      const res = await updateProfile(updateData);
      const updatedProfile = { ...EMPTY_PROFILE, ...profile, ...(res.data.data ?? {}) };

      setProfile(updatedProfile);

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
        const profileData = { ...EMPTY_PROFILE, ...(res.data.data ?? {}) };

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
    handleSubmit,
    profile,
    setProfile,
    isLoading,
    error,
  };
}

export default useProfileManagement;
