<template>
  <div class="w-full overflow-auto text-sm">
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
            <span class="whitespace-nowrap" v-if="v.text">
              {{ v.text }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody v-if="body.length">
        <tr
          class="hover:bg-gray-50"
          v-for="(info, i) in body"
          :class="{
            hidden: body[i][0]?.disable,
          }"
          :key="`bodytr${i}`"
        >
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
            <span v-else-if="v.isNum" class="whitespace-nowrap">
              {{ i + 1 }}
            </span>
            <IDButtonVue
              v-else-if="v.isButton"
              class="rounded-xl whitespace-nowrap"
              :text="v.isButton"
              :isWhite="false"
              @click="() => onClick(v.id)"
            />
            <div class="flex gap-[10px] justify-center" v-else-if="v.isButton2">
              <button
                class="edit border border-[#2F80ED] rounded-[5px] px-3 py-3 text-sm font-semibold whitespace-nowrap hover:bg-[#2F80ED] hover:text-white"
              ></button>
              <button
                class="trash border border-[#2F80ED] rounded-[5px] px-3 py-3 text-sm font-semibold whitespace-nowrap hover:bg-[#2F80ED] hover:text-white"
              ></button>
            </div>
            <div
              class="cursor-pointer min-w-[45px] flex flex-1 justify-center items-center w-full"
              v-else-if="v.isOpenPopup"
            >
              <img
                class="w-[28px] h-[28px]"
                src="@/assets/img/ico-gear.png"
                alt=""
                @click="() => openPopup(v.isOpenPopup)"
              />
            </div>
            <div class="flex-1" v-else-if="v.isManage">연구소 관리자 관리</div>

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
import { useStateStore } from '@/store/stateStore.js';

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
    const stateStore = useStateStore();

    const onClick = (v) => {
      emit('onClick', v);
    };

    const openPopup = (index) => {
      stateStore.openPopup();
      stateStore.setPopupReportIndex(index);
    };

    return {
      onClick,
      openPopup,
    };
  },
};
</script>

<style>
.edit {
  background-image: url('@/assets/img/edit.png');
  background-size: 14px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.edit:hover {
  background-image: url('@/assets/img/edit-hover.svg');
}
.trash {
  background-image: url('@/assets/img/trash.png');
  background-size: 14px 14px;
  background-repeat: no-repeat;
  background-position: center;
}
.trash:hover {
  background-image: url('@/assets/img/trash-hover.svg');
}
</style>
