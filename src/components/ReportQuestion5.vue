<template>
  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
    v-if="metadata.length"
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
        <div class="self-end text-base leading-8 max-lg:text-sm max-md:text-xs">
          기간 : {{ dateRange }}
        </div>
      </article>
    </div>
    <div
      class="flex gap-2.5 self-start mt-1.5 max-md:flex-wrap"
      @click="useTTS"
    >
      <img
        src="@/assets/img/speaker.png"
        alt="speaker"
        class="shrink-0 aspect-square w-[25px]"
      />
      <p
        class="flex-auto my-auto max-md:max-w-full max-lg:text-sm max-md:text-xs"
      >
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

      <div :key="ballonKey" class="text-ballon flex gap-[5px] items-start">
        <img
          src="../assets/img/ballon-prev.png"
          class="w-[18px] h-[18px] mt-[2px]"
        />
        <p>1개의 답안을 선택해주세요.</p>
      </div>
    </div>

    <div
      class="flex relative gap-20 justify-center mt-12 max-w-full w-full max-md:flex-wrap max-md:mt-10 max-lg:gap-12 max-md:gap-8"
    >
      <template v-for="n in 4" :key="`blueball${n}`">
        <div class="flex flex-col" v-if="nowStep + 1 >= n">
          <div
            class="flex flex-col justify-center p-2 rounded-3xl border border-blue-400 border-solid bg-white"
          >
            <div
              class="shrink-0 w-8 h-8 max-sm:w-6 max-sm:h-6 bg-blue-400 rounded-2xl"
            ></div>
          </div>
          <span class="self-center mt-4 text-base text-center text-black">{{
            n
          }}</span>
        </div>
        <div
          class="flex flex-col px-2 pt-2 text-base text-center whitespace-nowrap"
          v-else
        >
          <div
            class="shrink-0 w-8 h-8 max-sm:w-6 max-sm:h-6 rounded-2xl bg-neutral-200"
          ></div>
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
          <img
            :src="require(`@/assets/img/5q${step[nowStep]}.png`)"
            alt="5q1"
            class="self-center mt-6 max-w-full max-h-[360px]"
          />
        </div>
        <div
          class="flex gap-5 px-9 justify-between self-center mt-9 w-full text-xl leading-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full"
          :class="{
            'pointer-events-none': status === 'done',
          }"
        >
          <label
            for="option1"
            class="shrink-0 self-stretch flex-1 flex justify-start items-center relative cursor-pointer"
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
              class="absolute top-0 left-0 flex justify-center items-center px-1 text-xs font-medium leading-8 whitespace-nowrap bg-white rounded-full border border-solid border-neutral-400 h-6 stroke-[1px] text-neutral-700 w-6"
            >
              1
            </div>
            <img
              :src="require(`@/assets/img/5a${step[nowStep]}1.png`)"
              alt="5a1"
              class="self-center mt-6 object-contain max-w-full h-[224px]"
            />
          </label>

          <label
            for="option2"
            class="shrink-0 self-stretch flex-1 flex justify-start items-center relative cursor-pointer"
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
              class="absolute top-0 left-0 flex justify-center items-center px-1 text-xs font-medium leading-8 whitespace-nowrap bg-white rounded-full border border-solid border-neutral-400 h-6 stroke-[1px] text-neutral-700 w-6"
            >
              2
            </div>
            <img
              :src="require(`@/assets/img/5a${step[nowStep]}2.png`)"
              alt="5a2"
              class="self-center mt-6 object-contain max-w-full h-[224px]"
            />
          </label>

          <label
            for="option3"
            class="shrink-0 self-stretch flex-1 flex justify-start items-center relative cursor-pointer"
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
              class="absolute top-0 left-0 flex justify-center items-center px-1 text-xs font-medium leading-8 whitespace-nowrap bg-white rounded-full border border-solid border-neutral-400 h-6 stroke-[1px] text-neutral-700 w-6"
            >
              3
            </div>
            <img
              :src="require(`@/assets/img/5a${step[nowStep]}3.png`)"
              alt="5a3"
              class="self-center mt-6 object-contain max-w-full h-[224px]"
            />
          </label>

          <label
            for="option4"
            class="shrink-0 self-stretch flex-1 flex justify-start items-center relative cursor-pointer"
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
              class="absolute top-0 left-0 flex justify-center items-center px-1 text-xs font-medium leading-8 whitespace-nowrap bg-white rounded-full border border-solid border-neutral-400 h-6 stroke-[1px] text-neutral-700 w-6"
            >
              4
            </div>
            <img
              :src="require(`@/assets/img/5a${step[nowStep]}4.png`)"
              alt="5a4"
              class="self-center mt-6 object-contain max-w-full h-[224px]"
            />
          </label>
        </div>
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
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ttsText from '@/utils/ttsText.js';
import ReportService from '@/service/ReportService.js';

