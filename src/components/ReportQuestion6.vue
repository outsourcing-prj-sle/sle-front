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
        <div class="self-end text-base leading-8">기간 : {{ dateRange }}</div>
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
      <p class="flex-auto my-auto max-md:max-w-full">
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
        <p>눈에서 1개, 코와 입에서 1개를 각각 선택해주세요.</p>
      </div>
    </div>

    <div
      class="flex relative gap-40 justify-center mt-12 max-w-full w-full max-md:flex-wrap max-md:mt-10"
    >
      <template v-for="n in 4" :key="`blueball${n}`">
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
    <div class="pl-[154px] flex flex-col items-end w-full max-md:max-w-full">
      <section
        class="flex flex-col self-center py-8 mt-5 w-full font-medium text-black rounded-xl border border-solid border-neutral-300 max-w-[1117px] max-md:max-w-full"
      >
        <div
          class="flex flex-col px-9 text-base leading-8 max-md:px-5 max-md:max-w-full"
        >
          <p class="text-left max-md:mr-1.5 max-md:max-w-full">
            {{ metadata[parseInt(step[nowStep]) - 1].Q }}
          </p>
          <div
            class="flex gap-5 max-md:flex-col max-md:gap-0"
            :class="{
              'pointer-events-none': status === 'done',
            }"
          >
            <div class="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
              <FaceImg
                :face="face[faceIndex]"
                :eyes="score > 0 && eyes[score - 1]"
                :mouth="score2 > 0 && mouth[score2 - 1]"
              />
            </div>
            <div class="flex ml-5 w-[56%] max-md:ml-0 max-md:w-full">
              <FaceSelectList
                :title="'눈'"
                :itemList="eyes"
                :selected="score"
                @selectItem="(index) => selectIndex(index, 'eyes')"
              />
              <div
                class="mx-2 h-full border-2 border-l border-solid border-gray-700"
              ></div>
              <FaceSelectList
                :title="'코와 입'"
                :itemList="mouth"
                :selected="score2"
                @selectItem="(index) => selectIndex(index, 'mouth')"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        class="justify-center text-left items-start px-7 py-7 mt-8 max-w-full text-base font-medium leading-8 text-black rounded-xl border border-solid border-neutral-300 w-[1117px] max-md:px-5 max-md:max-w-full"
      >
        결정하기 어렵더라도 각 질문마다 최선을 다해 답해주세요.
      </section>
    </div>
    <!-- <div class="flex gap-4" v-if="eyesIndex > -1 && mouthIndex > -1"> -->

    <div class="flex gap-4" v-if="score > -1 && score2 > -1">
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
import { useUserStore } from '@/store/userStore.js';
import FaceImg from '@/components/FaceImg.vue';
import FaceSelectList from '@/components/FaceSelectList.vue';
import ReportService from '@/service/ReportService.js';
import ttsText from '@/utils/ttsText.js';

