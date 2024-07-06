<template>
  <button
    class="border rounded-[10px] px-3 py-2 text-sm font-semibold"
    :style="{
      ...width,
      ...ellipsis,
    }"
    :class="styleClass"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>

<script>
import { computed } from 'vue';
export default {
  props: {
    _width: {
      type: Number,
    },
    text: {
      type: String,
    },
    isWhite: {
      type: Boolean,
      default: false,
    },
    isGray: {
      type: Boolean,
      default: false,
    },
    isEllipsis: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const styleClass = computed(() => {
      const style = {
        'bg-white text-[#2F80ED] border-[#2F80ED]':
          props.isWhite && !props.isGray,
        'bg-[#2F80ED] text-white border-[#2F80ED]':
          !props.isWhite && !props.isGray,
        'bg-white text-black border-gray-300': props.isGray && !props.isGray,
      };
      return style;
    });
    const width = computed(() => {
      const result = {};
      if (props._width) result.width = props._width + 'px';
      return result;
    });
    const ellipsis = computed(() => {
      const result = {};
      if (props.isEllipsis)
        result['overflow-hidden overflow-ellipsis whitespace-nowrap'] = true;
      return result;
    });
    const onClick = () => {
      emit('onClick');
    };
    return {
      styleClass,
      width,
      ellipsis,
      onClick,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
