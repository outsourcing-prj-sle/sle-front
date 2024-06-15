import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'https://domain/api',
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // const currentUserId =
    // config.headers.Authorization = currentUserId
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 오류 응답을 처리
    return Promise.reject(error);
  }
);

export default apiClient;
