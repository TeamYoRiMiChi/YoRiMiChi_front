import {
  confirmResetPassword,
  confirmSignUp,
  fetchAuthSession,
  fetchUserAttributes,
  resetPassword,
  resendSignUpCode,
  signIn,
  signInWithRedirect,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import { isLocalAuthentication } from '../config/authMode';
import { resolveApiBaseUrl } from '../config/apiBaseUrl';

const LOCAL_TOKEN_KEY = 'yorimichi_local_access_token';

async function localRequest(path, body) {
  const response = await fetch(`${resolveApiBaseUrl()}/users/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message ?? 'リクエストに失敗しました。');
  return result.data;
}

const PENDING_PROFILE_KEY = 'yorimichi_pending_profile';

export async function registerWithEmail(form) {
  const { email, password, name, phone } = form;
  if (isLocalAuthentication()) {
    await localRequest('signup', form);
    return { isSignUpComplete: true, nextStep: { signUpStep: 'DONE' } };
  }
  const result = await signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        email,
        name: name.trim(),
        phone_number: toCognitoPhoneNumber(phone),
      },
    },
  });

  sessionStorage.setItem(
    PENDING_PROFILE_KEY,
    JSON.stringify({ email, name, phone }),
  );

  return result;
}

export async function confirmEmail(email, confirmationCode) {
  if (isLocalAuthentication()) throw new Error('メール確認は不要です。ログインしてください。');
  const result = await confirmSignUp({ username: email, confirmationCode });
  const pendingProfile = getPendingProfile(email);

  if (pendingProfile) {
    sessionStorage.setItem(
      PENDING_PROFILE_KEY,
      JSON.stringify({ ...pendingProfile, confirmed: true }),
    );
  }

  return result;
}

export function resendEmailCode(email) {
  if (isLocalAuthentication()) throw new Error('メール確認は不要です。');
  return resendSignUpCode({ username: email });
}

export function requestPasswordReset(email) {
  if (isLocalAuthentication()) throw new Error('ローカル環境ではメールによるパスワード再設定は利用できません。');
  return resetPassword({ username: email });
}

export function completePasswordReset(email, confirmationCode, newPassword) {
  if (isLocalAuthentication()) throw new Error('ローカル環境ではメールによるパスワード再設定は利用できません。');
  return confirmResetPassword({
    username: email,
    confirmationCode,
    newPassword,
  });
}

export async function loginWithEmail(email, password) {
  if (isLocalAuthentication()) {
    const result = await localRequest('login', { email, password });
    sessionStorage.setItem(LOCAL_TOKEN_KEY, result.accessToken);
    return { isSignedIn: true, nextStep: { signInStep: 'DONE' } };
  }
  // A previous member API failure can leave a valid Cognito session behind.
  const session = await fetchAuthSession();
  if (session.tokens?.accessToken) {
    const currentEmail = session.tokens.idToken?.payload?.email;
    if (currentEmail?.toLowerCase() === email.trim().toLowerCase()) {
      return { isSignedIn: true, nextStep: { signInStep: 'DONE' } };
    }
    await signOut();
  }
  const result = await signIn({ username: email, password });

  if (!result.isSignedIn || result.nextStep.signInStep !== 'DONE') {
    const error = new Error('追加のログイン手続きが必要です。');
    error.nextStep = result.nextStep;
    throw error;
  }

  return result;
}

export function loginWithGoogle() {
  if (isLocalAuthentication()) throw new Error('ローカル環境ではメールアドレスでログインしてください。');
  return signInWithRedirect({ provider: 'Google' });
}

export async function getAuthenticationSession() {
  if (isLocalAuthentication()) {
    return { accessToken: sessionStorage.getItem(LOCAL_TOKEN_KEY), idToken: null, claims: {} };
  }
  const session = await fetchAuthSession();
  const accessToken = session.tokens?.accessToken?.toString() ?? null;
  const idToken = session.tokens?.idToken;

  return {
    accessToken,
    idToken: idToken?.toString() ?? null,
    claims: idToken?.payload ?? {},
  };
}

export async function getAuthenticatedAttributes() {
  if (isLocalAuthentication()) return {};
  try {
    return await fetchUserAttributes();
  } catch {
    return {};
  }
}

export function getPendingProfile(email) {
  if (isLocalAuthentication()) return null;
  try {
    const saved = JSON.parse(sessionStorage.getItem(PENDING_PROFILE_KEY));
    if (!saved) return null;
    return !email || saved.email === email ? saved : null;
  } catch {
    return null;
  }
}

export function clearPendingProfile() {
  sessionStorage.removeItem(PENDING_PROFILE_KEY);
}

export function logoutFromCognito() {
  if (isLocalAuthentication()) {
    sessionStorage.removeItem(LOCAL_TOKEN_KEY);
    return Promise.resolve();
  }
  return signOut();
}

export function toCognitoPhoneNumber(phone) {
  const digits = (phone ?? '').replace(/\D/g, '');
  return /^0(70|80|90)\d{8}$/.test(digits)
    ? `+81${digits.slice(1)}`
    : phone;
}

export function toJapaneseMobileNumber(phone) {
  const digits = (phone ?? '').replace(/\D/g, '');
  const domestic = digits.startsWith('81') ? `0${digits.slice(2)}` : digits;
  return /^0(70|80|90)\d{8}$/.test(domestic)
    ? `${domestic.slice(0, 3)}-${domestic.slice(3, 7)}-${domestic.slice(7)}`
    : '';
}

export function toAuthenticationMessage(error, fallback) {
  const messages = {
    CodeMismatchException: '確認コードが正しくありません。',
    ExpiredCodeException: '確認コードの有効期限が切れています。',
    NotAuthorizedException: 'メールアドレスまたはパスワードが正しくありません。',
    UserAlreadyAuthenticatedException: 'すでにログインしています。',
    UserNotConfirmedException: 'メールアドレスの確認が完了していません。',
    UsernameExistsException: 'すでに登録されているメールアドレスです。',
    UserNotFoundException: 'メールアドレスまたはパスワードが正しくありません。',
    InvalidPasswordException: 'パスワードの条件を確認してください。',
    InvalidParameterException: '入力内容を確認してください。',
    LimitExceededException: '試行回数が多すぎます。しばらくしてからお試しください。',
  };

  return error?.response?.data?.message ?? messages[error?.name] ?? error?.message ?? fallback;
}
