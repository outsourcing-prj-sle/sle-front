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
        <div class="flex flex-col" v-if="page >= n">
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
            :src="require(`@/assets/img/5q${currentStep}.png`)"
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
              :src="require(`@/assets/img/5a${currentStep}1.png`)"
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
              :src="require(`@/assets/img/5a${currentStep}2.png`)"
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
              :src="require(`@/assets/img/5a${currentStep}3.png`)"
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
              :src="require(`@/assets/img/5a${currentStep}4.png`)"
              alt="5a4"
              class="self-center mt-6 object-contain max-w-full h-[224px]"
            />
          </label>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { ref, watch, computed } from 'vue';

export default {
  name: 'ReportQuestion5',
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
