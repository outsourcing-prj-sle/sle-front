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
            v-else-if="item.body.isUserType"
            class="flex gap-[10px] items-center z-50"
          >
            <AppDropdown
              v-if="selectedOption3"
              :options="options3"
              :startText="item.value || selectedOption3"
              :openMax="true"
              @update:selectedOption="(v) => handleSelection('isUserType', v)"
            />
          </div>
          <div
            v-else-if="item.body.isCode"
            class="flex gap-[10px] items-center z-50"
          >
            <AppDropdown
              v-if="selectedOption4"
              :options="options4"
              :startText="item.value || selectedOption4"
              :openMax="true"
              @update:selectedOption="(v) => handleSelection('isCode', v)"
            />
          </div>
          <div
            v-else-if="item.body.isEmail"
            class="flex gap-[10px] items-center"
          >
            <input
              class="text-sm border border-gray-300 px-4 py-2 min-w-[150px]] rounded-md"
              type="text"
              :value="item.value1"
              @input="updateEvent($event.target.value, index, 'value1')"
            />
            <p>@</p>
            <input
              class="text-sm border border-gray-300 px-4 py-2 min-w-[150px] rounded-md"
              type="text"
              :initial-value="item.value2"
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
          <div class="flex gap-2.5" v-else-if="item.body.isYesNo">
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
          <div v-else-if="item.body.isUpload">
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
    const options4 = ref([
      '전자정부프레임워크 공통서비스',
      'SEL 시스템 서비스',
    ]);
    const selectedOption4 = ref('전자정부프레임워크 공통서비스');
    const options3 = ref(['선택', '교육청관리자', '최고관리자', '기관관리자']);
    const selectedOption3 = ref('선택');
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
    const emailSecond = ref('');

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
      options3,
      selectedOption3,
      options4,
      selectedOption4,
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
