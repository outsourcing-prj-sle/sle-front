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

// 내정보 조회
const myInfo = (data = {}) => {
  return apiClient.get(baseURL, data);
};

// 내정보 서버 업데이트
const myInfoInterval = () => {
  let cnt = 20;
  const myInterval = setInterval(() => {
    if (!cnt) clearInterval(myInterval);
    cnt--;
    myInfo();
  }, 1000 * 60);
};

// 회원가입
const signup = (data = {}) => {
  return apiClient.put(baseURL + '/insert', data);
};

// 아이디 중복 체크
const checkId = (data = {}) => {
  return apiClient.get(baseURL + '/checkId', { params: data });
};

// 나의 SEL 알기 (교사, 학생)
const getMySEL = (data = {}) => {
  return apiClient.get(baseURL + '/mysel');
};

const userIDTT = (data = {}) => {
  return apiClient.get(baseURL + '/idTokTok', { params: data });
};

// 회원정보 수정
const updateUserInfo = (data = {}) => {
  return apiClient.put(baseURL + '/update', data);
};

// AI분석 의견조사 결과 등록
const insertReseachResult = (data = {}) => {
  return apiClient.put(baseURL + '/research', data);
};

export default {
  login,
  myInfo,
  signup,
  checkId,
  getMySEL,
  userIDTT,
  updateUserInfo,
  insertReseachResult,
  myInfoInterval,
};
