<template>
  <section
    class="flex flex-col items-end px-20 mt-4 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
    v-if="currentStep"
  >
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
          src="@/assets/img/ballon-prev.png"
          class="w-[18px] h-[18px] mt-[2px]"
        />
        <p>{{ $t('report.chooseOne') }}</p>
      </div>
    </div>

    <div
      class="flex relative gap-20 justify-center mt-12 max-w-full w-full max-md:flex-wrap max-md:mt-10 max-lg:gap-12 max-md:gap-8"
    >
      <template v-for="n in 4" :key="`blueball${n}`">
        <div class="flex flex-col">
          <div
            class="flex flex-col justify-center p-2 rounded-3xl border border-blue-400 border-solid bg-white]"
            :class="page >= n ? 'border-blue-400' : 'border-white'"
          >
            <div class="shrink-0 w-8 h-8 bg-blue-400 rounded-2xl"
              :class="page >= n ? 'bg-blue-400' : 'bg-neutral-200'"
            ></div>
          </div>
          <span class="self-center mt-4 text-base text-center text-black">{{
            n
          }}</span>
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
          <p
            class="text-left max-md:mr-1.5 max-md:max-w-full max-lg:text-sm max-md:text-xs"
          >
            {{ $t('report3.question') }}
          </p>
          <img
            :src="require(`@/assets/img/3q${currentStep}.png`)"
            alt="3q1"
            class="self-center mt-6 max-w-full aspect-[2.5] w-[371px]"
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
            class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer flex-1"
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
              class="justify-center px-3 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-8 max-lg:text-sm max-md:text-xs w-full"
            >
              {{ $t(`report3.q${currentStep}_answer1`) }}
            </div>
          </label>
          <label
            for="option2"
            class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer flex-1"
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
              class="justify-center px-3 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-8 max-lg:text-sm max-md:text-xs w-full"
            >
              {{ $t(`report3.q${currentStep}_answer2`) }}
            </div>
          </label>
          <label
            for="option3"
            class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer flex-1"
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
              class="justify-center px-3 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-8 max-lg:text-sm max-md:text-xs w-full"
            >
              {{ $t(`report3.q${currentStep}_answer3`) }}
            </div>
          </label>
          <label
            for="option4"
            class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer flex-1"
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
              class="justify-center px-3 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-8 max-lg:text-sm max-md:text-xs w-full"
            >
              {{ $t(`report3.q${currentStep}_answer4`) }}
            </div>
          </label>
        </div>
      </section>
      <section
        class="justify-center text-left items-start px-7 py-7 mt-8 max-w-full text-base font-medium leading-8 text-black rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:max-w-full max-lg:text-sm max-md:text-xs w-full"
      >
        {{ $t('report3.announce_content2') }}
      </section>
    </div>
  </section>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'ReportQuestion3',
  components: {},
  props: {
    _page: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: 'progress', // done
    },
    _currentStep: {
      type: String,
      default: '',
    },
    _currentAnswer: {
      type: String,
      default: '',
    },
    _currentAnswer2: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const currentStep = ref(props._currentStep);
    const page = ref(props._page);
    const score = ref(null);
    const ballonKey = ref(Date.now());

    watch(
      () => props._currentStep,
      (newVal) => {
        currentStep.value = newVal || null;
      }
    );

    watch(
      () => props._currentAnswer,
      (newVal) => {
        score.value = newVal || null;
      }
    );

    watch(
      () => props._page,
      (newVal) => {
        page.value = newVal;
        restartAnimation();
      }
    );

    watch(
      () => score.value,
      (newVal) => {
        emit('handleAnswer', newVal);
      }
    );

    const restartAnimation = () => {
      ballonKey.value = Date.now();
    };

    return {
      currentStep,
      page,
      score,
      ballonKey,
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
