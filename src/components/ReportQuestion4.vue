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
      <!-- todo : 1초간 사진이 보여집니다 말풍선 -->
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
          <p
            class="text-left max-md:mr-1.5 max-md:max-w-full max-lg:text-sm max-md:text-xs"
          >
            {{ $t('report4.question') }}
          </p>
          <img
            v-if="questionImgList.length"
            :src="questionImgList[questionImgIndex]"
            alt="questionImg"
            class="self-center mt-6 max-w-full h-[476px]"
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
              {{ $t('report4.answer1') }}
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
              {{ $t('report4.answer2') }}
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
              {{ $t('report4.answer3') }}
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
              {{ $t('report4.answer4') }}
            </div>
          </label>

          <label
            for="option5"
            class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer flex-1"
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
              class="justify-center px-3 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-8 max-lg:text-sm max-md:text-xs w-full"
            >
              {{ $t('report4.answer5') }}
            </div>
          </label>

          <label
            for="option6"
            class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer flex-1"
          >
            <input
              class="hidden"
              type="radio"
              name="activityQuestion"
              id="option6"
              value="6"
              v-model="score"
            />
            <div
              class="justify-center px-3 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-8 max-lg:text-sm max-md:text-xs w-full"
            >
              {{ $t('report4.answer6') }}
            </div>
          </label>
        </div>
      </section>
      <section
        class="justify-center text-left items-start px-7 py-7 mt-8 max-w-full text-base font-medium leading-8 text-black rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:max-w-full max-lg:text-sm max-md:text-xs w-full"
      >
        {{ $t('report4.announce_content2') }}
      </section>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';

export default {
  name: 'ReportQuestion4',
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
    const questionImgList = ref([]);
    const questionImgIndex = ref(0);
    const interval = ref();

    onMounted(() => {
      changeImg(props._currentStep);
    });

    watch(
      () => props._currentStep,
      (newVal) => {
        currentStep.value = newVal || null;
        changeImg(newVal);
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
      }
    );

    watch(
      () => score,
      (newVal) => {
        emit('handleAnswer', newVal);
      }
    );

    const changeImg = (s = 1) => {
      if (!s) {
        return;
      }
      questionImgList.value = [
        require('@/assets/img/4qThree.png'),
        require('@/assets/img/4qTwo.png'),
        require('@/assets/img/4qOne.png'),
        require(`@/assets/img/4q${s}.png`),
        require('@/assets/img/4qBlack.png'),
      ];

      clearInterval(interval.value);
      questionImgIndex.value = 0;

      interval.value = setInterval(() => {
        // todo : questionImgIndex.value 따라서 말풍선 말도 바꾸기
        questionImgIndex.value++;
        if (questionImgIndex.value > 4) {
          questionImgIndex.value = 4;
          clearInterval(interval.value);
        }
      }, 1000);
    };

    return {
      currentStep,
      page,
      score,
      questionImgList,
      questionImgIndex,
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
