import { useState, useEffect } from "react";
import { getMyPageProfile } from "../../../api/MyPage/myPageProfileApi";

const EMPTY_PROFILE = {
  name: "",
  email: "",
  createdAt: null,
};

export function useMyPageProfile() {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await getMyPageProfile();

        if (!ignore) {
          setProfile({ ...EMPTY_PROFILE, ...(res.data.data ?? {}) });
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message ?? "プロフィールの取得に失敗しました。",
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return { profile, isLoading, error };
}

export default useMyPageProfile;
