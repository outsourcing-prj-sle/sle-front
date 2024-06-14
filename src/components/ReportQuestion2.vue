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
        <div class="self-end text-base leading-8">기간 : {{ dateRange }}</div>
      </article>
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
      <!-- todo : 30초 뒤에 말풍성 보여줘야됨 -->
    </div>

    <div
      class="flex relative gap-8 justify-center mt-12 max-w-full w-full max-md:flex-wrap max-md:mt-10"
    >
      <template v-for="n in 15" :key="`blueball${n}`">
        <div class="flex flex-col" v-if="nowStep + 1 >= n">
          <div
            class="flex flex-col justify-center p-2 rounded-3xl border border-blue-400 border-solid bg-white"
          >
            <div class="shrink-0 w-8 h-8 bg-blue-400 rounded-2xl"></div>
          </div>
          <span class="self-center mt-4 text-base text-center text-black">{{
            n
          }}</span>
        </div>
        <div
          class="flex flex-col px-2 pt-2 text-base text-center whitespace-nowrap"
          v-else
        >
          <div class="shrink-0 w-8 h-8 rounded-2xl bg-neutral-200"></div>
          <span class="mt-6">{{ n }}</span>
        </div>
      </template>
    </div>
    <div class="flex flex-col items-end w-full max-md:max-w-full">
      <section
        class="flex gap-0 self-end mt-8 w-full text-base font-bold text-cyan-900 max-w-[1117px] max-md:flex-wrap max-md:max-w-full"
      >
        <div
          class="justify-center flex items-center p-2.5 ml-px flex-1 bg-indigo-50 max-md:px-5 max-md:max-w-full"
        >
          응답 문항
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
            {{ metadata[nowStep + 1].Q }}
          </div>
          <label
            for="option1"
            :class="{ 'pointer-events-none': status === 'done' }"
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
            :class="{ 'pointer-events-none': status === 'done' }"
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
            :class="{ 'pointer-events-none': status === 'done' }"
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
            :class="{ 'pointer-events-none': status === 'done' }"
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
    </div>
    <div class="flex gap-4" v-if="score">
      <button
        class="justify-center px-10 py-3 mt-6 text-base text-center text-white whitespace-nowrap bg-neutral-500 rounded-3xl max-md:px-5"
        v-if="nowStep !== 0"
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
  name: 'ReportQuestion2',
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
      default: '마음알기 설문2',
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

    onMounted(() => {});

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
    };

    return {
      type,
      nowStep,
      score,
      nextStep,
      prevStep,
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
