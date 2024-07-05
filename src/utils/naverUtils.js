import axios from 'axios';
import UserService from '@/service/UserService.js';

/**
 * 웨일스페이스 인증코드 발급
 * @returns {Promise<void>}
 */
async function methods_naverLogin() {
  // const redirectUri =
  //   process.env.VUE_APP_PRODUCTION === 'live'
  //     ? process.env.VUE_APP_REDIRECT_URI
  //     : 'http://localhost:5173/naver/callback';
  const redirectUri = `${window.location.origin}/naver/callback`;
  const state = process.env.VUE_APP_STATE;
  const clientId = process.env.VUE_APP_CLIENT_ID;

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

function logoutWhalespace() {
  const redirectUri = `${window.location.origin}/naver/callback`;
  const state = process.env.VUE_APP_STATE;
  const clientId = process.env.VUE_APP_CLIENT_ID;

  const apiUrl = `https://auth.whalespace.io/logout?response_type=code&client_id=${clientId}&state=${state}`;
  const popup = window.open(apiUrl, 'NaverLogin', 'width=600,height=700');
  setTimeout(() => {
    popup.close();
  }, 500);
}

export { methods_naverLogin, handleNaverCallback, logoutWhalespace };
