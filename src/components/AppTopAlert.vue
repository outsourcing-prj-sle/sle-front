<template>
  <div
    class="top-5 fixed py-1 px-2 opacity-60 rounded-md z-50 bg-black text-white"
    style="left: 50%; transform: translateX(-50%)"
    v-if="showAlert && text"
  >
    {{ text }}
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    showAlert: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {};
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
