import apiClient from './index';
const baseURL = '/users';

/**
 * 예제
 * export const getAPI = (data = {}) => {
 * return apiClient.get('asdf', {params: data})
 * }
 * export const postAPI = (data = {}) => {
 * return apiClient.post('asdf', data)
 * }
 *
 * 프론트 사용 예시
import UserService from '@/service/UserService.js';

// todo : api - 회원가입
const signupResponse = await UserService.checkId({
id: username,
});
const resData = signupResponse.data;

if (resData.error) {
alert(resData.error);
return;
}
 */

const login = (data = {}) => {
  return apiClient.post('/login', data);
};

// 회원가입
const signup = (data = {}) => {
  return apiClient.put(baseURL + '/insert', data);
};

// 아이디 중복 체크
const checkId = (data = {}) => {
  return apiClient.get(baseURL + '/checkId', { params: data });
};

// 나의 SEL 알기
const getMySEL = (data = {}) => {
  return apiClient.get(baseURL + '/mysel');
};

// 회원정보 수정
const updateUserInfo = (data = {}) => {
  return apiClient.put(baseURL + '/update', data);
};

export default {
  login,
  signup,
  checkId,
  getMySEL,
};
