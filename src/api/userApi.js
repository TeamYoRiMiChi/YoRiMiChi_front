import axiosInstance from './axiosInstance';

/**
 * User 도메인 API
 * - 컴포넌트에서는 이 함수들만 import해서 씀
 * - axios 관련 코드(주소, 헤더 등)를 컴포넌트에 직접 안 씀
 */

// 회원가입
export const signup = (data) => {
  // data 예시: { email, password, nickname, phone }
  return axiosInstance.post('/users', data);
};

// 로그인
export const login = (data) => {
  // data 예시: { email, password }
  return axiosInstance.post('/users/login', data);
};

// 회원 조회
export const getUser = (id) => {
  return axiosInstance.get(`/users/${id}`);
};