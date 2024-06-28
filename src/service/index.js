import axios from 'axios';
import { useUserStore } from '@/store/userStore.js';
import { useAdminStore } from '@/store/adminStore.js';
import { getActivePinia } from 'pinia';

// Pinia가 활성화될 때까지 기다리기
function getUserStore() {
  if (!getActivePinia()) {
    throw new Error('Pinia has not been initialized');
  }
  return useUserStore();
}

function getAdminStore() {
  if (!getActivePinia()) {
    throw new Error('Pinia has not been initialized');
  }
  return useAdminStore();
}

const apiClient = axios.create({
  baseURL:
    process.env.VUE_APP_PRODUCTION === 'live'
      ? 'http://1.213.164.252:60080/api'
      : 'http://localhost:5173/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const url = config.url;
    let userStore;
    let adminStore;
    try {
      userStore = getUserStore();
    } catch (error) {
      console.error(error.message);
    }

    try {
      adminStore = getAdminStore();
    } catch (error) {
      console.error(error.message);
    }

    // 사용자 페이지 헤더 설정
    if (
      (url.startsWith('/api/users') || url.startsWith('/api/reports')) &&
      userStore
    ) {
      config.headers.Authorization = userStore.token || 'USRCNFRM_00000000004';
    }

    // 관리자 페이지 헤더 설정
    if (url.startsWith('/api/admin') && adminStore) {
      config.headers.Authorization = adminStore.token || 'USRCNFRM_00000000004';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
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
