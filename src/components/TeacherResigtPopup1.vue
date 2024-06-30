<template>
  <div class="flex flex-col flex-1 text-base font-medium">
    <span class="text-left mt-10" v-html="hello_teacher"> </span>
    <button
      @click="openWhaleProfile"
      class="w-[192px] py-2 bg-blue-500 text-white mt-4"
    >
      {{ $t('login_popup.hello_btn') }}
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    userInfo: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    const hello_teacher = computed(() => {
      return t('login_popup.hello_teacher').replace(
        '__userInfo__',
        `<span class="text-blue-400">${props.userInfo}</span>`
      );
    });

    const openWhaleProfile = () => {
      emit('openWhaleProfile');
    };
    return { openWhaleProfile, hello_teacher };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
