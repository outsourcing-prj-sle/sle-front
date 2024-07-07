<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">
        IP설정 {{ id ? '수정' : '등록' }}
      </p>
      <AdminTableCol :_data="data" @handleInputUpdate="handleInputUpdate" />
      <div class="flex w-full gap-[20px] justify-center">
        <AdminButton
          :text="id ? '수정' : '등록'"
          :isWhite="false"
          @onClick="submit"
        />
        <AdminButton :text="'목록'" :isWhite="true" @onClick="goAdminIp" />
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
  name: 'adminIPUpdateView',
  components: {
    AdminTableCol,
    AdminButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = ref(route.query.id || '');
    const data = ref([]);

    onMounted(async () => {
      if (!id.value) {
        data.value = [
          {
            header: '접속자IP',
            body: {
              isText: true,
            },
            isRequired: true,
          },
          {
            header: '관리자ID',
            body: {
              isText: true,
            },
            isRequired: true,
          },
          {
            header: '사용여부',
            body: {
              isYesNo: true,
            },
            isRequired: true,
            value: '1',
          },
        ];
      } else {
        const systemInfoResponse = await AdminService.systemInfo(
          'ip',
          id.value
        );
        const resData = systemInfoResponse.data;
        console.log(resData);

        if (resData.error) {
          alert(resData.error);
          return;
        }

        data.value = [
          {
            header: '접속자IP',
            body: {
              isText: true,
            },
            isRequired: true,
            value: resData.allowedIp,
          },
          {
            header: '관리자ID',
            body: {
              isText: true,
            },
            isRequired: true,
            value: resData.adminId,
          },
          {
            header: '사용여부',
            body: {
              isYesNo: true,
            },
            isRequired: true,
            value: resData.active ? '1' : '0',
          },
        ];
      }
    });

    const submit = async () => {
      const requestData = {};
      //todo :: 수정하기일때 파라미터
      if (id.value) requestData.createdBy = id.value;

      if (data.value[0].value) requestData.allowedIp = data.value[0].value;
      else {
        alert('접속자IP를 입력해주세요.');
        return;
      }
      if (data.value[1].value) requestData.adminId = data.value[1].value;
      else {
        alert('관리자ID를 입력해주세요.');
        return;
      }

      requestData.active = data.value[2].value;

      let submitResult;
      if (id.value) {
        submitResult = await AdminService.updateSystem('ip', requestData);
      } else {
        submitResult = await AdminService.insertSystem('ip', requestData);
      }

      const resData = submitResult.data;
      console.log(resData);
      // router.push({ name: 'adminSite' });
    };

    const goAdminIp = () => {
      router.push({ name: 'adminIP' });
    };

    const handleInputUpdate = (v, i) => {
      if (data.value[i]) data.value[i].value = v;
    };

    return {
      data,
      id,

      handleInputUpdate,
      submit,
      goAdminIp,
    };
  },
};
</script>

<style scoped></style>
