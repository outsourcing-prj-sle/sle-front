<template>
  <div
    class="flex flex-col flex-1 text-base font-medium justify-between h-full"
  >
    <span class="text-left mt-20" v-html="$t('login_popup.fin_teacher')">
    </span>
    <div class="w-full">
      <button
        @click="finRegist"
        class="w-[90px] py-2 bg-blue-500 text-white mt-4"
      >
        {{ $t('login_popup.submit_btn') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const finRegist = () => {
      emit('finRegist');
    };
    return { finRegist };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
