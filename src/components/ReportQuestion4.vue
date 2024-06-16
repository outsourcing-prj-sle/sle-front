<template>
  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
  >
    <div
      class="flex gap-1 items-start self-stretch max-md:flex-wrap max-md:max-w-full"
    >
      <div class="flex flex-col self-start font-bold min-w-[150px]">
        <h1 class="text-xl text-blue-500 text-left">
          {{ title }}
        </h1>
        <h2 class="mt-1 text-2xl text-neutral-700 text-left">안내사항</h2>
      </div>
      <article
        class="flex flex-col grow shrink-0 self-end mt-9 font-medium text-black basis-0 w-fit max-md:max-w-full"
      >
        <div class="self-end text-base leading-8 max-lg:text-sm max-md:text-xs">기간 : {{ dateRange }}</div>
      </article>
    </div>
    <div
      class="flex gap-2.5 self-start mt-1.5 max-md:flex-wrap"
      @click="useTTS"
    >
      <img
        src="@/assets/img/speaker.png"
        alt="speaker"
        class="shrink-0 aspect-square w-[25px] max-lg:w-[20px]"
      />
      <p class="flex-auto my-auto max-md:max-w-full max-lg:text-sm max-md:text-xs">
        클릭시 안내음성을 들을 수 있습니다. 단, 안내음성은 1회만 들을 수
        있습니다.
      </p>
    </div>
    <div
      class="flex w-full justify-center gap-4 mt-6 ml-36 text-base font-medium text-neutral-700"
    >
      <img
        loading="lazy"
        src="@/assets/img/reportchar.png"
        alt="Survey illustration"
        class="shrink-0 max-w-full aspect-[0.99] w-[127px]"
      />
      <!-- todo : 1초간 사진이 보여집니다 말풍선 -->
    </div>

    <div
      class="flex relative gap-20 justify-center mt-12 max-w-full w-full max-md:flex-wrap max-md:mt-10 max-lg:gap-12 max-md:gap-8"
    >
      <template v-for="n in 4" :key="`blueball${n}`">
        <div class="flex flex-col" v-if="nowStep + 1 >= n">
          <div
            class="flex flex-col justify-center p-2 rounded-3xl border border-blue-400 border-solid bg-white"
          >
            <div class="shrink-0 w-8 h-8 max-sm:w-6 max-sm:h-6 bg-blue-400 rounded-2xl"></div>
          </div>
          <span class="self-center mt-4 text-base text-center text-black">{{
            n
          }}</span>
        </div>
        <div
          class="flex flex-col px-2 pt-2 text-base text-center whitespace-nowrap"
          v-else
        >
          <div class="shrink-0 w-8 h-8 max-sm:w-6 max-sm:h-6 rounded-2xl bg-neutral-200"></div>
          <span class="mt-6">{{ n }}</span>
        </div>
      </template>
    </div>
    <div class="flex flex-col items-end w-full max-md:max-w-full max-lg:pl-0">
      <section
        class="flex flex-col self-center py-8 mt-5 w-full font-medium text-black rounded-xl border border-solid border-neutral-300 max-md:max-w-full"
      >
        <div
          class="flex flex-col px-9 text-base leading-8 max-md:px-5 max-md:max-w-full"
        >
          <p class="text-left max-md:mr-1.5 max-md:max-w-full max-lg:text-sm max-md:text-xs">
            다음의 6개 단어 중에서 사진 속의 사람이 생각나거나 느끼는 것을 가장
            잘 묘사하는 단어는 무엇일까요?
          </p>
          <img
            :src="questionImgList[questionImgIndex]"
            alt="questionImg"
            class="self-center mt-6 max-w-full h-[476px]"
          />
        </div>
        <div
          class="flex gap-5 px-9 justify-between self-center mt-9 w-full text-xl leading-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full"
        >
          <label
            for="option1"
            class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer"
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
            class="justify-center px-36 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-8 max-lg:text-sm max-md:text-xs max-2xl:px-28 max-xl:px-14"
            >
              {{ metadata[nowStep + 1].A[0] }}
            </div>
          </label>
          <label
            for="option2"
            class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer"
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
              class="justify-center px-36 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-8 max-lg:text-sm max-md:text-xs max-2xl:px-28 max-xl:px-14"
            >
              {{ metadata[nowStep + 1].A[1] }}
            </div>
          </label>
          <label
            for="option3"
            class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer"
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
              class="justify-center px-36 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-8 max-lg:text-sm max-md:text-xs max-2xl:px-28 max-xl:px-14"
            >
              {{ metadata[nowStep + 1].A[2] }}
            </div>
          </label>
          <label
            for="option4"
            class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer"
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
              class="justify-center px-36 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-8 max-lg:text-sm max-md:text-xs max-2xl:px-28 max-xl:px-14"
            >
              {{ metadata[nowStep + 1].A[3] }}
            </div>
          </label>
        </div>
      </section>
      <section
        class="justify-center text-left items-start px-7 py-7 mt-8 max-w-full text-base font-medium leading-8 text-black rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:max-w-full max-lg:text-sm max-md:text-xs w-full"
      >
        결정하기 어렵더라도 각 질문마다 최선을 다해 답해주세요.
      </section>
    </div>
    <div class="flex gap-4" v-if="score">
      <button
        class="justify-center px-10 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-neutral-500 rounded-3xl max-md:px-5"
        v-if="nowStep !== 0 && status === 'done'"
        @click="prevStep"
      >
        이전
      </button>
      <button
        class="justify-center px-10 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-blue-500 rounded-3xl max-md:px-5"
        @click="nextStep"
      >
        {{ step.length === nowStep + 1 ? '완료' : '다음' }}
      </button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore.js';

