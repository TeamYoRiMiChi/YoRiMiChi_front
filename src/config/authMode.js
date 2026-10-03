import { resolveApiBaseUrl } from './apiBaseUrl';

let mode;
let imageUploadMode = 'multipart';

export async function initializeAuthMode() {
  const response = await fetch(`${resolveApiBaseUrl()}/auth/config`, {
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error('認証設定を取得できませんでした。');
  const body = await response.json();
  const configured = body.data?.mode;
  if (!['local', 'cognito'].includes(configured)) throw new Error('認証設定が正しくありません。');
  mode = configured;
  imageUploadMode = body.data?.imageUploadMode === 's3' ? 's3' : 'multipart';
}

export function usesDirectImageUpload() {
  return imageUploadMode === 's3';
}

export function isLocalAuthentication() {
  if (!mode) throw new Error('認証設定を取得できませんでした。ページを再読み込みしてください。');
  return mode === 'local';
}
