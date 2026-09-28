import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAuthError,
  confirmSignup,
  resetSignupFlow,
  resendSignupCode,
  signupUser,
} from '../../features/auth/authSlice';
import { searchPostalCode, toPostalAddressView } from '../../api/postalApi';
import { getPendingProfile } from '../../services/authentication';

const INITIAL_FORM = {
  lastName: '',
  firstName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  phone: '',
  postalCode: '',
  address: '',
  addressDetail: '',
  agreed: false,
};

const RESEND_COOLDOWN_SECONDS = 120;
const RESEND_AVAILABLE_AT_KEY = 'yorimichi_signup_resend_available_at';

/**
 * 회원가입 폼 로직
 *
 * 서버에 보내기 전에 프론트에서 먼저 검증합니다.
 * 서버 검증이 최종 방어선이지만, 프론트에서 걸러주면
 * 사용자가 왕복을 기다리지 않아도 됩니다.
 */
export function useSignUp() {
  const dispatch = useDispatch();

  const { signupStatus, signupError } = useSelector((s) => s.auth);

  const pendingProfile = getPendingProfile();
  const [form, setForm] = useState(() => ({
    ...INITIAL_FORM,
    email: pendingProfile?.email ?? '',
  }));
  const [errors, setErrors] = useState({});
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isSearchingPostal, setIsSearchingPostal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [resendRemainingSeconds, setResendRemainingSeconds] = useState(
    getInitialResendRemainingSeconds,
  );

  const isLoading = signupStatus === 'loading';

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
      dispatch(resetSignupFlow());
    };
  }, [dispatch]);

  useEffect(() => {
    if (resendRemainingSeconds <= 0) return undefined;

    const timerId = window.setInterval(() => {
      const availableAt = Number(
        sessionStorage.getItem(RESEND_AVAILABLE_AT_KEY) ?? 0,
      );
      const remaining = Math.max(
        0,
        Math.ceil((availableAt - Date.now()) / 1000),
      );

      setResendRemainingSeconds(remaining);

      if (remaining === 0) {
        sessionStorage.removeItem(RESEND_AVAILABLE_AT_KEY);
      }
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [resendRemainingSeconds]);

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

  };

  const handlePhoneChange = (phone) => {
    setForm((prev) => ({ ...prev, phone }));
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  /* 우편번호로 주소 검색 */
  const handleSearchPostal = async () => {
    const zipcode = form.postalCode.trim();

    if (!zipcode) {
      setErrors((prev) => ({
        ...prev,
        postalCode: '郵便番号を入力してください。',
      }));
      return;
    }

    setIsSearchingPostal(true);
    try {
      const res = await searchPostalCode(zipcode);
      const found = res.data?.data?.[0];

      if (!found) {
        setErrors((prev) => ({
          ...prev,
          postalCode: '該当する住所が見つかりません。',
        }));
        return;
      }

      const view = toPostalAddressView(found);
      setForm((prev) => ({
        ...prev,
        postalCode: view.zipcode || prev.postalCode,
        address: view.fullAddress,
      }));
      setErrors((prev) => ({ ...prev, postalCode: undefined, address: undefined }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        postalCode:
          err.response?.data?.message ?? '郵便番号検索に失敗しました。',
      }));
    } finally {
      setIsSearchingPostal(false);
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
        postalCode: form.postalCode.trim() || null,
        address: form.address.trim() || null,
        addressDetail: form.addressDetail.trim() || null,
      })
    );

    if (signupUser.fulfilled.match(result)) {
      startResendCooldown(setResendRemainingSeconds);
      setConfirmationMessage(null);
    }

  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!confirmationCode.trim()) return;

    const result = await dispatch(confirmSignup({
      email: form.email.trim(),
      confirmationCode: confirmationCode.trim(),
    }));

    if (confirmSignup.fulfilled.match(result)) {
      sessionStorage.removeItem(RESEND_AVAILABLE_AT_KEY);
      setResendRemainingSeconds(0);
    }
  };

  const handleResendCode = async () => {
    if (resendRemainingSeconds > 0) return;

    const result = await dispatch(resendSignupCode(form.email.trim()));
    if (resendSignupCode.fulfilled.match(result)) {
      startResendCooldown(setResendRemainingSeconds);
      setConfirmationMessage('確認コードを再送信しました。');
    }
  };

  return {
    form,
    errors,
    isLoading,
    isConfirmationRequired:
      signupStatus === 'confirmationRequired' ||
      Boolean(pendingProfile && !pendingProfile.confirmed),
    isConfirmed: signupStatus === 'confirmed',
    signupError,
    confirmationMessage,
    confirmationCode,
    setConfirmationCode: (value) => {
      setConfirmationCode(value.replace(/\D/g, '').slice(0, 6));
    },
    resendRemainingSeconds,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    handleConfirm,
    handleResendCode,
    handleSearchPostal,
    isSearchingPostal,
  };
}

function getInitialResendRemainingSeconds() {
  const availableAt = Number(
    sessionStorage.getItem(RESEND_AVAILABLE_AT_KEY) ?? 0,
  );
  return Math.max(0, Math.ceil((availableAt - Date.now()) / 1000));
}

function startResendCooldown(setRemainingSeconds) {
  const availableAt = Date.now() + RESEND_COOLDOWN_SECONDS * 1000;
  sessionStorage.setItem(RESEND_AVAILABLE_AT_KEY, String(availableAt));
  setRemainingSeconds(RESEND_COOLDOWN_SECONDS);
}

/* input id → form key 매핑 */
const FIELD_MAP = {
  'last-name': 'lastName',
  'first-name': 'firstName',
  'password-confirm': 'passwordConfirm',
  'term-agreement': 'agreed',
  'postal-code': 'postalCode',
  'address-detail': 'addressDetail',
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
  } else if (
    !/[a-z]/.test(form.password) ||
    !/[A-Z]/.test(form.password) ||
    !/\d/.test(form.password) ||
    !/[^A-Za-z0-9]/.test(form.password)
  ) {
    errors.password = '英大文字・英小文字・数字・記号を含めてください。';
  }

  if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = 'パスワードが一致しません。';
  }

  if (!form.phone.trim()) {
    errors.phone = '電話番号を入力してください。';
  } else if (!/^(070|080|090)-\d{4}-\d{4}$/.test(form.phone.trim())) {
    errors.phone = '070・080・090から始まる携帯電話番号を入力してください。';
  }

  // 배송지는 전부 任意이지만, 하나라도 입력했다면 가입 직후
  // 자동으로 기본 배송지로 등록되므로 최소한의 정보는 맞춰야 합니다.
  const hasAnyAddressInput =
    form.postalCode.trim() || form.address.trim() || form.addressDetail.trim();

  if (hasAnyAddressInput) {
    if (!form.postalCode.trim()) {
      errors.postalCode = '郵便番号を入力してください。';
    }
    if (!form.address.trim()) {
      errors.address = '住所を入力してください。';
    }
    if (!form.phone.trim()) {
      errors.phone = '配送先を登録するには電話番号が必要です。';
    }
  }

  if (!form.agreed) {
    errors.agreed = '利用規約への同意が必要です。';
  }

  return errors;
}

export default useSignUp;
