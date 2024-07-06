<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">사이트관리 등록</p>
      <AdminTableCol
        :_data="data"
        :changeTableState="changeTableState"
        @handleInputUpdate="handleInputUpdate"
        @handleEventUpdate="handleEventUpdate"
      />
      <div class="flex w-full gap-[20px] justify-center">
        <AdminButton :text="'등록'" :isWhite="false" @onClick="submit" />
        <AdminButton :text="'목록'" :isWhite="true" @onClick="goSite" />
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
  name: 'adminSiteUpdateView',
  components: {
    AdminTableCol,
    AdminButton,
  },
  props: {
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const router = useRouter();
    const data = ref([]);
    const changeTableState = ref({
      index: null,
      key: null,
      value: null,
    });
    const checkSiteText = ref('');
    const siteId = ref();

    onMounted(() => {
      if (!props.isUpdate) {
        data.value = [
          {
            header: '사이트 명',
            body: {
              isText: true,
            },
            value: '',
            isRequired: true,
          },
          {
            header: '사이트 도메인',
            body: {
              isCheckText: true,
            },
            value: '',
            isRequired: true,
          },
          {
            header: '상단로고',
            body: {
              isUpload: true,
            },
          },
          {
            header: '하단로고',
            body: {
              isUpload: true,
            },
          },
          {
            header: '대표이미지',
            body: {
              isUpload: true,
            },
          },
          {
            header: '사이트설명',
            body: {
              isTextArea: true,
              placeholder: '설명을 입력하세요.',
            },
          },
          {
            header: '마우스 보안허용',
            body: {
              isYesNo: true,
            },
            isRequired: true,
          },
          {
            header: '키보드 보안허용',
            body: {
              isYesNo: true,
            },
            isRequired: true,
          },
        ];
      } else {
        // data 받아오기
        siteId.value = 'site_001';
      }
    });

    const handleSelection1 = (v) => {
      console.log(v);
    };

    const goSite = () => {
      router.push({ name: 'site' });
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
      const checkSiteResponse = await AdminService.checkSystemExist('site', {
        url: v,
      });
      const resData = checkSiteResponse.data;

      if (resData.error) {
        alert(resData.error);
        return;
      }

      if (resData) {
        alert('중복 url이 있습니다.');
      } else {
        checkSiteText.value = v;
        setChangeTableState(1, 'isChecked', true);
      }
    };

    const submit = async () => {
      let formData = new FormData();
      if (siteId.value) formData.append('siteId', siteId.value);

      if (data.value[0].value) formData.append('siteName', data.value[0].value);
      else {
        alert('사이트 명을 입력해주세요.');
        return;
      }
      if (data.value[1].value)
        formData.append('siteDomain', data.value[1].value);
      else {
        alert('사이트 도메인을 입력해주세요.');
        return;
      }
      if (data.value[2].value)
        formData.append('topLogoImage', data.value[2].value);
      if (data.value[3].value)
        formData.append('bottomLogoImage', data.value[3].value);
      if (data.value[4].value)
        formData.append('mainImage', data.value[4].value);
      if (data.value[5].value)
        formData.append('siteDescription', data.value[5].value);
      if (data.value[6].value)
        formData.append('mouseSecurity', parseInt(data.value[6].value));
      else {
        alert('마우스 보안허용을 선택해주세요.');
        return;
      }
      if (data.value[7].value)
        formData.append('keyboardSecurity', parseInt(data.value[7].value));
      else {
        alert('키보드 보안허용을 선택해주세요.');
        return;
      }

      let submitResult;
      if (props.isUpdate) {
        submitResult = await AdminService.updateSystem('site', formData);
      } else {
        submitResult = await AdminService.insertSystem('site', formData);
      }

      const resData = submitResult.data;
      console.log(resData);
      // router.push({ name: 'adminSite' });
    };

    return {
      data,

      handleSelection1,
      goSite,
      changeTableState,
      handleInputUpdate,
      handleEventUpdate,
      submit,
    };
  },
};
</script>

<style scoped></style>