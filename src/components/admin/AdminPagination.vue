<template>
  <div class="flex justify-center items-center gap-[10px] w-full">
    <IDButton
      class="hover:bg-[#2F80ED] hover:text-white"
      :text="'<<'"
      :isGray="true"
      :class="{
        'opacity-0': !isPPrev,
      }"
      @click="() => updatePage('pprev')"
    />
    <IDButton
      class="hover:bg-[#2F80ED] hover:text-white"
      :text="'<'"
      :isGray="true"
      :class="{
        'opacity-0': !isPrev,
      }"
      @click="() => updatePage('prev')"
    />
    <IDButton
      v-for="i in range"
      :key="i"
      class="hover:bg-[#2F80ED] hover:text-white"
      :text="i + ''"
      :isGray="i !== pageNo"
      @click="() => updatePage(i)"
    />
    <IDButton
      class="hover:bg-[#2F80ED] hover:text-white"
      :class="{
        'opacity-0': !isNext,
      }"
      :text="'>'"
      :isGray="true"
      @click="() => updatePage('next')"
    />
    <IDButton
      class="hover:bg-[#2F80ED] hover:text-white"
      :text="'>>'"
      :isGray="true"
      :class="{
        'opacity-0': !isNNext,
      }"
      @click="() => updatePage('nnext')"
    />
  </div>
</template>

<script>
import IDButton from '@/components/id/IDButton.vue';
import { computed } from 'vue';

export default {
  components: {
    IDButton,
  },
  props: {
    pageNo: {
      type: Number,
      required: true,
    },
    recordCount: {
      type: Number,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const totalPage = computed(() => {
      return parseInt((props.totalCount - 1) / 10 + 1);
    });
    const isNext = computed(() => {
      let result = true;
      if (props.pageNo >= totalPage.value) result = false;
      return result;
    });
    const isNNext = computed(() => {
      let result = true;
      if (range.value.length < props.recordCount) result = false;
      return result;
    });
    const isPrev = computed(() => {
      let result = true;
      if (props.pageNo <= 1) result = false;
      return result;
    });
    const isPPrev = computed(() => {
      let result = true;
      if (props.pageNo <= 10) result = false;
      return result;
    });
    const range = computed(() => {
      if (!props.pageNo || !props.recordCount || !props.totalCount) return [];

      let start = props.pageNo - ((props.pageNo - 1) % props.recordCount);
      let end = start + 9 > totalPage.value ? totalPage.value : start + 9;

      const array = [];

      for (let i = start; i <= end; i++) {
        array.push(i);
      }
      return array;
    });

    const updatePage = (v) => {
      switch (v) {
        case 'next':
          emit('updatePage', props.pageNo + 1);
          break;
        case 'nnext':
          emit('updatePage', totalPage.value);
          break;
        case 'prev':
          emit('updatePage', props.pageNo - 1);
          break;
        case 'pprev':
          emit('updatePage', 1);
          break;
        default:
          emit('updatePage', v);
          break;
      }
    };

    return {
      range,
      updatePage,
      isNext,
      isNNext,
      isPrev,
      isPPrev,
    };
  },
};
</script>
