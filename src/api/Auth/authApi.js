/**
 * Auth 도메인 API
 *
 * 실제 구현은 api/userApi.js에 있습니다.
 * 기존 import 경로를 쓰는 코드가 깨지지 않도록 재수출만 합니다.
 *
 * 새로 작성하는 코드는 '../userApi'를 직접 import하세요.
 */
export { signup, login, getUser, getMyInfo, checkEmail } from '../userApi';
