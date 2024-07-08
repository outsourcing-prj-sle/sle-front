<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">
        {{ userType }} {{ id ? '수정' : '등록' }}
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
          v-if="userType === '학교'"
        />
        <AdminButton :text="'목록'" :isWhite="true" @onClick="goUser" />
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
    const id = ref(route.query.id || '');
    const userType = computed(() => parseToKo(route.params.userType));
    const changeTableState = ref({
      index: null,
      key: null,
      value: null,
    });
    const data = ref([]);

    onMounted(async () => {
      if (userType.value === '학교') {
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
                isText: true,
                isFixed: true,
              },
              isRequired: true,
              value: userType.value,
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
          const userInfo = await AdminService.userInfo(id.value);
          const resData = userInfo.data;
          console.log(resData);

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
              value: resData.name,
            },
            {
              header: '아이디',
              body: {
                isText: true,
              },
              isRequired: true,
              value: resData.id,
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
                isFixed: true,
              },
              value: userType.value,
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
              value1: resData.userEmail.split('@')[0],
              value2: resData.userEmail.split('@')[1],
            },
          ];
        }
      } else {
        const userInfo = await AdminService.userInfoTeacherStudent(id.value);
        const resData = userInfo.data;
        console.log(resData);

        if (resData.error) {
          alert(resData.error);
          return;
        }

        data.value = [
          {
            header: '이름',
            body: {
              isText: true,
              isFixed: true,
            },
            value: resData.name,
          },
          // {
          //   header: '아이디',
          //   body: {
          //     isText: true,
          //     isFixed: true,
          //   },
          //   value: resData.id,
          // },
          {
            header: '회원구분',
            body: {
              isText: true,
              isFixed: true,
            },
            value: userType.value,
          },
          // {
          //   header: '핸드폰번호',
          //   body: {
          //     isText: true,
          //     isFixed: true,
          //   },
          //   value: resData.phoneNumber,
          // },
          {
            header: '이메일',
            body: {
              isText: true,
              isFixed: true,
            },
            value: resData.userEmail,
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
        apiData.uniqId = id.value;
      }
      submitResult = await AdminService.signupSchool(apiData);

      const resData = submitResult.data;
      console.log(resData);
      alert('등록되었습니다');

      router.push({
        name: 'adminUser',
        params: {
          userType: route.params.userType,
        },
      });
    };

    const handleSelection1 = (v) => {
      console.log(v);
    };

    const goUser = () => {
      router.push({
        name: 'adminUser',
        params: {
          userType: route.params.userType,
        },
      });
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
      userType,
      id,

      handleSelection1,
      setChangeTableState,
      handleInputUpdate,
      handleEventUpdate,
      submit,
      goUser,
    };
  },
};
</script>

<style scoped></style>