export default {
  name: 'ReportQuestion6',
  components: { FaceImg, FaceSelectList },
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
    stepAnswer2: {
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
      default: '마음알기 설문6',
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const type = ref(route.params.type || 1);
    const score = ref(
      ((props.isSave || props.status === 'done') &&
        props.stepAnswer &&
        props.stepAnswer[props.startStep || 0]) ||
        null
    );
    const score2 = ref(
      ((props.isSave || props.status === 'done') &&
        props.stepAnswer2 &&
        props.stepAnswer2[props.startStep || 0]) ||
        null
    );
    const userAnswer = ref(props.stepAnswer || []);
    const userAnswer2 = ref(props.stepAnswer2 || []);
    const nowStep = ref(props.startStep || 0);
    const canTTS = ref(true);
    const face = ref([
      require('@/assets/img/6q1.png'),
      require('@/assets/img/6q2.png'),
      require('@/assets/img/6q3.png'),
      require('@/assets/img/6q4.png'),
    ]);
    const eyes = ref([
      require('@/assets/img/6a11.png'),
      require('@/assets/img/6a12.png'),
      require('@/assets/img/6a13.png'),
      require('@/assets/img/6a14.png'),
      require('@/assets/img/6a15.png'),
      require('@/assets/img/6a16.png'),
    ]);
    const mouth = ref([
      require('@/assets/img/6a21.png'),
      require('@/assets/img/6a22.png'),
      require('@/assets/img/6a23.png'),
      require('@/assets/img/6a24.png'),
      require('@/assets/img/6a25.png'),
      require('@/assets/img/6a26.png'),
    ]);
    const faceIndex = ref(0);
    const eyesIndex = ref(-1);
    const mouthIndex = ref(-1);
    const ballonKey = ref(Date.now());

    onMounted(() => {});

    watch(
      () => [userAnswer?.value?.length],
      ([length]) => {
        if (
          (props.isSave || props.status === 'done') &&
          !score.value &&
          userAnswer.value.length
        ) {
          score.value =
            userAnswer.value && userAnswer.value[nowStep.value || 0];
          score2.value =
            userAnswer2.value && userAnswer2.value[nowStep.value || 0];
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
          router.push({
            name: 'reportFin',
            query: {
              title: props.title,
              date: props.dateRange,
            },
          });
        } else {
          router.push({ name: 'mySEL' });
        }
        return;
      }

      if (props.status !== 'done') {
        // if (props.isSave) {
        ReportService.reportSave({
          pollId: type.value,
          qesitmSn: props.step[nowStep.value],
          qesitmAnswer: score.value,
          quesitmAnswerImage: score2.value,
        });
        // }

        // 초기화
        userAnswer.value[nowStep.value] = score.value;
        score.value = null;
        score2.value = null;
        canTTS.value = true;

        // nowStep 다음으로
        nowStep.value += 1;
        if (props.isSave) {
          // 임시저장된 값 있으면 입력해줌
          score.value = userAnswer.value[nowStep.value] || null;
          // 임시저장된 값 있으면 입력해줌
          score2.value = userAnswer2.value[nowStep.value] || null;
        }
      } else {
        // nowStep 다음으로
        nowStep.value += 1;
        // 저장된 값 입력
        score.value = userAnswer.value[nowStep.value] || null;
        // 임시저장된 값 있으면 입력해줌
        score2.value = userAnswer2.value[nowStep.value] || null;
      }
    };

    const prevStep = () => {
      // 처음일때 무반응
      if (nowStep.value === 0) {
        return;
      }

      if (props.status !== 'done') {
        // 초기화
        // todo : 답을 두개줘야하는 6번, 다음으로갈때나 이전으로 갈떄 어떻게볼지
        // todo : 어떻게 저장할지
        // score.value 보고 화깅ㄴ하기
        userAnswer.value[nowStep.value] = score.value;
        userAnswer2.value[nowStep.value] = score2.value;
        faceIndex.value = nowStep.value;
        // eyesIndex.value = null;
        // mouthIndex.value = null;
        score.value = null;
        score2.value = null;

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
        score2.value = userAnswer2.value[nowStep.value] || null;
      }
    };

    const useTTS = () => {
      if (!canTTS.value) return;
      canTTS.value = false;

      let s = props.step[nowStep.value];
      let text = ttsText[3][s];
      const utterancequestionDefault = new SpeechSynthesisUtterance(text);

      window.speechSynthesis.speak(utterancequestionDefault);
    };

    const selectIndex = (index, type) => {
      if (type === 'eyes') {
        score.value = index;
      }
      if (type === 'mouth') {
        score2.value = index;
      }
    };

    return {
      type,
      nowStep,
      score,
      score2,
      face,
      eyes,
      mouth,
      faceIndex,
      eyesIndex,
      mouthIndex,
      ballonKey,
      nextStep,
      prevStep,
      useTTS,
      selectIndex,
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
  width: 230px;
  border: 1px solid #f0f0f0;
  background-color: #f0f0f0;
  border-radius: 10px;
  z-index: 9999;
  text-align: left;
  padding: 20px 10px;
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
