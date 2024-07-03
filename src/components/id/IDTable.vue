<template>
  <table
    class="border border-collapse border-gray-300 w-full"
    v-if="header.length"
  >
    <thead>
      <tr class="bg-gray-300 flex">
        <th
          class="border border-collapse border-gray-500 p-[10px]"
          v-for="(v, i) in header"
          :class="{
            ...(v.isFlex1 && { 'flex-1': true }),
          }"
          :style="{
            ...(v.width && { width: `${v.width}px` }),
          }"
          :key="`${v.text}${i}`"
        >
          <input type="checkbox" v-if="v.isCheckbox" />
          <span v-if="v.text">
            {{ v.text }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody v-if="body.length">
      <tr
        class="border border-collapse border-gray-500"
        v-for="(info, i) in body"
        :key="`${v.id}${i}`"
      >
        <td
          class="border border-collapse border-gray-500 p-[10px] flex"
          v-for="(v, j) in info"
          :class="{
            ...(v.isFlex1 && { 'flex-1': true }),
          }"
          :style="{
            ...(v.width && { width: `${v.width}px` }),
          }"
          :key="`${i}${j}`"
        >
          <input type="checkbox" v-if="v.isCheckbox" />
          <span v-if="v.text">
            {{ v.text }}
          </span>
          <button v-if="v.isButton">
            {{ v.text }}
          </button>
          <div class="flex-1" v-if="v.isOpenPopup">
            <img
              class="w-[28px] h-[28px]"
              src="@/assets/img/ico-gear.png"
              alt=""
            />
          </div>
          <div class="flex-1" v-if="v.isManage">연구소 관리자 관리</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { computed } from 'vue';
export default {
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
    return {};
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
