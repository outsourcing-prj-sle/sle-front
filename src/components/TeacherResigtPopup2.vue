<template>
  <div
    class="flex flex-col flex-1 text-base font-medium justify-between h-full"
  >
    <span class="text-left mt-20">
      회원 정보는 내 정보에서 재수정이 가능하니<br />
      너무 걱정마세요!<br /><br />
      이제 SEL 사회정서학습 입장을 시작해 볼까요?
    </span>
    <div class="w-full">
      <button
        @click="finRegist"
        class="w-[90px] py-2 bg-blue-500 text-white mt-4"
      >
        확인
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
