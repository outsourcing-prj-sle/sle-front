<template>
  <div class="relative inline-block text-left">
    <div class="w-full">
      <button
        @click="toggleDropdown"
        class="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        {{ selectedOption || '선택' }}
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div
      v-if="isOpen"
      class="origin-top-right w-56 absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      :class="{
        'left-0': openWay === 'left',
        'w-full': openFull,
      }"
    >
      <div class="py-1 max-h-48 overflow-y-auto">
        <a
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
        >
          {{ option }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'AppDropdown',
  props: {
    options: {
      type: Array,
      required: true,
    },
    startText: {
      type: String,
    },
    updateText: {
      type: String,
    },
    openWay: {
      type: String,
      default: 'right',
    },
    openFull: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const selectedOption = ref(props.startText || null);

    watch(
      () => [props.updateText],
      ([t]) => {
        selectOption(t);
      }
    );

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (option) => {
      selectedOption.value = option;
      isOpen.value = false;
      emit('update:selectedOption', option);
    };

    return {
      isOpen,
      selectedOption,
      toggleDropdown,
      selectOption,
    };
  },
};
</script>
