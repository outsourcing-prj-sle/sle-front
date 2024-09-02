<template>
  <div>Redirecting...</div>
</template>

<script>
export default {
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = 'naverLogin';
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      window.opener.postMessage({ type, code, state }, window.location.origin);
      // window.opener.postMessage(
      //   { type, code, state },
      //   process.env.VUE_APP_PRODUCTION === 'live' ? process.env.VUE_APP_REDIRECT_URI_LIVE :
      //   (process.env.VUE_APP_PRODUCTION === 'inner' ? process.env.VUE_APP_REDIRECT_URI_INNER_DEV :
      //   (
      //     process.env.VUE_APP_PRODUCTION === 'outer' ? process.env.VUE_APP_REDIRECT_URI_OUTER_DEV : process.env.VUE_APP_REDIRECT_URI_LOCAL
      //   ))
      // );
      window.close();
    }
  },
};
</script>
