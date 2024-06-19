<template>
  <div
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
  >
    <div class="bg-white h-[428px] w-[488px] p-6 rounded-lg shadow-lg">
      <div
        class="flex flex-col pr-4 pl-12 mt-3 w-full font-medium max-md:pl-5 max-md:max-w-full"
      >
        <div class="flex gap-5 text-base max-md:flex-wrap">
          <p class="flex-auto text-blue-500">
            안녕하세요!<br />
            SEL 사회정서분석에 오신 여러분 반갑습니다.<br />
            사회정서분석에 입장하기 앞서, 자신의 정보를 선택해주세요.<br />
            최초 1회만 참여해주시면 됩니다.<br /><span class="text-blue-500"
              >이작초등학교 1학년 2반 홍길동</span
            >이 맞습니까?<br />
            회원 정보와 다르다면 아래의 버튼을 눌러 수정해주세요.
          </p>
          <nav
            class="flex justify-center items-center self-end px-4 mt-20 text-white whitespace-nowrap bg-blue-200 rounded-full h-[34px] w-[34px] max-md:mt-10"
          >
            <a href="#" aria-label="Next Page" tabindex="0">&gt;</a>
          </nav>
        </div>
        <div class="self-end text-xs text-blue-500">다음</div>
      </div>

      <form
        class="self-center px-px mt-4 w-full max-w-[423px] max-md:max-w-full"
        aria-labelledby="update-info"
      >
        <fieldset class="flex gap-5 max-md:flex-col max-md:gap-0">
          <legend id="update-info" class="sr-only">Update Information</legend>
          <div class="flex flex-col w-[61%] max-md:ml-0 max-md:w-full">
            <button
              class="justify-center px-11 py-3 w-full text-base font-medium text-white bg-blue-500 max-md:px-5 max-md:mt-10"
              type="submit"
            >
              회원정보 수정하기
            </button>
          </div>
          <aside
            class="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full"
          ></aside>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/store/userStore.js';

export default {
  props: {},
  setup(props, { emit }) {
    const userStore = useUserStore();
    const loginType = computed(() => userStore.type);

    const closePopup = () => {
      emit('closePopup');
    };

    const openNewTab = () => {
      const url = 'https://account.whalespace.io/s/profile';
      window.open(url, '_blank');
    };

    return { closePopup, openNewTab };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
