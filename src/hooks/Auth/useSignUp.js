import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser, clearAuthError } from '../../features/auth/authSlice';
import { checkEmail } from '../../api/Auth/userApi';

const INITIAL_FORM = {
  lastName: '',
  firstName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  phone: '',
  agreed: false,
};

/**
 * 회원가입 폼 로직
 *
 * 서버에 보내기 전에 프론트에서 먼저 검증합니다.
 * 서버 검증이 최종 방어선이지만, 프론트에서 걸러주면
 * 사용자가 왕복을 기다리지 않아도 됩니다.
 */
export function useSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupStatus, signupError } = useSelector((s) => s.auth);

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [emailChecked, setEmailChecked] = useState(null); // null | true(사용가능) | false(중복)

  const isLoading = signupStatus === 'loading';

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  /* 입력값 변경 */
  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    const key = FIELD_MAP[id] ?? id;

    setForm((prev) => ({
      ...prev,
      [key]: type === 'checkbox' ? checked : value,
    }));

    // 입력을 고치면 해당 필드의 에러는 지웁니다
    setErrors((prev) => ({ ...prev, [key]: undefined }));

    // 이메일을 바꾸면 중복확인 결과를 초기화
    if (key === 'email') setEmailChecked(null);
  };

  /* 이메일 중복 확인 */
  const handleCheckEmail = async () => {
    const email = form.email.trim();

    if (!isValidEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'メールアドレスの形式が正しくありません。',
      }));
      return;
    }

    try {
      const res = await checkEmail(email);
      const duplicated = res.data.data.duplicated;

      setEmailChecked(!duplicated);
      setErrors((prev) => ({
        ...prev,
        email: duplicated ? '既に使用されているメールアドレスです。' : undefined,
      }));
    } catch {
      setErrors((prev) => ({
        ...prev,
        email: '確認に失敗しました。しばらくしてからお試しください。',
      }));
    }
  };

  /* 제출 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // 서버는 name 하나만 받으므로 성+이름을 합칩니다
    const name = `${form.lastName.trim()} ${form.firstName.trim()}`.trim();

    const result = await dispatch(
      signupUser({
        email: form.email.trim(),
        password: form.password,
        name,
        phone: form.phone.trim() || null,
      })
    );

    if (signupUser.fulfilled.match(result)) {
      alert('会員登録が完了しました。ログインしてください。');
      navigate('/login', { replace: true });
    }
  };

  return {
    form,
    errors,
    emailChecked,
    isLoading,
    signupError,
    handleChange,
    handleCheckEmail,
    handleSubmit,
  };
}

/* input id → form key 매핑 */
const FIELD_MAP = {
  'last-name': 'lastName',
  'first-name': 'firstName',
  'password-confirm': 'passwordConfirm',
  'term-agreement': 'agreed',
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* 폼 전체 검증 */
function validate(form) {
  const errors = {};

  if (!form.lastName.trim()) {
    errors.lastName = '姓を入力してください。';
  }
  if (!form.firstName.trim()) {
    errors.firstName = '名を入力してください。';
  }

  if (!form.email.trim()) {
    errors.email = 'メールアドレスを入力してください。';
  } else if (!isValidEmail(form.email.trim())) {
    errors.email = 'メールアドレスの形式が正しくありません。';
  }

  if (!form.password) {
    errors.password = 'パスワードを入力してください。';
  } else if (form.password.length < 8) {
    errors.password = 'パスワードは8文字以上で入力してください。';
  }

  if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = 'パスワードが一致しません。';
  }

  if (form.phone.trim() && !/^[\d-]{9,}$/.test(form.phone.trim())) {
    errors.phone = '電話番号の形式が正しくありません。';
  }

  if (!form.agreed) {
    errors.agreed = '利用規約への同意が必要です。';
  }

  return errors;
}

export default useSignUp;
