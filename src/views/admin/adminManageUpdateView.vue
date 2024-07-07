<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">
        관리자 {{ id ? '수정' : '등록' }}
      </p>
      <AdminTableCol
        :_data="data"
        :changeTableState="changeTableState"
        @handleInputUpdate="handleInputUpdate"
        @handleEventUpdate="handleEventUpdate"
      />
      <div class="flex w-full gap-[20px] justify-center">
        <AdminButton
          :text="id ? '수정' : '등록'"
          :isWhite="false"
          @onClick="submit"
        />
        <AdminButton :text="'목록'" :isWhite="true" @onClick="goAdminManage" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import AdminService from '@/service/AdminService.js';
import AdminTableCol from '@/components/admin/AdminTableCol.vue';
import AdminButton from '@/components/admin/AdminButton.vue';

export default {
  name: 'adminManageUpdateView',
  components: {
    AdminTableCol,
    AdminButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = ref(route.query.id || '');
    const data = ref([]);
    const changeTableState = ref({
      index: null,
      key: null,
      value: null,
    });

    onMounted(async () => {
      if (!id.value) {
        data.value = [
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
              isUserType: true,
              placeholder: '연구소관리자',
            },
            isRequired: true,
            value: '선택',
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
      } else {
        const systemInfoResponse = await AdminService.systemInfo(
          'ip',
          id.value
        );
        const resData = systemInfoResponse.data;

        if (resData.error) {
          alert(resData.error);
          return;
        }

        data.value = [
          {
            header: '이름',
            body: {
              isText: true,
            },
            isRequired: true,
            value: resData.userNm,
          },
          {
            header: '아이디',
            body: {
              isText: true,
            },
            isRequired: true,
            value: resData.userId,
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
              isUserType: true,
              placeholder: '연구소관리자',
            },
            value: resData.userSpaceInfo,
          },
          {
            header: '핸드폰번호',
            body: {
              isPhone: true,
            },
            isRequired: true,
            value1: resData.phoneNumber.split('-')[0],
            value2: resData.phoneNumber.split('-')[1],
            value3: resData.phoneNumber.split('-')[2],
          },
          {
            header: '이메일',
            body: {
              isEmail: true,
            },
            isRequired: true,
            value1: resData.emailAdres.split('@')[0],
            value2: resData.emailAdres.split('@')[1],
          },
        ];
      }
    });

    const submit = async () => {
      let apiData = {};
      console.log(data.value);

      let submitResult;

      if (data.value[0].value) apiData.name = data.value[0].value;
      else {
        alert('이름을 입력해주세요.');
        return;
      }

      if (data.value[1].value) apiData.id = data.value[1].value;
      else {
        alert('아이디를 입력해주세요.');
        return;
      }

      if (data.value[2].value) apiData.password = data.value[2].value;
      else {
        if (!id.value) {
          alert('비밀번호를 입력해주세요.');
          return;
        }
      }

      if (data.value[3].value !== '선택')
        apiData.userRole = data.value[3].value;
      else {
        alert('회원구분을 선택해주세요.');
        return;
      }

      if (
        data.value[4].value1 !== '국번' &&
        data.value[4].value2 &&
        data.value[4].value3
      ) {
        apiData.phoneNumber = `${data.value[4].value1}-${data.value[4].value2}-${data.value[4].value3}`;
      } else {
        alert('핸드폰번호를 확인해주세요.');
        return;
      }

      if (data.value[5].value1 && data.value[5].value2) {
        apiData.userEmail = `${data.value[5].value1}@${data.value[5].value2}`;
      } else {
        alert('이메일을 확인해주세요.');
        return;
      }

      if (id.value) {
        submitResult = await AdminService.signup(apiData);
      } else {
        submitResult = await AdminService.signup(apiData);
      }

      const resData = submitResult.data;
      console.log(resData);
      // router.push({ name: 'adminManageView' });
    };

    const goAdminManage = () => {
      router.push({ name: 'adminManage' });
    };

    const handleInputUpdate = (v, i) => {
      if (data.value[i]) data.value[i].value = v;
    };
    const setChangeTableState = (i, e, v) => {
      changeTableState.value = {
        index: i,
        key: e,
        value: v,
      };
    };
    const handleEventUpdate = (v, i, e) => {
      switch (e) {
        default:
          data.value[i][e] = v;
          break;
      }
    };

    return {
      data,
      id,

      setChangeTableState,
      handleInputUpdate,
      handleEventUpdate,
      submit,
      goAdminManage,
    };
  },
};
</script>

<style scoped></style>
