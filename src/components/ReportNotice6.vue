<template>
  <div
    class="flex flex-col pl-[154px] grow shrink-0 self-end font-medium text-black basis-0 w-fit max-md:max-w-full"
  >
    <section
      class="justify-center mt-3 items-start px-9 py-6 text-left text-base leading-8 rounded-xl border border-solid border-neutral-300 max-md:px-5 max-md:mt-10 max-md:max-w-full"
    >
      {{ $t('report6.ex_question') }}
    </section>

    <section
      class="self-center px-4 pt-7 pb-3 mt-3 w-full rounded-xl border border-solid border-neutral-300 max-md:px-5"
    >
      <div class="flex gap-5 max-md:flex-col max-md:gap-0">
        <div class="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
          <FaceImg
            :face="face[faceIndex]"
            :eyes="eyesIndex >= 0 && eyes[eyesIndex - 1]"
            :mouth="mouthIndex >= 0 && mouth[mouthIndex - 1]"
          />
        </div>
        <div class="flex ml-5 w-[56%] max-md:ml-0 max-md:w-full">
          <FaceSelectList
            :title="$t('report6.view_question1')"
            :itemList="eyes"
            :selected="eyesIndex"
            @selectItem="(index) => selectIndex(index, 'eyes')"
          />
          <div
            class="mx-2 h-full border-2 border-l border-solid border-gray-700"
          ></div>
          <FaceSelectList
            :title="$t('report6.view_question2')"
            :itemList="mouth"
            :selected="mouthIndex"
            @selectItem="(index) => selectIndex(index, 'mouth')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FaceImg from '@/components/FaceImg.vue';
import FaceSelectList from '@/components/FaceSelectList.vue';

export default {
  name: 'ReportNotice6',
  components: { FaceImg, FaceSelectList },
  props: {},
  setup(props, { emit }) {
    const route = useRoute();
    const type = ref(route.params.type || 6);
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

    const selectIndex = (index, type) => {
      if (type === 'eyes') eyesIndex.value = index;
      if (type === 'mouth') mouthIndex.value = index;
    };

    // watch를 사용하여 두 변수를 감시
    watch(
      [eyesIndex, mouthIndex],
      ([newEyesIndex, newMouthIndex], [oldEyesIndex, oldMouthIndex]) => {
        if (newEyesIndex >= 0 && newMouthIndex >= 0) {
          emit('allowNext', true);
        } else {
          emit('allowNext', false);
        }
      }
    );

    return {
      type,
      face,
      eyes,
      mouth,
      faceIndex,
      eyesIndex,
      mouthIndex,
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
</style>
