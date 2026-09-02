import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, clearAuthError } from '../../features/auth/authSlice';

/**
 * 로그인 폼 로직
 *
 * 로그인에 성공하면 원래 가려던 페이지로 돌려보냅니다.
 * (PrivateRoute에 막혀서 온 경우 location.state.from에 경로가 담겨 있습니다)
 */
export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { accessToken, status, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = status === 'loading';

  /* 페이지를 벗어날 때 이전 에러 메시지를 정리 */
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  /* 이미 로그인 상태면 접근할 이유가 없으므로 되돌려보냄 */
  useEffect(() => {
    if (accessToken) {
      const redirectTo = location.state?.from ?? '/';
      navigate(redirectTo, { replace: true });
    }
  }, [accessToken, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) return;

    // unwrap()을 쓰면 실패 시 예외가 나므로, 결과를 직접 확인합니다
    const result = await dispatch(loginUser({ email: email.trim(), password }));

    if (loginUser.fulfilled.match(result)) {
      const redirectTo = location.state?.from ?? '/';
      navigate(redirectTo, { replace: true });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
    error,
  };
}

export default useLogin;
