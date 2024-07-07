<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">
        공통코드관리 {{ id ? '수정' : '등록' }}
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
        <AdminButton :text="'목록'" :isWhite="true" @onClick="goCode" />
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
  name: 'adminCodeUpdateView',
  components: {
    AdminTableCol,
    AdminButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = ref(route.query.id || '');
    const data = ref([]);
    const checkSiteText = ref('');
    const changeTableState = ref({
      index: null,
      key: null,
      value: null,
    });

    onMounted(async () => {
      if (!id.value) {
        data.value = [
          {
            header: '분류코드',
            body: {
              isCode: true,
            },
            value: '전자정부프레임워크 공통서비스',
            isRequired: true,
          },
          {
            header: '코드 ID',
            body: {
              isCheckText: true,
            },
            value: '',
            isRequired: true,
          },
          {
            header: '코드ID 명',
            body: {
              isText: true,
            },
            value: '',
            isRequired: true,
          },
          {
            header: '코드ID 설명',
            body: {
              isTextArea: true,
              placeholder: '설명을 입력하세요.',
            },
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
          'cmmn_code',
          id.value
        );
        const resData = systemInfoResponse.data;

        if (resData.error) {
          alert(resData.error);
          return;
        }
        console.log(resData);
        checkSiteText.value = resData.codeId;

        data.value = [
          {
            header: '분류코드',
            body: {
              isCode: true,
            },
            value: resData.categoryCode,
            isRequired: true,
          },
          {
            header: '코드 ID',
            body: {
              isCheckText: true,
            },
            value: resData.codeId,
            isRequired: true,
          },
          {
            header: '코드ID 명',
            body: {
              isText: true,
            },
            value: resData.codeName,
            isRequired: true,
          },
          {
            header: '코드ID 설명',
            body: {
              isTextArea: true,
              placeholder: '설명을 입력하세요.',
            },
            value: resData.codeDescription,
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
      if (id.value) requestData.createdBy = id.value;

      requestData.categoryCode = data.value[0].value;

      if (data.value[1].value !== checkSiteText.value) {
        alert('코드 ID 중복확인을 해주세요.');
        return;
      }

      if (data.value[1].value) requestData.codeId = data.value[1].value;
      else {
        alert('코드ID를 입력해주세요.');
        return;
      }
      if (data.value[2].value) requestData.codeName = data.value[2].value;
      else {
        alert('코드ID명을 입력해주세요.');
        return;
      }
      if (data.value[3].value)
        requestData.codeDescription = data.value[3].value;
      else {
        alert('코드ID설명을 입력해주세요.');
        return;
      }
      requestData.active = data.value[4].value;

      let submitResult;
      if (id.value) {
        submitResult = await AdminService.updateSystem(
          'cmmn_code',
          requestData
        );
      } else {
        submitResult = await AdminService.insertSystem(
          'cmmn_code',
          requestData
        );
      }

      const resData = submitResult.data;
      console.log(resData);
      alert('수정되었습니다.');
      router.push({ name: 'adminCode' });
    };

    const goCode = () => {
      router.push({ name: 'adminCode' });
    };

    const handleInputUpdate = (v, i) => {
      if (i === 1 && checkSiteText.value)
        setChangeTableState(1, 'isChecked', false);
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
        case 'checkSite':
          checkSite(data.value[i].value);
          break;
        default:
          data.value[i][e] = v;
          break;
      }
    };

    const checkSite = async (v) => {
      if (!v) return;
      const checkSiteResponse = await AdminService.checkSystemExist(
        'cmmn_code',
        {
          id: v,
        }
      );
      const resData = checkSiteResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      if (resData) {
        alert('중복 코드가 있습니다.');
      } else {
        checkSiteText.value = v;
        setChangeTableState(1, 'isChecked', true);
      }
    };
    return {
      data,
      id,

      changeTableState,
      handleInputUpdate,
      handleEventUpdate,
      submit,
      goCode,
    };
  },
};
</script>

<style scoped></style>
