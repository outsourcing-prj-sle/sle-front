import axios from 'axios';
import UserService from '@/service/UserService.js';

/**
 * 웨일스페이스 인증코드 발급
 * @returns {Promise<void>}
 */
async function methods_naverLogin() {
  const redirectUri = 'http://1.213.164.252:60080/naver/callback'; // todo  << 적용
  // const redirectUri = 'http://localhost:5173/naver/callback';
  const state = 'RANDOM_STATE_STRING';
  const clientId = 'iymVHli6FerqTAKqTnNV';
  const apiUrl = `https://auth.whalespace.io/oauth2/v1.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
  const popup = window.open(apiUrl, 'NaverLogin', 'width=600,height=700');
}

/**
 * 웨일스페이스 콜백 후 token 발급 API
 * @param code
 * @param state
 * @returns {Promise<void>}
 */
async function handleNaverCallback(code, state) {
  let param = {
    code: code,
    state: state,
  };
  return await axios
    .post('/api/naver/oauth2/token', param)
    .catch(function (error) {
      console.log(error);
    });
}

export { methods_naverLogin, handleNaverCallback };