export default {
  name: 'ReportQuestion3',
  components: {},
  props: {
    startStep: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'progress', // done
    },
    metadata: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isSave: {
      type: Boolean,
      default: true,
    },
    isVoice: {
      type: Boolean,
      default: false,
    },
    step: {
      type: Array,
      default: () => {
        return [];
      },
    },
    stepAnswer: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isPrev: {
      type: Boolean,
      default: true,
    },
    dateRange: {
      type: String,
      defualt: 'YYYY년 MM월 DD일 ~ MM월 DD일',
    },
    title: {
      type: String,
      default: '마음알기 설문4',
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const userId = computed(() => userStore.id);
    const type = ref(route.params.type || 1);
    const score = ref(
      (props.stepAnswer && props.stepAnswer[props.startStep || 0]) || null
    );
    const userAnswer = ref(props.stepAnswer || []);
    const nowStep = ref(props.startStep || 0);
    const canTTS = ref(true);
    const questionImgList = ref([
      require('@/assets/img/4qThree.png'),
      require('@/assets/img/4qTwo.png'),
      require('@/assets/img/4qOne.png'),
      require('@/assets/img/4q1.png'),
      require('@/assets/img/4qBlack.png'),
    ]);
    const questionImgIndex = ref(0);
    const interval = ref();

    onMounted(() => {
      changeImg();
    });

    const changeImg = () => {
      clearInterval(interval.value);
      questionImgIndex.value = 0;

      // todo : 4번 인덱스의 이미지를 현재 문제의 이미지로 갈아끼워줘야함
      // questionImgList.value[3] = props.metadata[nowStep.value].Q;

      interval.value = setInterval(() => {
        // todo : questionImgIndex.value 따라서 말풍선 말도 바꾸기
        questionImgIndex.value++;
        if (questionImgIndex.value > 4) {
          questionImgIndex.value = 4;
          clearInterval(interval.value);
        }
      }, 1000);
    };

    const nextStep = () => {
      // 마지막일때 완료 페이지로
      if (props.step.length === nowStep.value + 1) {
        if (props.isSave && props.status !== 'done') {
          // todo : 만약 저장해야하면 저장 - userId 이용
        }
        router.push({ name: 'reportFin' });
        return;
      }

      if (props.status !== 'done') {
        // 초기화
        userAnswer.value[nowStep.value] = score.value;
        score.value = null;
        canTTS.value = true;

        // nowStep 다음으로
        nowStep.value += 1;

        if (props.isSave) {
          // todo : 만약 저장해야하면 저장 - userId 이용

          // 임시저장된 값 있으면 입력해줌
          score.value = userAnswer.value[nowStep.value] || null;
        }
      } else {
        // nowStep 다음으로
        nowStep.value += 1;
        // 저장된 값 입력
        score.value = userAnswer.value[nowStep.value] || null;
      }
      changeImg();
    };

    const prevStep = () => {
      // 처음일때 무반응
      if (nowStep.value === 0) {
        return;
      }

      if (props.status !== 'done') {
        // 초기화
        userAnswer.value[nowStep.value] = score.value;
        score.value = null;

        // nowStep 이전으로
        nowStep.value -= 1;

        if (props.isSave) {
          // todo : 만약 저장해야하면 저장 - userId 이용
          // 값 입력
          score.value = userAnswer.value[nowStep.value] || null;
        }
      } else {
        // nowStep 이전으로
        nowStep.value -= 1;
        score.value = userAnswer.value[nowStep.value] || null;
      }
      changeImg();
    };

    const useTTS = () => {
      if (!canTTS.value) return;
      canTTS.value = false;
      const questionData = props.metadata[nowStep.value + 1];
      const questionDefault = '다음은 문제입니다.';
      const utterancequestionDefault = new SpeechSynthesisUtterance(
        questionDefault
      );
      window.speechSynthesis.speak(utterancequestionDefault);
      const utteranceQ = new SpeechSynthesisUtterance(questionData.Q);
      window.speechSynthesis.speak(utteranceQ);

      const answerDefault = '다음은 답변의 보기입니다.';
      const utteranceanswerDefault = new SpeechSynthesisUtterance(
        answerDefault
      );
      window.speechSynthesis.speak(utteranceanswerDefault);
      for (let i = 0; i < questionData.A.length; i++) {
        const utteranceA = new SpeechSynthesisUtterance(questionData.A[i]);
        window.speechSynthesis.speak(utteranceA);
      }
    };

    return {
      type,
      nowStep,
      score,
      questionImgList,
      questionImgIndex,
      nextStep,
      prevStep,
      useTTS,
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
input:checked + div {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity));

  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
</style>
