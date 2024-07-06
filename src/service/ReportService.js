import axios from 'axios';
import { useUserStore } from '@/store/userStore.js';
import { getActivePinia } from 'pinia';

const domainMap = {
  '1.213.164.252': 'http://1.213.164.252:60080/api',
  'devgnesel.itt.link': 'http://devgnesel.itt.link:60080/api',
  localhost: 'http://localhost:5173/api',
};
const currentDomain = window.location.hostname;
const baseURL = '/reports';

// Pinia가 활성화될 때까지 기다리기
function getUserStore() {
  if (!getActivePinia()) {
    throw new Error('Pinia has not been initialized');
  }
  return useUserStore();
}

const apiClient = axios.create({
  baseURL: domainMap[currentDomain] || 'http://1.213.164.252:60080/api',
});

apiClient.defaults.headers.common['Content-Type'] = 'application/json';
apiClient.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

apiClient.interceptors.request.use(
  (config) => {
    let userStore;

    try {
      userStore = getUserStore();
    } catch (error) {
      console.error(error.message);
    }

    // 사용자 페이지 헤더 설정
    if (userStore) {
      config.headers.Authorization = userStore.token || 'USRCNFRM_00000000004';
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
