import axios from 'axios';
import { useIDStore } from '@/store/IDStore.js';
import { getActivePinia } from 'pinia';

const domainMap = {
  '1.213.164.252': 'http://1.213.164.252:60080/api',
  'devgnesel.itt.link': 'http://devgnesel.itt.link:60080/api',
  localhost: 'http://localhost:5173/api',
};
const currentDomain = window.location.hostname;
const baseURL = '/id-admin';

// Pinia가 활성화될 때까지 기다리기
function getIDStore() {
  if (!getActivePinia()) {
    throw new Error('Pinia has not been initialized');
  }
  return useIDStore();
}

const apiClient = axios.create({
  baseURL: domainMap[currentDomain] || 'http://1.213.164.252:60080/api',
});

apiClient.defaults.headers.common['Content-Type'] = 'application/json';
apiClient.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

apiClient.interceptors.request.use(
  (config) => {
    let IDStore;

    try {
      IDStore = getIDStore();
    } catch (error) {
      console.error(error.message);
    }

    // 관리자 페이지 헤더 설정
    if (IDStore) {
      config.headers.Authorization = IDStore.token || 'USRCNFRM_00000000001';
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
  return apiClient.post(baseURL + '/login', data);
};

// 연구소 관리자 목록 조회
const getResearchAdmin = (data = {}) => {
  return apiClient.get(baseURL + '/users', { params: data });
};

// 연구소 관리자 등록
const insertResearchAdmin = (data = {}) => {
  return apiClient.put(baseURL + '/users', data);
};

// 연구소 관리자 수정
const updateResearchAdmin = (uriParam, data = {}) => {
  return apiClient.put(baseURL + `/users/${uriParam}`, data);
};

// 연구소 관리자 삭제
const deleteResearchAdmin = (uriParam, data = {}) => {
  return apiClient.delete(baseURL + `/users/${uriParam}`, data);
};

// ID톡톡 관리 목록 조회
const getIdtt = (uriParam, data = {}) => {
  return apiClient.get(baseURL + `/idtt/${uriParam}`, { params: data });
};

// 설문관리 목록 조회
const getReports = (data = {}) => {
  return apiClient.get(baseURL + '/reports', { params: data });
};

// 설문관리 상세 조회
const getReportsDtl = (uriParam, data = {}) => {
  return apiClient.get(baseURL + `/reports/${uriParam}`, { params: data });
};

// 설문관리 설문 수정
const updateReports = (uriParam, data = {}) => {
  return apiClient.put(baseURL + `/reports/target/${uriParam}`, data);
};

// 학교급, 학년 목록 조회
const getSchulGradeInfo = (data = {}) => {
  return apiClient.get(baseURL + '/schulGradeCode', { params: data });
};

// 학교 목록 조회
const getSchulInfo = (data = {}) => {
  return apiClient.get(baseURL + '/schulCode', { params: data });
};

export default {
  login,
  getResearchAdmin,
  insertResearchAdmin,
  updateResearchAdmin,
  deleteResearchAdmin,
  getIdtt,
  getReports,
  getReportsDtl,
  updateReports,
  getSchulGradeInfo,
  getSchulInfo,
};
