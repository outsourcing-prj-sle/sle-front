import apiClient from './index';
const baseURL = '/reports';

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
import ReportService from '@/service/ReportService.js';

// todo : api - 회원가입
const signupResponse = await ReportService.checkId({
id: username,
});
const resData = signupResponse.data;

if (resData.error) {
alert(resData.error);
return;
}
 */

// 메인페이지 설문 목록 확인
const reportMainList = (data = {}) => {
  return apiClient.get(baseURL + '/status');
};

// 설문 시작 시 호출
const reportStart = (data = {}) => {
  return apiClient.put(baseURL + '/start', data);
};

// 설문 안내 시 호출
const reportNotice = (data = {}) => {
  return apiClient.get(baseURL + '/notice', { params: data });
};

// 설문 완료 시 호출
const reportComplete = (data = {}) => {
  return apiClient.put(baseURL + '/complete', data);
};

// 설문 중간 저장 시 호출
const reportSave = (data = {}) => {
  return apiClient.put(baseURL + '/save', data);
};

// MySEL 알기 목록 조회
const mysel = (data = {}) => {
  return apiClient.get(baseURL + '/mysel', data);
};

export default {
  reportMainList,
  reportStart,
  reportNotice,
  mysel,
  reportComplete,
  reportSave,
};
