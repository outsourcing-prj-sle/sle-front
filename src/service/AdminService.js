import axios from 'axios';
import { useAdminStore } from '@/store/adminStore.js';
import { getActivePinia } from 'pinia';

const baseURL = '/admin';

// Pinia가 활성화될 때까지 기다리기
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
    let adminStore;

    try {
      adminStore = getAdminStore();
    } catch (error) {
      console.error(error.message);
    }

    // 관리자 페이지 헤더 설정
    if (adminStore) {
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
