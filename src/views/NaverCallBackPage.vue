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
      window.opener.postMessage(
        { type, code, state },
        'http://devgnesel.itt.link:60080'
      );
      window.close();
    }
  },
};
</script>
