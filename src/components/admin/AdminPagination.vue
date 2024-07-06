<template>
  <div class="flex justify-center items-center gap-[10px] w-full">
    <IDButton
      class="hover:bg-[#2F80ED] hover:text-white"
      :text="'<<'"
      :isGray="true"
    />
    <IDButton
      class="hover:bg-[#2F80ED] hover:text-white"
      :text="'<'"
      :isGray="true"
    />
    <IDButton
      v-for="i in range"
      :key="i"
      class="hover:bg-[#2F80ED] hover:text-white"
      :text="i + ''"
      :isGray="i !== pageNo"
    />
    <IDButton
      class="hover:bg-[#2F80ED] hover:text-white"
      :text="'>'"
      :isGray="true"
    />
    <IDButton
      class="hover:bg-[#2F80ED] hover:text-white"
      :text="'>>'"
      :isGray="true"
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
    const range = computed(() => {
      if (!props.pageNo || !props.recordCount || !props.totalCount) return [];
      let start = props.pageNo - ((props.pageNo - 1) % props.recordCount);
      let end =
        props.pageNo + 9 > props.totalCount
          ? props.totalCount
          : props.pageNo + 9;

      const array = [];

      for (let i = start; i < end; i++) {
        array.push(i);
      }
      return array;
    });

    return {
      range,
    };
  },
};
</script>
