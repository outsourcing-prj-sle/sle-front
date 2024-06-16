import apiClient from './index';

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
 * const signupResponse = await UserService.checkId({
 * id: username,
 * });
 * const resData = signupResponse.data;
 *
 * if (resData.error) {
 * alert(resData.error);
 * return;
 * }
 */

const login = (data = {}) => {
  return apiClient.get('/users', data);
};

export default {
  login,
};
