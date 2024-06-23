<template>
  <div class="flex flex-col flex-1 text-base font-medium">
    <span class="text-left mt-10"> 태어난 년도와 월을 선택해주세요. </span>

    <div class="mt-[65px] flex gap-7 justify-center items-center">
      <div class="flex gap-[20px]">
        <AppDropdown
          v-if="selectedOption"
          :options="options"
          :startText="selectedOption"
          @update:selectedOption="handleSelection1"
        />
        <AppDropdown
          v-if="selectedOption2"
          :options="options2"
          :startText="selectedOption2"
          @update:selectedOption="handleSelection2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  components: {
    AppDropdown,
  },
  setup(props, { emit }) {
    const year = ref();
    const month = ref();

    const options = ref(['2014', '2015', '2016']);
    const selectedOption = ref('');

    const options2 = ref([
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ]);
    const selectedOption2 = ref('');

    onMounted(() => {
      const currentYear = new Date().getFullYear();
      const yearsArray = [];
      for (let i = currentYear - 30; i <= currentYear; i++) {
        yearsArray.push(i.toString());
      }
      options.value = yearsArray.reverse();
      selectedOption.value = options.value[0];
      emit('changeYear', options.value[0]);

      selectedOption2.value = options2.value[0];
      emit('changeMonth', options2.value[0]);
    });

    const handleSelection1 = (v) => {
      emit('changeYear', v);
    };
    const handleSelection2 = (v) => {
      emit('changeMonth', v);
    };

    return {
      year,
      month,
      options,
      selectedOption,
      handleSelection1,
      options2,
      selectedOption2,
      handleSelection2,
    };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
