<template>
  <div class="flex justify-start mx-[40px] my-[20px]">
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px]">설문관리</p>
      <div class="flex items-center gap-[20px]">
        <select class="min-w-[98px] h-[36px] border border-gray-300 rounded-sm" name="" id="">
          <option value="">대상</option>
        </select>
        <select class="min-w-[98px] h-[36px] border border-gray-300 rounded-sm" name="" id="">
          <option value="">정렬</option>
        </select>
      </div>
      <table class="border border-collapse border-gray-300 w-full">
        <thead>
          <tr class="bg-gray-300">
            <th class="border border-collapse border-gray-500 p-[10px]"><input type="checkbox"></th>
            <th class="border border-collapse border-gray-500 p-[10px]">번호</th>
            <th class="border border-collapse border-gray-500 p-[10px]">활동명</th>
            <th class="border border-collapse border-gray-500 p-[10px]">대상</th>
            <th class="border border-collapse border-gray-500 p-[10px]">기간</th>
            <th class="border border-collapse border-gray-500 p-[10px]">상세</th>
            <th class="border border-collapse border-gray-500 p-[10px]">관리</th>
          </tr>
        </thead>
        <tbody>
            <tr class="border border-collapse border-gray-500">
              <td class="border border-collapse border-gray-500 p-[10px]"><input type="checkbox"></td>
              <td class="border border-collapse border-gray-500 p-[10px]">1</td>
              <td class="border border-collapse border-gray-500 p-[10px]">마음알기설문1</td>
              <td class="border border-collapse border-gray-500 p-[10px]">관리>설정을 해주세요.</td>
              <td class="border border-collapse border-gray-500 p-[10px]">관리>설정을 해주세요.</td>
              <td class="border border-collapse border-gray-500 p-[10px]">-</td>
              <td class="flex items-center justify-center p-[10px]"><img class="w-[28px] h-[28px]" src="@/assets/img/ico-gear.png" alt=""></td>
            </tr>
            <tr class="border border-collapse border-gray-500">
              <td class="border border-collapse border-gray-500 p-[10px]"><input type="checkbox"></td>
              <td class="border border-collapse border-gray-500 p-[10px]">2</td>
              <td class="border border-collapse border-gray-500 p-[10px]">마음알기설문2</td>
              <td class="border border-collapse border-gray-500 p-[10px]">초3, 초4, 초5, 초6, 경남중학교, 경남시범초등학교</td>
              <td class="border border-collapse border-gray-500 p-[10px]">2023년 1월 1일 ~ 3월 1일까지</td>
              <td class="border border-collapse border-gray-500 p-[10px]"><button class="rounded-xl bg-blue-500 w-[84px] h-[27px] text-white ">상세보기</button></td>
              <td class="flex items-center justify-center p-[10px]"><img class="w-[28px] h-[28px]" src="@/assets/img/ico-gear.png" alt=""></td>
            </tr>
            <tr class="border border-collapse border-gray-500">
              <td class="border border-collapse border-gray-500 p-[10px]"><input type="checkbox"></td>
              <td class="border border-collapse border-gray-500 p-[10px]">3</td>
              <td class="border border-collapse border-gray-500 p-[10px]">마음알기설문3</td>
              <td class="border border-collapse border-gray-500 p-[10px]">초3, 초4, 초5, 초6</td>
              <td class="border border-collapse border-gray-500 p-[10px]">2023년 1월 1일 ~ 4월 1일까지</td>
              <td class="border border-collapse border-gray-500 p-[10px]"><button class="rounded-xl bg-blue-500 w-[84px] h-[27px] text-white ">상세보기</button></td>
              <td class="flex items-center justify-center p-[10px]"><img class="w-[28px] h-[28px]" src="@/assets/img/ico-gear.png" alt=""></td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import IDService from '@/service/IDService.js';

export default {
  name: 'IDManageReportView',
  components: {
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const IDStore = useIDStore();
    const email = ref('');
    const password = ref('');

    return {
      email,
      password,
    };
  },
};
</script>

<style scoped></style>
