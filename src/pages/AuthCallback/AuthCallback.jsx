import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Hub } from 'aws-amplify/utils';
import 'aws-amplify/auth/enable-oauth-listener';
import { completeOAuthAuthentication } from '../../features/auth/authSlice';

function AuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    let completed = false;

    const completeSignIn = async () => {
      if (completed) return;

      try {
        const authentication = await dispatch(
          completeOAuthAuthentication(),
        ).unwrap();

        if (!active || !authentication.accessToken) return;
        completed = true;
        navigate(
          authentication.requiresOnboarding ? '/onboarding' : '/',
          { replace: true },
        );
      } catch (reason) {
        if (active) {
          setError(reason ?? 'Googleログインに失敗しました。');
        }
      }
    };

    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signInWithRedirect') {
        void completeSignIn();
      }

      if (payload.event === 'signInWithRedirect_failure' && active) {
        setError('Googleログインに失敗しました。');
      }
    });

    // The OAuth listener may have completed before this component subscribed.
    void completeSignIn();

    return () => {
      active = false;
      unsubscribe();
    };
  }, [dispatch, navigate]);

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
