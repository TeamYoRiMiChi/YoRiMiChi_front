import axios from 'axios';
import { store } from '../app/store';
import { logout } from '../features/auth/authSlice';

/* 배포 환경에서는 .env의 VITE_API_BASE_URL을 사용합니다 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:9000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

/**
 * 요청 인터셉터
 * Redux에 저장된 accessToken을 Authorization 헤더에 자동으로 붙입니다.
 * 개별 API 함수는 토큰을 신경 쓸 필요가 없습니다.
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