export default {
  name: 'ReportQuestion5',
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
      type: Array,
      default: () => {
        return [];
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
      default: '마음알기 설문3',
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const type = ref(route.params.type || 1);
    const score = ref(
      (props.stepAnswer && props.stepAnswer[props.startStep || 0]) || null
    );
    const userAnswer = ref(props.stepAnswer || []);
    const nowStep = ref(props.startStep || 0);
    const canTTS = ref(true);
    const ballonKey = ref(Date.now());

    onMounted(() => {});

    watch(
      () => [userAnswer?.value?.length],
      ([length]) => {
        if (!score.value && userAnswer.value.length) {
          score.value =
            userAnswer.value && userAnswer.value[nowStep.value || 0];
        }
      },
      { immediate: true } // 초기 실행을 위해 immediate: true 설정
    );

    const nextStep = () => {
      // 마지막일때 완료 페이지로
      if (props.step.length === nowStep.value + 1) {
        if (props.status !== 'done') {
          ReportService.reportComplete({
            pollId: type.value,
            qesitmSn: props.step[nowStep.value],
            qesitmAnswer: score.value,
          });
          router.push({ name: 'reportFin' });
        } else {
          router.push({ name: 'mySEL' });
        }
        return;
      }

      if (props.status !== 'done') {
        if (props.isSave) {
          ReportService.reportSave({
            pollId: type.value,
            qesitmSn: props.step[nowStep.value],
            qesitmAnswer: score.value,
          });
        }
        // 초기화
        userAnswer.value[nowStep.value] = score.value;
        score.value = null;
        canTTS.value = true;

        // nowStep 다음으로
        nowStep.value += 1;

        // 임시저장된 값 있으면 입력해줌
        score.value = userAnswer.value[nowStep.value] || null;
      } else {
        // nowStep 다음으로
        nowStep.value += 1;
        // 저장된 값 입력
        score.value = userAnswer.value[nowStep.value] || null;
      }

      restartAnimation();
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
          // 만약 저장해야하면 저장
          // 값 입력
          score.value = userAnswer.value[nowStep.value] || null;
        }
      } else {
        // nowStep 이전으로
        nowStep.value -= 1;
        score.value = userAnswer.value[nowStep.value] || null;
      }

      restartAnimation();
    };

    const restartAnimation = () => {
      ballonKey.value = Date.now();
    };

    const useTTS = () => {
      if (!canTTS.value) return;
      canTTS.value = false;

      let s = props.step[nowStep.value];
      let text = ttsText[5][s];

      const questionDefault = text;
      const utterancequestionDefault = new SpeechSynthesisUtterance(
        questionDefault
      );
      window.speechSynthesis.speak(utterancequestionDefault);
    };

    return {
      type,
      nowStep,
      score,
      ballonKey,
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

.text-ballon {
  position: absolute;
  left: calc(50% + 100px);
  width: 190px;
  border: 1px solid #f0f0f0;
  background-color: #f0f0f0;
  border-radius: 10px;
  z-index: 9999;
  text-align: left;
  padding: 20px 10px;
  animation-name: showBallon;
  animation-duration: 30s;
}
.text-ballon::after {
  content: '';
  position: absolute;
  top: 31px;
  left: -30px;
  border-right: 30px solid #f0f0f0;
  border-top: 7px solid transparent;
  border-bottom: 9px solid transparent;
}
@media (max-width: 640px) {
  .text-ballon {
    width: 130px;
  }
}
@keyframes showBallon {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
