import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import 'aws-amplify/auth/enable-oauth-listener';

function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const completeSignIn = async () => {
      try {
        const session = await fetchAuthSession();
        const accessToken = session.tokens?.accessToken;

        if (!accessToken) {
          return;
        }

        if (active) {
          navigate('/', { replace: true });
        }
      } catch {
        // The OAuth listener may still be exchanging the authorization code
      }
    };

    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signInWithRedirect') {
        void completeSignIn();
      }

      if (
        payload.event === 'signInWithRedirect_failure' &&
        active
      ) {
        setError('Googleログインに失敗しました。');
      }
    });

    void completeSignIn();

    return () => {
      active = false;
      unsubscribe();
    };
  }, [navigate]);

  if (error) {
    return (
      <main>
        <h1>ログインエラー</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <p>ログイン処理中です...</p>
    </main>
  );
}

export default AuthCallback;