import axios from 'axios';
import { store } from '../app/store';
import { logout } from '../features/auth/authSlice';

/**
 * API 서버 주소
 *
 * localhost로 고정하면 다른 기기(휴대폰, 같은 와이파이의 PC)에서 접속했을 때
 * localhost가 "그 기기 자신"을 가리켜 요청이 서버에 닿지 않습니다.
 * 그래서 현재 접속한 호스트를 그대로 쓰고 포트만 백엔드로 바꿉니다.
 *
 * 예) 브라우저가 http://192.168.0.5:5173 이면
 *     API는 http://192.168.0.5:9000/api 로 나갑니다.
 *
 * 배포 환경에서는 .env의 VITE_API_BASE_URL이 우선합니다.
 */
const API_PORT = import.meta.env.VITE_API_PORT ?? '9000';

function resolveBaseUrl() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  if (fromEnv) return fromEnv;

  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:${API_PORT}/api`;
}

const axiosInstance = axios.create({
  baseURL: resolveBaseUrl(),
  withCredentials: true,
  timeout: 10000,
});

/**
 * 요청 인터셉터
 * Redux에 저장된 accessToken을 Authorization 헤더에 자동으로 붙입니다.
 */
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * 응답 인터셉터
 * 401(인증 실패)이면 토큰이 만료된 것이므로 로그아웃 처리 후
 * 로그인 페이지로 보냅니다.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? '';

    // 로그인 요청 자체의 401은 "비밀번호 틀림"이므로 로그아웃 처리하지 않습니다.
    const isLoginRequest = url.includes('/users/login');

    if (status === 401 && !isLoginRequest) {
      const hadToken = Boolean(store.getState().auth.accessToken);
      store.dispatch(logout());

      // 로그인 상태였다가 튕긴 경우에만 이동 (원래 비로그인이면 그대로 둠)
      if (hadToken && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
