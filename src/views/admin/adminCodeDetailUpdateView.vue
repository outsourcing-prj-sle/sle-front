<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">
        하위코드관리 {{ subCodeId ? '수정' : '등록' }}
      </p>
      <AdminTableCol
        :_data="data"
        :changeTableState="changeTableState"
        @handleInputUpdate="handleInputUpdate"
        @handleEventUpdate="handleEventUpdate"
      />
      <div class="flex w-full gap-[20px] justify-center">
        <AdminButton
          :text="subCodeId ? '수정' : '등록'"
          :isWhite="false"
          @onClick="submit"
        />
        <AdminButton :text="'목록'" :isWhite="true" @onClick="goDetail" />
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
  name: 'adminCodeDetailUpdateView',
  components: {
    AdminTableCol,
    AdminButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = ref(route.query.id || '');
    const subCodeId = ref(route.query.subCodeId || '');
    const checkSiteText = ref('');
    const changeTableState = ref({
      index: null,
      key: null,
      value: null,
    });
    const data = ref([]);

    onMounted(async () => {
      if (!subCodeId.value) {
        data.value = [
          {
            header: '코드ID',
            body: {
              isText: true,
              isFixed: true,
            },
            isRequired: true,
            value: id.value,
          },
          {
            header: '코드',
            body: { isCheckText: true },
            isRequired: true,
            value: '',
          },
          {
            header: '코드명',
            body: {
              isText: true,
            },
            isRequired: true,
            value: '',
          },
          {
            header: '코드ID설명',
            body: {
              isTextArea: true,
            },
            isRequired: true,
            value: '',
          },
        ];
      } else {
        const subCodeInfo = await AdminService.subCodeInfo(
          id.value,
          subCodeId.value
        );
        const resData = subCodeInfo.data;
        console.log(resData);
        checkSiteText.value = resData.subCodeId;

        if (resData.error) {
          alert(resData.error);
          return;
        }
        data.value = [
          {
            header: '코드ID',
            body: {
              isText: true,
              isFixed: true,
            },
            isRequired: true,
            value: id.value,
          },
          {
            header: '코드',
            body: { isText: true, isFixed: true },
            isRequired: true,
            value: subCodeId.value,
          },
          {
            header: '코드명',
            body: {
              isText: true,
            },
            isRequired: true,
            value: resData.subCodeName,
          },
          {
            header: '코드ID설명',
            body: {
              isTextArea: true,
            },
            isRequired: true,
            value: resData.codeDescription,
          },
        ];
      }
    });

    const submit = async () => {
      let apiData = {};
      console.log(data.value);

      let submitResult;

      if (data.value[1].value !== checkSiteText.value) {
        alert('코드 ID 중복확인을 해주세요.');
        return;
      }

      if (data.value[1].value) apiData.subCodeId = data.value[1].value;
      else {
        alert('코드ID를 입력해주세요.');
        return;
      }

      apiData.codeId = id.value;

      if (data.value[2].value) apiData.subCodeName = data.value[2].value;
      else {
        alert('코드명을 입력해주세요.');
        return;
      }

      if (data.value[3].value) apiData.codeDescription = data.value[3].value;
      else {
        alert('코드설명을 입력해주세요.');
        return;
      }

      if (subCodeId.value) {
        submitResult = await AdminService.updateSubCode(id.value, apiData);
      } else {
        submitResult = await AdminService.insertSubCode(id.value, apiData);
      }

      const resData = submitResult.data;
      console.log(resData);
      alert('등록되었습니다');

      // router.push({
      //   name: 'adminCodeDetail',
      //   params: {
      //     id: id.value,
      //   },
      // });
    };

    const handleSelection1 = (v) => {
      console.log(v);
    };

    const goDetail = () => {
      router.push({
        name: 'adminCodeDetail',
        query: {
          id: id.value,
        },
      });
    };
    const handleInputUpdate = (v, i) => {
      if (i === 1 && checkSiteText.value)
        setChangeTableState(1, 'isCheckedSubCode', false);
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
        'sub_code',
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
        setChangeTableState(1, 'isCheckedSubCode', true);
      }
    };

    return {
      data,
      id,

      changeTableState,
      handleSelection1,
      setChangeTableState,
      handleInputUpdate,
      handleEventUpdate,
      submit,
      goDetail,
    };
  },
};
</script>

<style scoped></style>
