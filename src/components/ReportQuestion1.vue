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
      <template v-for="n in 6" :key="`blueball${n}`">
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
    <div class="flex flex-col items-end w-full max-md:max-w-full">
      <section
        class="flex gap-0 self-end mt-8 w-full text-base font-bold text-cyan-900 max-md:max-w-full"
      >
        <div
          class="justify-center flex items-center p-2.5 ml-px flex-1 bg-indigo-50 max-md:px-5 max-md:max-w-full min-w-96 max-2xl:min-w-72 max-xl:min-w-40 max-lg:min-w-32 max-lg:text-sm max-md:text-xs"
        >
          {{ $t('report1.cmmn_response') }}
        </div>
        <div
          class="justify-center py-2.5 text-center bg-blue-100 grow max-lg:text-sm max-md:text-xs"
          v-html="$t('report1.cmmn_response1')"
        ></div>
        <div
          class="justify-center py-2.5 text-center bg-blue-100 grow max-lg:text-sm max-md:text-xs"
          v-html="$t('report1.cmmn_response2')"
        ></div>
        <div
          class="justify-center py-2.5 text-center bg-blue-100 grow max-lg:text-sm max-md:text-xs"
          v-html="$t('report1.cmmn_response3')"
        ></div>
        <div
          class="justify-center py-2.5 text-center bg-blue-100 grow max-lg:text-sm max-md:text-xs"
          v-html="$t('report1.cmmn_response4')"
        ></div>
        <div
          class="justify-center py-2.5 text-center bg-blue-100 grow max-lg:text-sm max-md:text-xs"
          v-html="$t('report1.cmmn_response5')"
        ></div>
      </section>

      <section
        class="flex min-h-[120px] gap-0 self-end w-full text-base font-bold text-cyan-900 max-md:max-w-full"
      >
        <div
          class="flex items-center p-2.5 ml-px flex-1 max-md:px-5 max-md:max-w-full min-w-96 border-stone-200 border-solid border-b font-medium leading-6 text-left pl-5 max-2xl:min-w-72 max-xl:min-w-40 max-lg:min-w-32 max-lg:text-sm max-md:text-xs"
        >
          {{ $t(`report1.question${currentStep}`) }}
        </div>
        <div
          class="justify-center py-2.5 text-center flex grow border-stone-200 border-solid border-b"
          :class="{
            'pointer-events-none': status === 'done',
          }"
        >
          <label
            for="option1"
            class="shrink-0 self-stretch my-auto flex justify-center items-center"
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
              class="w-7 h-7 max-sm:w-5 max-sm:h-5 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px] cursor-pointer"
            >
              <div class="w-5 h-5 max-sm:w-3 max-sm:h-3 rounded-full"></div>
            </div>
          </label>
        </div>
        <div
          class="justify-center py-2 text-center flex grow border-stone-200 border-solid border-b"
        >
          <label
            for="option2"
            :class="{ 'pointer-events-none': status === 'done' }"
            class="shrink-0 self-stretch my-auto flex justify-center items-center"
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
              class="w-7 h-7 max-sm:w-5 max-sm:h-5 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px] cursor-pointer"
            >
              <div class="w-5 h-5 max-sm:w-3 max-sm:h-3 rounded-full"></div>
            </div>
          </label>
        </div>
        <div
          class="justify-center py-2 text-center flex grow border-stone-200 border-solid border-b"
        >
          <label
            for="option3"
            :class="{ 'pointer-events-none': status === 'done' }"
            class="shrink-0 self-stretch my-auto flex justify-center items-center"
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
              class="w-7 h-7 max-sm:w-5 max-sm:h-5 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px] cursor-pointer"
            >
              <div class="w-5 h-5 max-sm:w-3 max-sm:h-3 rounded-full"></div>
            </div>
          </label>
        </div>
        <div
          class="justify-center py-2 text-center flex grow border-stone-200 border-solid border-b"
        >
          <label
            for="option4"
            :class="{ 'pointer-events-none': status === 'done' }"
            class="shrink-0 self-stretch my-auto flex justify-center items-center"
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
              class="w-7 h-7 max-sm:w-5 max-sm:h-5 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px] cursor-pointer"
            >
              <div class="w-5 h-5 max-sm:w-3 max-sm:h-3 rounded-full"></div>
            </div>
          </label>
        </div>
        <div
          class="justify-center py-2 text-center flex grow border-stone-200 border-solid border-b"
        >
          <label
            for="option5"
            :class="{ 'pointer-events-none': status === 'done' }"
            class="shrink-0 self-stretch my-auto flex justify-center items-center"
          >
            <input
              class="hidden"
              type="radio"
              name="activityQuestion"
              id="option5"
              value="5"
              v-model="score"
            />
            <div
              class="w-7 h-7 max-sm:w-5 max-sm:h-5 flex justify-center items-center border border-solid border-neutral-400 rounded-[999px] cursor-pointer"
            >
              <div class="w-5 h-5 max-sm:w-3 max-sm:h-3 rounded-full"></div>
            </div>
          </label>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { ref, watch, computed } from 'vue';

export default {
  name: 'ReportQuestion1',
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
      () => score,
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
