<template>
  <div
    class="pl-[154px] flex flex-col items-end w-full max-md:max-w-full max-lg:pl-0"
  >
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
          src="@/assets/img/3qexample.png"
          alt="Example Image"
          class="self-center mt-6 max-w-full aspect-[2.5] w-[371px]"
        />
      </div>
      <div
        class="flex gap-5 px-9 justify-between self-center mt-9 w-full text-xl leading-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full"
      >
        <label
          for="option1"
          class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer"
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
            class="justify-center px-16 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-6 max-lg:text-sm max-md:text-xs 2xl:px-24 max-xl:px-12"
          >
            {{ $t('report3.ex_answer1') }}
          </div>
        </label>
        <label
          for="option2"
          class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer"
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
            class="justify-center px-16 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-6 max-lg:text-sm max-md:text-xs 2xl:px-24 max-xl:px-12"
          >
            {{ $t('report3.ex_answer2') }}
          </div>
        </label>
        <label
          for="option3"
          class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer"
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
            class="justify-center px-16 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-6 max-lg:text-sm max-md:text-xs 2xl:px-24 max-xl:px-12"
          >
            {{ $t('report3.ex_answer3') }}
          </div>
        </label>
        <label
          for="option4"
          class="shrink-0 self-stretch my-auto flex justify-center items-center cursor-pointer"
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
            class="justify-center px-16 py-3 rounded-xl border border-solid border-neutral-300 max-md:px-6 max-lg:text-sm max-md:text-xs 2xl:px-24 max-xl:px-12"
          >
            {{ $t('report3.ex_answer4') }}
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
  name: 'LoginView',
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
input:checked + div {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity));

  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
</style>
