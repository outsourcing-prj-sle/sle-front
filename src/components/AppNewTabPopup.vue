<template>
  <div
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
    @click.self="closePopup"
  >
    <div
      class="bg-white h-[268px] w-[488px] justify-center px-10 py-6 rounded-lg shadow-lg flex flex-col relative"
    >
      <div class="w-full text-left mt-8 font-medium text-base">
        계정을 확인알 수 없습니다.<br />뉴탭에서 계정 정보를 확인해주세요.
      </div>
      <div class="w-full mt-8">
        <button
          @click="openNewTab"
          class="w-[90px] py-2 bg-blue-500 text-white mt-4"
        >
          확인
        </button>
      </div>
      <img
        src="@/assets/img/person_regist_icn.png"
        alt="person_regist_icn"
        class="self-end max-w-full h-[128px] w-[121px] absolute bottom-0 right-1.5"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup(props, { emit }) {
    const openNewTab = () => {
      const url = 'https://newtab.itt.link';
      window.open(url, '_blank');
    };

    const closePopup = () => {
      emit('closePopup');
    };
    return {
      openNewTab,
      closePopup,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
