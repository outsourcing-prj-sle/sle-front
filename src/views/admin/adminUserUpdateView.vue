<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">
        {{ userType }} 수정
      </p>
      <AdminTableCol :data="data" :isRequired="true" />
      <div class="flex w-full gap-[20px] justify-center">
        <AdminButton :text="'등록'" :isWhite="false" />
        <AdminButton
          :text="'목록'"
          :isWhite="true"
          @onClick="goResearchListVw"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import AdminService from '@/service/AdminService.js';
import AdminTableCol from '@/components/admin/AdminTableCol.vue';
import AdminButton from '@/components/admin/AdminButton.vue';

export default {
  name: 'adminUserUpdateView',
  components: {
    AdminTableCol,
    AdminButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userType = computed(() => parseToKo(route.params.userType));
    const data = [
      {
        header: '이름',
        body: {
          isText: true,
        },
        isRequired: true,
      },
      {
        header: '아이디',
        body: {
          isText: true,
        },
        isRequired: true,
      },
      {
        header: '비밀번호',
        body: {
          isText: true,
        },
        isRequired: true,
      },
      {
        header: '회원구분',
        body: {
          isText: true,
          placeholder: '연구소관리자',
        },
      },
      {
        header: '핸드폰번호',
        body: {
          isPhone: true,
        },
        isRequired: true,
      },
      {
        header: '이메일',
        body: {
          isEmail: true,
        },
        isRequired: true,
      },
    ];

    const handleSelection1 = (v) => {
      console.log(v);
    };

    const goResearchListVw = () => {
      router.push({ name: 'IDManageResearchView' });
    };

    const parseToKo = (v) => {
      let result = '';
      switch (v) {
        case 'school':
          result = '학교';
          break;
        case 'teacher':
          result = '교사';
          break;
        case 'student':
          result = '학생';
          break;
      }
      return result;
    };

    return {
      data,

      handleSelection1,
      goResearchListVw,
    };
  },
};
</script>

<style scoped></style>
