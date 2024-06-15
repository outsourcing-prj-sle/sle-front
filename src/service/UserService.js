import apiClient from './index';

/**
 * 예제
 * export const getAPI = (data = {}) => {
 * return apiClient.get('asdf', {params: data})
 * }
 * export const postAPI = (data = {}) => {
 * return apiClient.post('asdf', data)
 * }
 */

const login = (data = {}) => {
  return apiClient.get('/users', data);
};

const signup = (data = {}) => {
  return apiClient.post('/signup', data);
};

export default {
  login,
  signup,
};
