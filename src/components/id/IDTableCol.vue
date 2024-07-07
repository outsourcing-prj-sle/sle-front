<template>
  <div class="w-full overflow-y-visible">
    <table class="w-full border-t-2 border-gray-300" v-if="data.length">
      <tr v-for="(item, index) in data" :key="item">
        <th
          class="bg-gray-100 px-4 text-left min-w-[100px] text-sm text-nowrap"
          :class="{ essential: item.isRequired }"
        >
          {{ item.header }}
        </th>
        <td class="flex justify-start px-4 py-2">
          <div v-if="item.body.isPhone" class="flex gap-[10px] items-center">
            <AppDropdown
              v-if="selectedOption"
              :options="options"
              :startText="selectedOption"
              :openFull="true"
              @update:selectedOption="(v) => updateEvent(v, index, 'value1')"
            />
            <input
              class="text-sm border border-gray-300 px-4 py-2 min-w-[150px]] rounded-md"
              type="text"
              @input="updateEvent($event.target.value, index, 'value2')"
            />
            <input
              class="text-sm border border-gray-300 px-4 py-2 min-w-[150px] rounded-md"
              type="text"
              @input="updateEvent($event.target.value, index, 'value3')"
            />
          </div>
          <div
            v-else-if="item.body.isEmail"
            class="flex gap-[10px] items-center"
          >
            <input
              class="text-sm border border-gray-300 px-4 py-2 min-w-[150px]] rounded-md"
              type="text"
              @input="updateEvent($event.target.value, index, 'value1')"
            />
            <p>@</p>
            <input
              class="text-sm border border-gray-300 px-4 py-2 min-w-[150px] rounded-md"
              type="text"
              v-model="emailSecond"
              @input="updateEvent($event.target.value, index, 'value2')"
              :disabled="selectedOption2 !== '직접입력'"
            />
            <AppDropdown
              v-if="selectedOption2"
              :options="options2"
              :startText="selectedOption2"
              :openFull="true"
              @update:selectedOption="
                (v) => handleSelection(v, index, 'isEmail')
              "
            />
          </div>
          <input
            v-else-if="item.body.isText"
            class="text-sm border border-gray-300 px-4 py-2 min-w-[300px] rounded-md"
            type="text"
            :placeholder="item.body.placeholder"
            :value="item.value"
            @input="updateValue($event.target.value, index)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import AppDropdown from '@/components/AppDropdown.vue';

export default {
  components: {
    AppDropdown,
  },
  props: {
    _data: {
      type: Array,
      default: () => [],
    },
    changeTableState: {
      type: Object,
      default: () => {
        return {
          index: null,
          key: null,
          value: null,
        };
      },
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const data = ref([]);
    const options = ref(['국번', '010', '011', '016', '017', '018', '019']);
    const options2 = ref([
      '직접입력',
      'gmail.com',
      'yahoo.com',
      'naver.com',
      'daum.net',
      'hotmail.com',
      'outlook.com',
      'icloud.com',
    ]);
    const selectedOption = ref('국번');
    const selectedOption2 = ref('직접입력');
    const emailSecond = ref();

    onMounted(() => {
      data.value = props._data;
      console.log(data.value);
    });

    watch(
      () => props._data,
      (newVal) => {
        if (!data.value.length) data.value = newVal;
      }
    );

    watch(
      () => props.changeTableState,
      (newVal) => {
        console.log('yhs :: newVal');
        console.log(newVal);
        if (newVal.index) {
          const index = newVal.index;
          const key = newVal.key;
          const value = newVal.value;
          data.value[index][key] = value;
        }
      }
    );

    const updateValue = (value, index) => {
      /**
       * handleInputUpdate (valie, index, evnet)
       * 해당 index의 value 값 수정
       */
      emit('handleInputUpdate', value, index);
      data.value[index].value = value;
    };

    const updateEvent = (value, index, event) => {
      /**
       * handleInputUpdate (valie, index)
       * 해당 index의 event 값 수정
       */
      emit('handleEventUpdate', value, index, event);
    };

    const handleSelection = (v, i, e) => {
      if (e === 'isEmail') {
        selectedOption2.value = v;
        if (v === '직접입력') {
          emailSecond.value = '';
        } else {
          emailSecond.value = v;
        }
        emit('handleEventUpdate', v, i, 'value2');
      }
    };

    return {
      options,
      options2,
      selectedOption,
      selectedOption2,
      data,
      emailSecond,

      updateValue,
      updateEvent,
      handleSelection,
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
