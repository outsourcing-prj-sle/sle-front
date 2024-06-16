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

export default {
  reportMainList,
};
