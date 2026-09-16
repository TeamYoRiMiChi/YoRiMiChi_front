import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyInquiries } from '../../api/inquiryApi';
import { getUnreadAnswerIds, markAnswersSeen } from '../../data/inquiryAnswerNotifications';

function useMyInquiries({ markRead = false, poll = false } = {}) {
  const memberId = useSelector((state) => state.auth.user?.memberId);
  const [inquiries, setInquiries] = useState([]);
  const [unreadAnswerIds, setUnreadAnswerIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await getMyInquiries();
        if (active) {
          const items = response.data.data ?? [];
          const unreadIds = getUnreadAnswerIds(memberId, items);
          setInquiries(items);
          setUnreadAnswerIds(unreadIds);
          if (markRead) markAnswersSeen(memberId, items);
          setError('');
        }
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
    const handleFocus = () => { if (poll) load(); };
    if (poll) window.addEventListener('focus', handleFocus);
    const timer = poll ? window.setInterval(() => {
      if (!document.hidden) load();
    }, 30000) : null;
    return () => {
      active = false;
      if (timer) window.clearInterval(timer);
      window.removeEventListener('focus', handleFocus);
    };
  }, [memberId, markRead, poll, refreshKey]);

  const refresh = () => setRefreshKey((current) => current + 1);
  return { inquiries, unreadAnswerIds, loading, error, refresh };
}

export default useMyInquiries;
