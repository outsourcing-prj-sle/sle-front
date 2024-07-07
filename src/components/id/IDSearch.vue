<template>
  <div
    class="input-keyword border border-gray-300 pl-4 pr-10 py-2 text-sm rounded-md"
    :class="styleClass"
  >
    <input
      type="text"
      class="w-full"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  props: {
    keyword: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    _width: {
      type: Number,
      default: 1000,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    console.log(props);

    const styleClass = computed(() => {
      const style = {};

      if (props._width) style[`w-[${props._width}px]`] = true;

      return style;
    });

    const updateValue = (event) => {
      emit('update:modelValue', event.target.value);
    };

    return {
      styleClass,
      updateValue,
    };
  },
};
</script>

<style>
.input-keyword::after {
  content: '';
  background-image: url('../../assets/img/ico-search.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 50px;
  cursor: pointer;
}
</style>
