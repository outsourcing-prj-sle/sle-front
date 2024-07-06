<template>
  <div class="w-full overflow-y-visible">
    <table class="w-full border-t-2 border-gray-300" v-if="data && data.length">
      <tr v-for="(item, index) in data" :key="item">
        <th
          class="bg-gray-100 px-4 text-left min-w-[100px] text-sm text-nowrap min-h-11"
          :class="{ essential: item.isRequired }"
        >
          {{ item.header }}
        </th>
        <td class="flex justify-start px-4 py-2 min-h-11">
          <div v-if="item.body.isCheckText">
            <div class="flex gap-2.5">
              <input
                class="text-sm border border-gray-300 px-4 py-2 min-w-[300px] rounded-md"
                type="text"
                :placeholder="item.body.placeholder"
                :value="item.value"
                @input="updateValue($event.target.value, index)"
              />
              <AdminButton
                :text="'중복확인'"
                :isWhite="true"
                @onClick="() => updateEvent('', index, 'checkSite')"
              />
            </div>
            <div
              v-if="item.isChecked"
              class="text-xs text-green-400 mt-1 text-left"
            >
              사용가능한 도메인입니다.
            </div>
          </div>
          <div
            v-else-if="item.body.isPhone"
            class="flex gap-[10px] items-center"
          >
            <AppDropdown
              v-if="selectedOption"
              :options="options"
              :startText="selectedOption"
              :openFull="true"
              @update:selectedOption="(v) => handleSelection('isPhone', v)"
            />
            <input
              class="text-sm border border-gray-300 px-4 py-2 min-w-[150px]] rounded-md"
              type="text"
            />
            <input
              class="text-sm border border-gray-300 px-4 py-2 min-w-[150px] rounded-md"
              type="text"
            />
          </div>
          <div
            v-else-if="item.body.isEmail"
            class="flex gap-[10px] items-center"
          >
            <input
              class="text-sm border border-gray-300 px-4 py-2 min-w-[150px]] rounded-md"
              type="text"
            />
            <p>@</p>
            <input
              class="text-sm border border-gray-300 px-4 py-2 min-w-[150px] rounded-md"
              type="text"
            />
            <AppDropdown
              v-if="selectedOption2"
              :options="options2"
              :startText="selectedOption2"
              :openFull="true"
              @update:selectedOption="(v) => handleSelection('isEmail', v)"
            />
          </div>
          <div class="flex gap-2.5" v-if="item.body.isYesNo">
            <input
              type="radio"
              :id="`isYesNo_yes${index}`"
              value="1"
              v-model="item.value"
              @input="updateValue(1, index)"
            />
            <label for="isYesNo_yes">예</label>

            <input
              type="radio"
              class="ml-10"
              :id="`isYesNo_no${index}`"
              value="0"
              v-model="item.value"
              @input="updateValue(0, index)"
            />
            <label for="isYesNo_no">아니요</label>
          </div>
          <textarea
            v-else-if="item.body.isTextArea"
            class="text-sm border border-gray-300 px-4 py-2 min-w-[300px] h-[100px] resize-none overflow-y-scroll rounded-md"
            :placeholder="item.body.placeholder"
            :value="item.value"
            @input="updateValue($event.target.value, index)"
          >
          </textarea>
          <div v-if="item.body.isUpload">
            <input
              type="file"
              @change="(e) => updateValue(e.target.files[0], index)"
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
import AdminButton from '@/components/admin/AdminButton.vue';

export default {
  components: {
    AppDropdown,
    AdminButton,
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
    const options = ref(['국번']);
    const options2 = ref(['작접입력']);
    const selectedOption = ref('국번');
    const selectedOption2 = ref('직접입력');

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

    const handleSelection = (e, v) => {
      switch (e) {
        case 'isPhone':
          break;
        case 'isEmail':
          break;
      }
    };

    return {
      options,
      options2,
      selectedOption,
      selectedOption2,
      data,

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
