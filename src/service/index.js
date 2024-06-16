import axios from 'axios';
import { useUserStore } from '@/store/userStore.js';
import { getActivePinia } from 'pinia';

// Pinia가 활성화될 때까지 기다리기
function getUserStore() {
  if (!getActivePinia()) {
    throw new Error('Pinia has not been initialized');
  }
  return useUserStore();
}

// Pinia가 초기화된 후에 userStore를 사용
let userStore;
try {
  userStore = getUserStore();
} catch (error) {
  console.error(error.message);
}

const apiClient = axios.create({
  // baseURL: 'https://domain/api',
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    let userStore;
    try {
      userStore = getUserStore();
    } catch (error) {
      console.error(error.message);
    }

    // userStore가 존재할 경우에만 헤더 설정
    if (userStore) {
      // config.headers.Authorization = userStore.token || 'USRCNFRM_00000000004';
      config.headers.Authorization = 'USRCNFRM_00000000004';
    }
    config.headers.role = 'ROLE_STUDENT';
    // config.headers.role = 'ROLE_TEACHER';
    config.headers.spaceInfo = 'COM1';
    config.headers.grade = '1';
    config.headers.class = '3';

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    if (error.response) {
      // 에러 응답이 존재할 경우
      const status = error.response.status;
      const errorMessage = error.response.statusText || 'An error occurred';

      // 404 에러인 경우
      if (status === 404) {
        return { data: { status: 404, error: 'Not Found' } };
      }

      // 그 외의 에러인 경우
      return { data: { status, error: errorMessage } };
    }
    // 오류 응답을 처리
    return Promise.reject(error);
  }
);

export default apiClient;
