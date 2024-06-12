<template>
  <div
    class="flex flex-col px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
  >
    <section class="flex gap-5 max-md:flex-wrap max-md:max-w-full">
      <div class="flex flex-col font-bold">
        <h1 class="text-xl text-blue-500">{{ title }}</h1>
        <h2 class="mt-2 text-2xl text-neutral-700 text-left">마무리</h2>
      </div>
      <p
        class="flex-auto self-end mt-9 text-base font-medium leading-8 text-right text-black"
      >
        기간 : {{ date }}
      </p>
    </section>
    <div class="text-2xl text-neutral-700 font-bold mt-4">
      짝짝짝! 모든 활동이 끝났어요.<br />다른 활동도 참여해볼까요?
    </div>
    <div class="w-full mt-10 flex justify-center">
      <img
        src="@/assets/img/reportfinchar.png"
        alt="reportfinchar"
        class="h-[300px] aspect-[1]"
      />
    </div>
    <button
      class="justify-center self-end px-10 py-2 mt-20 text-base text-center text-white whitespace-nowrap bg-blue-500 rounded-3xl max-md:px-5 max-md:mt-10"
      tabindex="0"
      @click="goMain"
    >
      완료
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = ref(route.query.username || '마음알기 설문1');
    const date = ref(route.query.date || 'YYYY년 MM월 DD일 ~ MM월 DD일');

    const goMain = () => {
      router.push({ name: 'home' });
    };

    return {
      title,
      date,
      goMain,
    };
  },
};
</script>

<style scoped>
/* 필요한 경우 추가적인 스타일을 여기에 추가할 수 있습니다 */
</style>
