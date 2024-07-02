<template>
  <button
    class="border border-[#2F80ED] rounded-[10px] px-3 py-2 text-sm font-semibold"
    :class="{
      'bg-white text-[#2F80ED]': isWhite,
      'bg-[#2F80ED] text-white': !isWhite,
      width,
    }"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
    },
    text: {
      type: String,
    },
    isWhite: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const onClick = () => {
      emit('onClick');
    };
    return {
      onClick,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
