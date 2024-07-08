<template>
  <div class="w-full overflow-auto">
    <table class="w-full" v-if="header.length">
      <thead>
        <tr class="bg-gray-100">
          <th
            class="border-t-2 border-gray-500 p-[10px]"
            v-for="(v, i) in header"
            :class="{
              ...(v.isFlex1 && { 'flex-1': true }),
            }"
            :style="{
              ...(v.width && { width: `${v.width}px` }),
            }"
            :key="`${v.text}${i}`"
          >
            <input type="checkbox" class="min-w-[35px]" v-if="v.isCheckbox" />
            <span class="whitespace-nowrap" v-else-if="v.text">
              {{ v.text }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody v-if="!body.length">
        <tr>
          <td :colspan="header.length" class="text-center text-sm py-4 border-b-2 border-gray-100">검색 결과가 존재하지 않습니다.</td>
        </tr>
      </tbody>
      <tbody v-if="body.length">
        <tr v-for="(info, i) in body" :key="`bodytr${i}`">
          <td
            class="p-[10px]"
            v-for="(v, j) in info"
            :class="{
              ...(v.isFlex1 && { 'flex-1': true }),
            }"
            :style="{
              ...(v.width && { width: `${v.width}px` }),
            }"
            :key="`${i}${j}`"
          >
            <input class="min-w-[35px]" type="checkbox" v-if="v.isCheckbox" />
            <IDButtonVue
              v-else-if="v.isButton"
              class="rounded-xl whitespace-nowrap"
              :text="v.isButton"
              :isWhite="false"
            />
            <div class="flex gap-[10px]" v-else-if="v.button1 && v.button2">
              <IDButtonVue
                class="rounded-xl whitespace-nowrap hover:bg-[#2F80ED] hover:text-white"
                :text="v.button1"
                :isWhite="true"
              />
              <IDButtonVue
                class="rounded-xl whitespace-nowrap hover:bg-[#2F80ED] hover:text-white"
                :text="v.button2"
                :isWhite="true"
              />
            </div>
            <div
              class="cursor-pointer min-w-[45px] flex flex-1 justify-center items-center w-full"
              v-else-if="v.isOpenPopup"
            >
              <img
                class="w-[28px] h-[28px]"
                src="@/assets/img/ico-gear.png"
                alt=""
              />
            </div>
            <div class="flex-1" v-else-if="v.isManage">연구소 관리자 관리</div>
            <div
              class="flex-1 flex justify-center"
              v-else-if="v.isEdit"
              @click="goEdit(v.id)"
            >
              <img
                class="w-[28px] h-[28px]"
                src="@/assets/img/edit.png"
                alt="edit"
              />
            </div>
            <div
              class="flex-1 flex justify-center"
              v-else-if="v.isEditWidthDelete"
            >
              <img
                class="w-[28px] h-[28px]"
                src="@/assets/img/edit.png"
                alt="edit"
                @click="goEdit(v.id)"
              />
              <img
                class="w-[28px] h-[28px] ml-1"
                src="@/assets/img/trash.png"
                alt="edit"
                @click="doDelete(v.id)"
              />
            </div>
            <div v-else-if="v.isDetail" class="flex justify-center">
              <button
                class="py-2 px-4 rounded-[10px] items-center border-[#CECECE] border flex gap-1.5"
                @click="() => goDetail(v.id)"
              >
                <img class="w-4 h-4" src="@/assets/img/menu.png" />
                하위코드관리
              </button>
            </div>
            <span v-else-if="v.text" class="whitespace-nowrap">
              {{ v.text }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from 'vue';
import IDButtonVue from '@/components/id/IDButton.vue';

export default {
  components: {
    IDButtonVue,
  },
  props: {
    header: {
      type: Array,
      default: () => [],
    },
    body: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const goEdit = (id) => {
      emit('goEdit', id);
    };
    const doDelete = (id) => {
      emit('doDelete', id);
    };
    const goDetail = (id) => {
      emit('goDetail', id);
    };
    return { goEdit, doDelete, goDetail };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
