<template>
  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
  >
    <div
      class="flex gap-1 items-start self-stretch max-md:flex-wrap max-md:max-w-full"
    >
      <div class="flex flex-col self-start font-bold min-w-[150px]">
        <h1 class="text-xl text-blue-500 text-left">{{ title }}</h1>
        <h2 class="mt-1 text-2xl text-neutral-700 text-left">안내사항</h2>
        <img
          src="@/assets/img/minichar2.png"
          alt="minichar"
          class="self-center mt-4 aspect-[1.08] w-[114px]"
        />
      </div>
      <article
        class="flex flex-col grow shrink-0 self-end mt-9 font-medium text-black basis-0 w-fit max-md:max-w-full"
      >
        <div class="self-end text-base leading-8">
          기간 : YYYY년 MM월 DD일 ~ MM월 DD일
        </div>
        <section
          class="justify-center items-start px-9 py-6 text-left text-base leading-8 rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:mt-10 max-md:max-w-full"
        >
          다음 지시를 따라 주시기 바랍니다.<br />이 화면에는 학생들의 생각, 감정
          그리고 행동을 나타내는 문장들이 있습니다. 각 문장을 주의 깊게 읽고 1,
          2, 3, 4 보기 중 하나를 선택해주세요.<br /><br />&lt;보기&gt;<br />1번:
          나에 대한 설명이나 나의 감정이 전혀 그렇지 않다고 생각하는 경우<br />2번:
          나에 대한 설명이나 나의 감정이 가끔 그렇다고 생각하는 경우<br />3번:
          나에 대한 설명이나 나의 감정이 자주 그렇다고 생각하는 경우<br />4번:
          나에 대한 설명이나 감정이 거의 항상 그렇다고 생각하는 경우<br /><br />아래의
          예시를 한 번 볼까요? 예시 문장을 잘 읽고 1개의 답안을 선택해주세요.
        </section>
      </article>
    </div>
    <div class="pl-[154px] flex flex-col items-end w-full max-md:max-w-full">
      <section
        class="flex gap-0 self-end mt-8 w-full text-base font-bold text-cyan-900 max-w-[1117px] max-md:flex-wrap max-md:max-w-full"
      >
        <div
          class="justify-center flex items-center p-2.5 ml-px flex-1 bg-indigo-50 max-md:px-5 max-md:max-w-full"
        >
          예시 문장
        </div>
        <div class="justify-center w-[125px] py-2.5 text-center bg-blue-100">
          절대로<br />그렇지 않아요
        </div>
        <div class="justify-center w-[125px] py-2 text-center bg-blue-100">
          가끔<br />그래요
        </div>
        <div class="justify-center w-[125px] py-2 text-center bg-blue-100">
          자주<br />그래요
        </div>
        <div class="justify-center w-[125px] py-2 text-center bg-blue-100">
          거의 항상<br />그래요
        </div>
      </section>

      <section
        class="flex justify-between items-center max-w-full border-b border-solid border-stone-200 w-[1117px] max-md:flex-wrap max-md:pr-5"
      >
        <div
          class="flex py-7 justify-between items-center max-w-full border-b border-solid border-stone-200 w-[1117px] max-md:flex-wrap max-md:pr-5"
        >
          <div
            class="self-stretch pl-5 text-base font-medium leading-6 text-neutral-700 flex-1 text-left"
          >
            수영장에서 수영하는 것을<br />좋아해요.
          </div>
          <label
            for="option1"
            class="shrink-0 self-stretch my-auto w-[125px] flex justify-center items-center"
          >
            <input
              class="hidden"
              type="radio"
              name="activityQuestion"
              id="option1"
              value="1"
              v-model="score"
            />
            <div
              class="w-7 h-7 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px]"
            >
              <div class="w-5 h-5 rounded-full"></div>
            </div>
          </label>
          <label
            for="option2"
            class="shrink-0 self-stretch my-auto w-[125px] flex justify-center items-center"
          >
            <input
              class="hidden"
              type="radio"
              name="activityQuestion"
              id="option2"
              value="2"
              v-model="score"
            />
            <div
              class="w-7 h-7 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px]"
            >
              <div class="w-5 h-5 rounded-full"></div>
            </div>
          </label>
          <label
            for="option3"
            class="shrink-0 self-stretch my-auto w-[125px] flex justify-center items-center"
          >
            <input
              class="hidden"
              type="radio"
              name="activityQuestion"
              id="option3"
              value="3"
              v-model="score"
            />
            <div
              class="w-7 h-7 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px]"
            >
              <div class="w-5 h-5 rounded-full"></div>
            </div>
          </label>
          <label
            for="option4"
            class="shrink-0 self-stretch my-auto w-[125px] flex justify-center items-center"
          >
            <input
              class="hidden"
              type="radio"
              name="activityQuestion"
              id="option4"
              value="4"
              v-model="score"
            />
            <div
              class="w-7 h-7 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px]"
            >
              <div class="w-5 h-5 rounded-full"></div>
            </div>
          </label>
        </div>
      </section>
      <section
        class="justify-center text-left items-start px-7 py-7 mt-8 max-w-full text-base font-medium leading-8 text-black rounded-xl border border-solid border-neutral-300 w-[1117px] max-md:px-5 max-md:max-w-full"
        v-if="score"
      >
        질문에서 맞거나 틀린 답은 없습니다. 솔직하게 모든 질문에 답해주세요.<br />결정하기
        어렵더라도 각 질문마다 최선을 다해 답해주세요.<br /><br />자,
        준비되었나요? 준비가 되었다면 ‘시작’을 눌러 시작해보세요!
      </section>
    </div>
    <button
      class="justify-center px-10 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-blue-500 rounded-3xl max-md:px-5"
      v-if="score"
    >
      시작
    </button>
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
    const title = ref('마음알기 설문2');
    const date = ref('YYYY년 MM월 DD일 ~ MM월 DD일');
    const score = ref();

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      // todo : 설문 문제 확인 api호출. with type, 만약 필요하면 userId
      title.value = '마음알기 설문2';
      date.value = 'YYYY년 MM월 DD일 ~ MM월 DD일';
    };

    const startReport = () => {
      router.push({
        name: 'reportQuestion',
        params: { type: type.value },
        // query: { plan: 'private' }
      });
    };

    return {
      title,
      date,
      type,
      score,
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
