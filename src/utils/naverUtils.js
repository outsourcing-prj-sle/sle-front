import axios from 'axios';

/**
 * 웨일스페이스 인증코드 발급
 * @returns {Promise<void>}
 */
async function methods_naverLogin() {
  const redirectUri = 'http://1.213.164.252:60080/naver/callback';
  const state = 'RANDOM_STATE_STRING';
  const clientId = 'iymVHli6FerqTAKqTnNV';
  const apiUrl = `https://auth.whalespace.io/oauth2/v1.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
  const popup = window.open(apiUrl, 'NaverLogin', 'width=600,height=700');

  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) {
      return;
    }
    const { type, code, state } = event.data;
    if (type === 'naverLogin') {
      if (code && state) {
        this.handleNaverCallback(code, state);
      }
    }
  });
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
  await axios
    .post('/api/naver/oauth2/token', param)
    .then(async function (response) {
      var data = response.data;
      if (data.code === 'S000') {
        alert('연동 되었습니다.');
      } else {
        console.log(response);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export { methods_naverLogin, handleNaverCallback };
