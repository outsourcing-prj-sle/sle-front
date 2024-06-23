<template>
  <div class="flex flex-col flex-1 text-base font-medium">
    <span class="text-left mt-10">
      안녕하세요!<br />
      SEL 사회정서학습에 오신 여러분 반갑습니다.<br />
      SEL 사회정서학습에 입장하기 앞서, 자신의 정보를 선택해주세요.<br />
      최초 1회만 참여해주시면 됩니다.<br />
      <span class="text-blue-400">{{ userInfo }}</span
      >이 맞습니까?<br />
      회원 정보와 다르다면 아래의 버튼을 눌러 수정해주세요.<br />
    </span>
    <button
      @click="openWhaleProfile"
      class="w-[192px] py-2 bg-blue-500 text-white mt-4"
    >
      회원정보 수정하기
    </button>
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
    const openWhaleProfile = () => {
      emit('openWhaleProfile');
    };
    return { openWhaleProfile };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
