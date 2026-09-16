import { useEffect, useState } from 'react';
import { getMyInquiries } from '../../api/inquiryApi';

function useMyInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await getMyInquiries();
        if (active) setInquiries(response.data.data ?? []);
      } catch (requestError) {
        if (active) {
          setError(
            requestError.response?.data?.message ??
              'お問い合わせ履歴の取得に失敗しました。',
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  return { inquiries, loading, error };
}

export default useMyInquiries;
