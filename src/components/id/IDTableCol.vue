<template>
  <div class="w-full overflow-y-visible">
    <table
        class="w-full border-t-2 border-gray-300"
        v-if="data.length"
    >
      <tr v-for="item in data" :key="item">
        <th class="bg-gray-100 px-4 text-left min-w-[100px] text-sm text-nowrap" :class="{ 'essential' : item.isRequired}">
          {{ item.header }}
        </th>
        <td class="flex justify-start px-4 py-2">
          <input v-if="item.body.isText" class="text-sm border border-gray-300 px-4 py-2 min-w-[300px] rounded-md" type="text" :placeholder="item.body.placeholder">
          <div v-if="item.body.isPhone" class="flex gap-[10px] items-center">
            <AppDropdown
              v-if="selectedOption"
              :options="options"
              :startText="selectedOption"
              :openFull="true"
              @update:selectedOption="handleSelection1"
            />
            <input class="text-sm border border-gray-300 px-4 py-2 min-w-[150px]] rounded-md" type="text">
            <input class="text-sm border border-gray-300 px-4 py-2 min-w-[150px] rounded-md" type="text">
          </div>
          <div v-if="item.body.isEmail" class="flex gap-[10px] items-center">
            <input class="text-sm border border-gray-300 px-4 py-2 min-w-[150px]] rounded-md" type="text">
            <p>@</p>
            <input class="text-sm border border-gray-300 px-4 py-2 min-w-[150px] rounded-md" type="text">
            <AppDropdown
              v-if="selectedOption2"
              :options="options2"
              :startText="selectedOption2"
              :openFull="true"
              @update:selectedOption="handleSelection1"
            />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  components: {
    AppDropdown
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const options = ref(['국번']);
    const options2 = ref(['작접입력']);
    const selectedOption = ref('국번');
    const selectedOption2 = ref('직접입력');

    return {
      options,
      options2,
      selectedOption,
      selectedOption2,
    };
  },
};
</script>

<style>
  th.essential::after {
    content: '*';
    color: red;
    position: absolute;
  }
</style>
