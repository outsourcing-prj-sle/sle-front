<template>
  <svg id="badge" xmlns="http://www.w3.org/2000/svg" width="417" height="468">
    <image v-if="face" :href="face" height="100%" width="100%" />
    <image v-if="eyes" :href="eyes" height="100%" width="100%" />
    <image v-if="mouth" :href="mouth" height="100%" width="100%" />
  </svg>
</template>

<script>
import { computed } from 'vue';
export default {
  props: {
    face: {
      type: [String, Object],
      default: require('@/assets/img/6q1.png'),
    },
    eyes: {
      type: [String, Object],
      default: null,
    },
    mouth: { type: [String, Object], default: null },
  },
  setup(props, { emit }) {
    const emitASDF = () => {
      emit('emitASDF');
    };
    return {};
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
