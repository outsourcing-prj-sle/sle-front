<template>
  <section
    class="flex flex-col items-center px-20 mt-11 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
  >
    <header
      class="self-stretch text-xl font-bold text-blue-500 max-md:max-w-full"
    >
      마음알기 설문1
    </header>
    <div
      class="flex gap-5 self-stretch mt-5 max-md:flex-wrap max-md:max-w-full"
    >
      <h2 class="flex-auto text-2xl font-bold text-neutral-700">
        나의 SEL 알기
      </h2>
      <span
        class="flex-auto self-start text-base font-medium leading-8 text-black"
      >
        기간 : YYYY년 MM월 DD일 ~ MM월 DD일
      </span>
    </div>
    <div class="flex gap-4 mt-6 ml-36 text-base font-medium text-neutral-700">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9dd9fe252463f59eab715c00458d8a8e4bbf55a919cb8668ea06ace79c0142d?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
        alt="Survey illustration"
        class="shrink-0 max-w-full aspect-[0.99] w-[127px]"
      />
      <div
        class="relative flex flex-col gap-2.5 px-9 py-6 my-auto border border-solid aspect-[2.59] border-neutral-300 fill-white stroke-[1px] stroke-neutral-300 max-md:px-5"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5dc5512d2a93088a0a29e4d91010c45c3ab1f4f445c234bc2e9a3728237662dd?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
          alt=""
          class="object-cover absolute inset-0 size-full"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/288e9610cd60c9235ff4925a093a406a432933347bf48e9106aa8d73a8b7c6c4?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
          alt="info icon"
          class="shrink-0 self-start aspect-square w-[18px]"
        />
        <p class="relative">1개의 답안을 선택해<br />주세요.</p>
      </div>
    </div>
    <div
      class="flex gap-5 justify-between mt-12 max-w-full w-[690px] max-md:flex-wrap max-md:mt-10"
    >
      <div class="flex flex-col">
        <div
          class="flex flex-col justify-center p-2 rounded-3xl border border-blue-400 border-solid"
        >
          <div class="shrink-0 w-8 h-8 bg-blue-400 rounded-2xl"></div>
        </div>
        <span class="self-center mt-4 text-base text-center text-black">1</span>
      </div>
      <div
        class="flex flex-col px-2 pt-2 text-base text-center text-black whitespace-nowrap"
      >
        <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
        <span class="mt-6">2</span>
      </div>
      <div
        class="flex flex-col px-2 pt-2 text-base text-center text-black whitespace-nowrap"
      >
        <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
        <span class="mt-6">3</span>
      </div>
      <div
        class="flex flex-col px-2 pt-2 text-base text-center text-black whitespace-nowrap"
      >
        <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
        <span class="mt-6">4</span>
      </div>
      <div
        class="flex flex-col px-2 pt-2 text-base text-center text-black whitespace-nowrap"
      >
        <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
        <span class="mt-6">5</span>
      </div>
      <div
        class="flex flex-col px-2 pt-2 text-base text-center text-black whitespace-nowrap"
      >
        <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
        <span class="mt-6">6</span>
      </div>
    </div>
    <p
      class="self-start mt-4 ml-3.5 text-base font-medium leading-6 text-neutral-700 max-md:ml-2.5"
    >
      자동저장되어 이어서 진행할 수 있습니다.
    </p>
    <div
      class="flex gap-0 mt-4 w-full text-base font-bold text-cyan-900 max-w-[1255px] max-md:flex-wrap max-md:max-w-full"
    >
      <div class="justify-center p-2.5 whitespace-nowrap bg-indigo-50">
        순번
      </div>
      <div
        class="justify-center items-center p-2.5 bg-indigo-50 max-md:px-5 max-md:max-w-full"
      >
        <span class="text-red-600">*</span>는 필수 응답 문항입니다.
      </div>
      <div class="justify-center p-2.5 text-center bg-blue-100">
        절대로<br />바꿀 수 없어요
      </div>
      <div class="justify-center p-2.5 text-center bg-blue-100">
        약간<br />바꿀 수 있어요
      </div>
      <div class="justify-center p-2.5 text-center bg-blue-100">
        어느 정도<br />바꿀 수 있어요
      </div>
      <div class="justify-center p-2.5 text-center bg-blue-100">
        대체로<br />바꿀 수 있어요
      </div>
      <div class="justify-center p-2.5 text-center bg-blue-100">
        완전히<br />바꿀 수 있어요
      </div>
    </div>
    <div
      class="px-7 py-7 max-w-full border-b border-solid border-stone-200 w-[1255px] max-md:px-5"
    >
      <div class="flex gap-5 max-md:flex-col max-md:gap-0">
        <div class="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div
            class="flex grow gap-5 justify-between text-base font-medium max-md:flex-wrap max-md:mt-10"
          >
            <span class="my-auto leading-[150%] text-neutral-700">1</span>
            <label for="schoolParticipant" class="leading-6 text-red-600"
              >학교에서 단짝친구 외에 다른 친구와<br />활동이나 놀이를
              해보도록<br />바꿀 수 있나요?
              <span class="text-red-600">*</span></label
            >
          </div>
        </div>
        <div class="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div
            class="flex gap-5 justify-between self-stretch my-auto max-md:flex-wrap max-md:mt-10 max-md:max-w-full"
          >
            <div
              class="flex flex-col justify-center p-1.5 border border-solid border-neutral-400 rounded-[999px]"
            >
              <div class="shrink-0 w-3 h-3 bg-blue-400 rounded-[999px]"></div>
            </div>
            <div
              class="shrink-0 p-1.5 w-6 h-6 border border-solid border-neutral-400 rounded-[999px]"
            ></div>
            <div
              class="shrink-0 p-1.5 w-6 h-6 border border-solid border-neutral-400 rounded-[999px]"
            ></div>
            <div
              class="shrink-0 p-1.5 w-6 h-6 border border-solid border-neutral-400 rounded-[999px]"
            ></div>
            <div
              class="shrink-0 p-1.5 w-6 h-6 border border-solid border-neutral-400 rounded-[999px]"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <footer
      class="flex gap-5 justify-between mt-72 w-full text-base text-center text-white whitespace-nowrap max-w-[1252px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full"
    >
      <div class="my-auto">임시저장</div>
      <div class="flex gap-5 justify-between">
        <button
          class="justify-center px-10 py-3 rounded-3xl bg-neutral-400 max-md:px-5"
        >
          이전
        </button>
        <button
          class="justify-center px-11 py-3 bg-blue-500 rounded-3xl max-md:px-5"
        >
          다음
        </button>
      </div>
    </footer>
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';

export default {
  name: 'LoginView',
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const userId = computed(() => userStore.id);
    const type = ref(route.params.type || 1);
    const title = ref('');
    const date = ref('YYYY년 MM월 DD일 ~ MM월 DD일');

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      // todo : 설문 문제 확인 api호출. with type, 만약 필요하면 userId
      title.value = '마음알기 설문1';
      date.value = 'YYYY년 MM월 DD일 ~ MM월 DD일';
    };

    const startReport = () => {
      router.push({
        path: '/report/question',
        params: { type: type.value },
        // query: { plan: 'private' }
      });
    };

    return {
      title,
      date,
      type,
      startReport,
    };
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
input:checked + div div {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity));
}
</style>
