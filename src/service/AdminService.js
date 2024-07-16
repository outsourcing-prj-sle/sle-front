import axios from 'axios';
import { useAdminStore } from '@/store/adminStore.js';
import { getActivePinia } from 'pinia';

const fullUrl = window.location.href;
const url = new URL(fullUrl);
const domain = url.origin;
const apiDomain = domain + '/api';
const baseURL = '/admin';

// Pinia가 활성화될 때까지 기다리기
function getAdminStore() {
  if (!getActivePinia()) {
    throw new Error('Pinia has not been initialized');
  }
  return useAdminStore();
}

const apiClient = axios.create({
  baseURL: apiDomain,
});

apiClient.defaults.headers.common['Content-Type'] = 'application/json';
apiClient.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

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
      config.headers.Authorization = adminStore.token || 'sel_00000004';
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

const login = (
  data = {
    id: 'userid',
    password: 'password',
  }
) => {
  return apiClient.post(baseURL + '/login', data);
};

// 유저 관련

// 내정보 조회
const myInfo = (data = {}) => {
  return apiClient.get(baseURL + '/users');
};

// 유저 정보 조회
const userInfo = (id) => {
  return apiClient.get(baseURL + '/users/admin/' + id);
};

// 유저 정보 조회
const userInfoTeacherStudent = (id) => {
  return apiClient.get(baseURL + '/users/teacher/' + id);
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
const signup = (
  data = {
    id: 'id',
    name: 'name',
    password: 'password',
    userRole: 'SuperAdmin',
    phoneNumber: '000-0000-0000',
    userEmail: 'admin001@gne.co.kr',
    userSpaceOrgInfo: '경남교육청',
    uniqId: '',
  }
) => {
  return apiClient.put(baseURL + '/users/admin/register', data);
};

// school 회원 등록/수정
const signupSchool = (
  data = {
    id: 'id',
    name: 'name',
    password: 'password',
    userRole: 'SuperAdmin',
    phoneNumber: '000-0000-0000',
    userEmail: 'admin001@gne.co.kr',
    userSpaceOrgInfo: '경남교육청',
    uniqId: '',
  }
) => {
  return apiClient.put(baseURL + '/users/school/register', data);
};

// 아이디 중복 체크
const checkId = (
  data = {
    id: 'id',
  }
) => {
  return apiClient.get(baseURL + '/users/checkId', { params: data });
};

// 유저 리스트 조회(권한별) (OgzAdmin, SuperAdmin, SchoolAdmin)→Admin, OfficeOfEdu, Student, Teacher, NormalUser
// 특정 컬럼 검색 시 DATA에 넣어서 호출. data를 보내지 않으면 전체 조회
const userManagement = (
  role,
  data = {
    startDate: '2024-08-13',
    endDate: '2024-08-13',
    id: 'id',
    uniqId: 'uniqId',
    userSpaceOrgInfo: '경남',
    name: 'name',
    userEmail: 'admin001',
  }
) => {
  return apiClient.get(baseURL + '/users/' + role, { params: data });
};

// 유저 삭제
const userDelete = (id) => {
  return apiClient.delete(baseURL + '/users/admin/' + id);
};

// 회원정보 수정 // 아직
const updateUserInfo = (
  data = {
    id: 'id',
    name: 'name',
    password: 'password',
    userRole: 'SuperAdmin',
    phoneNumber: '000-0000-0000',
    userEmail: 'admin001@gne.co.kr',
    userSpaceOrgInfo: '경남교육청',
  }
) => {
  return apiClient.put(baseURL + '/users/update', data);
};

// 각종 시스템 관리 등록
const insertSystem = (entity, data = {}) => {
  return apiClient.post(baseURL + '/system/' + entity + '/register', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
/*
Terms
{
	"termsId": "terms_001",
	"studentTerms": "Student terms content 1",
	"staffTerms": "Staff terms content 1",
	"effectiveDate": "2024-06-28 22:22:33",
	"createdBy": "자기자신 uniqId"
}
site
{
	"siteId": "site_001",
	"siteName": "Site One",
	"siteDomain": "https://www.siteone.com",
	"topLogoImage": "top_logo_1.png",
	"bottomLogoImage": "bottom_logo_1.png",
	"mainImage": "main_image_1.png",
	"siteDescription": "Description for site one",
	"mouseSecurity": 1,
	"keyboardSecurity": 1,
}
  code
{
	"codeId": "code_001",
	"categoryCode": "cat",
	"codeName": "Code One",
	"codeDescription": "Description for code one",
	"active": 1,
	"createdBy": "자기자신 uniqId"
}
  ip
{
	"allowedIp": "192.168.0.1",
	"adminId": "sel_00000001",
	"active": 1,
	"createdBy": "자기자신 uniqId"
}
*/
// 시스템 정보 업데이트 (data 위와 같음)
const updateSystem = (entity, data = {}) => {
  return apiClient.put(baseURL + '/system/' + entity + '/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 시스템 정보 삭제
const deleteSystem = (entity, id) => {
  return apiClient.delete(baseURL + '/system/' + entity + '/' + id);
};

// 시스템 정보 조회
const systemInfo = (entity, id) => {
  return apiClient.get(baseURL + '/system/' + entity + '/' + id);
};

// 시스템 정보 전체 조회 (공통 코드 한정 검색 가능)
const systemInfoList = (entity, data = {}) => {
  return apiClient.get(baseURL + '/system/' + entity, { params: data });
};

// 시스템 정보 중복 조회
const checkSystemExist = (
  entity,
  data = {
    url: 'www.google.com',
    id: 'id',
  }
) => {
  return apiClient.get(baseURL + '/system/' + entity + '/check/', {
    params: data,
  });
};

// 공통코드 하위 코드 관리

//하위 코드 등록
const insertSubCode = (
  codeId,
  data = {
    codeId: 'code_001',
    subCodeId: 'sub_code_001',
    subCodeName: 'Sub Code One',
    codeDescription: 'Description for code one',
    active: 1,
    createdBy: 'sel_00000001',
  }
) => {
  return apiClient.post(
    baseURL + '/system/cmmn_code/' + codeId + '/sub_code_register',
    data
  );
};

const updateSubCode = (
  codeId,
  data = {
    codeId: 'code_001',
    subCodeId: 'sub_code_001',
    subCodeName: 'Sub Code One',
    codeDescription: 'Description for code one',
    active: 0,
    createdBy: 'sel_00000001',
  }
) => {
  return apiClient.put(
    baseURL + '/system/cmmn_code/' + codeId + '/sub_code_update',
    data
  );
};

const subCodeInfo = (codeId, subCodeId) => {
  return apiClient.get(
    baseURL + '/system/cmmn_code/' + codeId + '/' + subCodeId
  );
};

const subCodeInfoList = (
  codeId,
  data = {
    subCodeId: 'code001',
    subCodeName: 'school',
  }
) => {
  return apiClient.get(baseURL + '/system/cmmn_code/' + codeId + '/sub_codes', {
    params: data,
  });
};

const deleteSubCode = (codeId, subCodeId) => {
  return apiClient.delete(
    baseURL + '/system/cmmn_code/' + codeId + '/' + subCodeId
  );
};

const getLog = (data = {}) => {
  return apiClient.get(baseURL + '/system/log', { params: data });
};

const getUsers = (id, data = {}) => {
  return apiClient.get(baseURL + `/users/${id}`, { params: data });
};

export default {
  login,
  myInfo,
  userInfo,
  signup,
  checkId,
  userManagement,
  userDelete,
  updateUserInfo,
  insertSystem,
  updateSystem,
  deleteSystem,
  myInfoInterval,
  systemInfo,
  systemInfoList,
  insertSubCode,
  updateSubCode,
  subCodeInfo,
  subCodeInfoList,
  deleteSubCode,
  checkSystemExist,
  getLog,
  getUsers,
  userInfoTeacherStudent,
};
