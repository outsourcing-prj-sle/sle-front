<template>
  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
  >
    <div
      class="flex gap-1 items-start self-stretch max-md:flex-wrap max-md:max-w-full"
    >
      <div class="flex flex-col self-start font-bold min-w-[150px]">
        <h1 class="text-xl text-blue-500 text-left">마음알기 설문3</h1>
        <h2 class="mt-1 text-2xl text-neutral-700 text-left">안내사항</h2>
        <img
          src="@/assets/img/minichar.png"
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
        <div class="flex gap-2.5 self-start mt-1.5 max-md:flex-wrap">
          <img
            src="@/assets/img/speaker.png"
            alt="speaker"
            class="shrink-0 aspect-square w-[25px]"
          />
          <p class="flex-auto my-auto max-md:max-w-full">
            클릭시 안내음성을 들을 수 있습니다. 단, 안내음성은 1회만 들을 수
            있습니다.
          </p>
        </div>
        <section
          class="justify-center items-start px-9 py-6 text-left text-base leading-8 rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:mt-10 max-md:max-w-full mt-1"
        >
          다음 지시를 따라 주시기 바랍니다.<br /><br />이 화면에는 사람의 눈
          그림과 각 모서리에 쓰여진 단어 4개를 볼 수 있습니다.<br />사진을 보고
          사진 속 사람의 상태를 가장 잘 나타낸 단어를 가능한 한 빨리
          선택해주세요.<br /><br />아래의 예시를 한 번 볼까요? 예시 문장을 잘
          읽고 1개의 답안을 선택해주세요.
        </section>
      </article>
    </div>
    <div class="pl-[154px] flex flex-col items-end w-full max-md:max-w-full">
      <section
        class="flex flex-col self-center py-8 mt-5 w-full font-medium text-black rounded-xl border border-solid border-neutral-300 max-w-[1117px] max-md:max-w-full"
      >
        <div
          class="flex flex-col px-9 text-base leading-8 max-md:px-5 max-md:max-w-full"
        >
          <p class="text-left max-md:mr-1.5 max-md:max-w-full">
            네 개의 단어 중에서 사진 속의 사람이 생각하거나 느끼는 것을 가장 잘
            묘사하는 단어는 무엇일까요?
          </p>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fade2edad4f98246604fcb6a5097d7a59a7783cb19257a407dba137b667d68c4?apiKey=ce28460f29bb4fafa8e3905252f0ef12&"
            alt="Example Image"
            class="self-center mt-6 max-w-full aspect-[2.5] w-[371px]"
          />
        </div>
        <div
          class="flex gap-5 px-9 justify-between self-center mt-9 w-full text-xl leading-8 whitespace-nowrap max-w-[997px] max-md:flex-wrap max-md:max-w-full"
        >
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
              class="justify-center px-16 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-6"
            >
              슬픈
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
              class="justify-center px-16 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-6"
            >
              기쁜
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
              class="justify-center px-16 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-6"
            >
              무서운
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
              class="justify-center px-16 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-6"
            >
              화난
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
    const title = ref('마음알기 설문3');
    const date = ref('YYYY년 MM월 DD일 ~ MM월 DD일');
    const score = ref();

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      // todo : 설문 문제 확인 api호출. with type, 만약 필요하면 userId
      title.value = '마음알기 설문3';
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
input:checked + div {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity));

  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
</style>
