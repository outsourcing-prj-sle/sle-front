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
        <p>{{ $t('report6.announce_content4') }}</p>
      </div>
    </div>

    <div
      class="flex relative gap-40 justify-center mt-12 max-w-full w-full max-md:flex-wrap max-md:mt-10"
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
            class="text-left max-md:mr-1.5 max-md:max-w-full"
            v-html="$t(`report6.question${currentStep}`)"
          ></p>
          <div
            class="flex gap-5 max-md:flex-col max-md:gap-0"
            :class="{
              'pointer-events-none': status === 'done',
            }"
          >
            <div class="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
              <FaceImg
                :face="face[faceIndex]"
                :eyes="score > 0 ? eyes[score - 1] : ''"
                :mouth="score2 > 0 ? mouth[score2 - 1] : ''"
              />
            </div>
            <div class="flex ml-5 w-[56%] max-md:ml-0 max-md:w-full">
              <FaceSelectList
                :title="'눈'"
                :itemList="eyes"
                :selected="parseInt(score)"
                @selectItem="(index) => selectIndex(index, 'eyes')"
              />
              <div
                class="mx-2 h-full border-2 border-l border-solid border-gray-700"
              ></div>
              <FaceSelectList
                :title="'코와 입'"
                :itemList="mouth"
                :selected="parseInt(score2)"
                @selectItem="(index) => selectIndex(index, 'mouth')"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        class="justify-center text-left items-start px-7 py-7 mt-8 max-w-full text-base font-medium leading-8 text-black rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:max-w-full max-lg:text-sm max-md:text-xs w-full"
      >
        {{ $t('report6.announce_content3') }}
      </section>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import FaceImg from '@/components/FaceImg.vue';
import FaceSelectList from '@/components/FaceSelectList.vue';

export default {
  name: 'ReportQuestion6',
  components: { FaceImg, FaceSelectList },
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
    const score2 = ref(null);
    const ballonKey = ref(Date.now());
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
      () => props._currentAnswer2,
      (newVal) => {
        score2.value = newVal || null;
      }
    );

    watch(
      () => props._page,
      (newVal) => {
        page.value = newVal;
      }
    );

    watch(
      () => [score.value, score2.value],
      ([s1, s2]) => {
        emit('handleAnswer', s1, s2);
      }
    );

    const selectIndex = (index, type) => {
      if (type === 'eyes') {
        score.value = index;
      }
      if (type === 'mouth') {
        score2.value = index;
      }
    };

    return {
      currentStep,
      page,
      score,
      score2,
      face,
      eyes,
      mouth,
      faceIndex,
      ballonKey,
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
