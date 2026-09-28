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

const PENDING_PROFILE_KEY = 'yorimichi_pending_profile';

export async function registerWithEmail({ email, password, name, phone }) {
  const result = await signUp({
    username: email,
    password,
    options: {
      userAttributes: { email },
    },
  });

  sessionStorage.setItem(
    PENDING_PROFILE_KEY,
    JSON.stringify({ email, name, phone }),
  );

  return result;
}

export async function confirmEmail(email, confirmationCode) {
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
  return resendSignUpCode({ username: email });
}

export function requestPasswordReset(email) {
  return resetPassword({ username: email });
}

export function completePasswordReset(email, confirmationCode, newPassword) {
  return confirmResetPassword({
    username: email,
    confirmationCode,
    newPassword,
  });
}

export async function loginWithEmail(email, password) {
  const result = await signIn({ username: email, password });

  if (!result.isSignedIn || result.nextStep.signInStep !== 'DONE') {
    const error = new Error('追加のログイン手続きが必要です。');
    error.nextStep = result.nextStep;
    throw error;
  }

  return result;
}

export function loginWithGoogle() {
  return signInWithRedirect({ provider: 'Google' });
}

export async function getAuthenticationSession() {
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
  try {
    return await fetchUserAttributes();
  } catch {
    return {};
  }
}

export function getPendingProfile(email) {
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
  clearPendingProfile();
  return signOut();
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

  return messages[error?.name] ?? error?.message ?? fallback;
}
