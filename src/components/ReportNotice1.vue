<template>
  <div
    class="pl-[154px] flex flex-col items-end w-full max-md:max-w-full max-lg:pl-0"
  >
    <section
      class="flex gap-0 self-end mt-8 w-full text-base font-bold text-cyan-900 max-md:max-w-full"
    >
      <div
        class="justify-center flex items-center p-2.5 ml-px flex-1 bg-indigo-50 max-md:px-5 max-md:max-w-full min-w-96 max-2xl:min-w-72 max-xl:min-w-40 max-lg:min-w-32 max-lg:text-sm max-md:text-xs"
      >
        예시 문장
      </div>
      <div
        class="justify-center py-2.5 text-center bg-blue-100 grow max-lg:text-sm max-md:text-xs"
      >
        절대로<br />바꿀 수 없어요
      </div>
      <div
        class="justify-center py-2.5 text-center bg-blue-100 grow max-lg:text-sm max-md:text-xs"
      >
        약간<br />바꿀 수 있어요
      </div>
      <div
        class="justify-center py-2.5 text-center bg-blue-100 grow max-lg:text-sm max-md:text-xs"
      >
        어느 정도<br />바꿀 수 있어요
      </div>
      <div
        class="justify-center py-2.5 text-center bg-blue-100 grow max-lg:text-sm max-md:text-xs"
      >
        대체로<br />바꿀 수 있어요
      </div>
      <div
        class="justify-center py-2.5 text-center bg-blue-100 grow max-lg:text-sm max-md:text-xs"
      >
        완전히<br />바꿀 수 있어요
      </div>
    </section>

    <section
      class="flex gap-0 self-end w-full text-base font-bold text-cyan-900 max-md:max-w-full"
    >
      <div
        class="flex items-center p-2.5 ml-px flex-1 max-md:px-5 max-md:max-w-full min-w-96 border-stone-200 border-solid border-b font-medium leading-6 text-left pl-5 max-2xl:min-w-72 max-xl:min-w-40 max-lg:min-w-32 max-lg:text-sm max-md:text-xs"
      >
        학교에서 단짝친구 외에 다른 친구와
        <br />
        활동이나 놀이를 해보도록
        <br />
        바꿀 수 있나요?
      </div>
      <div
        class="justify-center min-h-[120px] py-2.5 text-center flex grow border-stone-200 border-solid border-b"
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
        class="justify-center py-2.5 text-center flex grow border-stone-200 border-solid border-b"
      >
        <label
          for="option2"
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
        class="justify-center py-2.5 text-center flex grow border-stone-200 border-solid border-b"
      >
        <label
          for="option3"
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
        class="justify-center py-2.5 text-center flex grow border-stone-200 border-solid border-b"
      >
        <label
          for="option4"
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
        class="justify-center py-2.5 text-center flex grow border-stone-200 border-solid border-b"
      >
        <label
          for="option5"
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
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'ReportNotice1',
  components: {},
  props: {},
  setup(props, { emit }) {
    const route = useRoute();
    const type = ref(route.params.type || 1);
    const score = ref();

    watch(score, (newValue, oldValue) => {
      emit('allowNext', !!newValue);
    });

    return {
      type,
      score,
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
