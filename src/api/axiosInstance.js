import axios from 'axios';
import { store } from '../app/store';
import { logout } from '../features/auth/authSlice';

// Spring Boot 서버 기본 주소 (포트 9000)
const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000/api',
  withCredentials: true,
});

// 요청 보낼 때마다 자동으로 실행됨
// → Redux에 저장된 accessToken을 헤더에 자동으로 붙여줌
// → 그래서 개별 API 함수에서는 토큰을 신경 쓸 필요 없음
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 받을 때마다 자동으로 실행됨
// → 토큰 만료(401) 같은 공통 에러는 여기서 한 번에 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;