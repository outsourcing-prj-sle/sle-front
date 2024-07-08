<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">시행일 이력</p>
      <VDatePicker v-model="date" @update:model-value="checkDuplicateDate">
        <template #default="{ togglePopover }">
          <div class="flex items-center gap-2">
            <button
              class="px-10 py-2.5 text-[#797979] rounded-xl text-xs font-light bg-white border-[#CECECE] border border-solid"
              @click="togglePopover"
            >
              {{ formattedDate }}
            </button>
            <button
              class="py-2 px-3 rounded-xl bg-white border-[#CECECE] border border-solid"
              @click="togglePopover"
            >
              <img
                class="w-6 h-6"
                src="@/assets/img/IDCalendar.png"
                alt="IDCalendar"
              />
            </button>
          </div>
        </template>
      </VDatePicker>
      <div class="flex items-center gap-2 flex-wrap">
        <button type="button" v-for="i in storeDatas" :key=i
          class="text-xs text-center w-28 h-8 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer"
          :class="{'bg-[#2F80ED] border-[#2F80ED] text-white' : i.val === isClicked }"
          @click="handlerBtnClick(i)"
        >
          {{ i.val }} 시행
        </button>
      </div>
      <div class="w-full">
        <p class="text-left py-2">학생</p>
        <div class="w-full">
          <ckeditor
          :editor="editor" 
          v-model="editorData" 
          :config="editorConfig"
          />
        </div>
      </div>
      <div class="w-full">
        <p class="text-left py-2">교직원</p>
        <div class="w-full">
          <ckeditor
          :editor="editor" 
          v-model="editorData2"
          :config="editorConfig"
          />
        </div>
      </div>
      <div class="w-full text-right">
        <AdminButton :text="btnNm" @onClick="handlerClick" />
        <AdminButton v-if="btnNm === '수정'" class="ml-2 bg-red-500 border-red-500" :text="'삭제'" @onClick="deleteService" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminService from '@/service/AdminService.js';
import AdminButton from '@/components/admin/AdminButton.vue';
import AppDropdown from '@/components/AppDropdown.vue';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Link, Heading, Underline,
  BulletedList, NumberedList, BlockQuote, InsertTable, TableColumn, TableRow, MergeTableCells } from 'ckeditor5';

export default {
  name: 'adminTermView',
  components: {
    AdminButton,
    AppDropdown,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const adminStore = useAdminStore();
    const date = ref(new Date());
    const formattedDate = computed(() => {
      const tmp = new Date(date.value);
      let year = tmp.getFullYear();
      let month = String(tmp.getMonth() + 1).padStart(2, '0');
      let day = String(tmp.getDate()).padStart(2, '0');
      const format = `${year}-${month}-${day}`;

      return format;
    });
    const btnNm = ref('저장');
    const isClicked = ref('');
    const storeDatas = ref([]);
    const editor = ClassicEditor;
    const editorData = ref('');
    const editorData2 = ref('');
    const editorConfig = {
      plugins: [ Bold, Essentials, Italic, Mention, Paragraph, Undo, Link, Heading, Underline],
      toolbar: ['undo', 'redo', '|', 'heading', 'bold', 'italic', 'underline', 'link'],
    }

    onMounted(() => {
      getService();
    });

    const getService = async (data) => {
      const res = await AdminService.systemInfoList('terms');
      const resData = res.data;
      console.log(resData);

      storeDatas.value = [];
      resData.map((item) => {
        let arr = storeDatas.value;
        let obj = {
          id: item.termsId,
          val: item.effectiveDate.split(" ")[0],
          student: item.studentTerms,
          teacher: item.staffTerms
        }

        arr.push(obj);
        storeDatas.value = arr;
      })

      console.log(storeDatas.value);
    }

    const insertService = async (data) => {
      console.log('insertService: ', data);
      const res = await AdminService.insertSystem('terms', data);
      const resData = res.data;
      console.log(resData);
      alert('성공적으로 등록됐습니다.');
      getService();
    }

    const updateService = async (data) => {
      console.log('updateService: ', data);
      const res = await AdminService.updateSystem('terms', data);
      const resData = res.data;
      console.log(resData);
      alert('성공적으로 수정됐습니다.');
      getService();
    }

    const deleteService = async () => {
      let id = '';

      storeDatas.value.map((item) => {
        if(item.val === isClicked.value) {
          id = item.id;
        }
      });

      const res = await AdminService.deleteSystem('terms', id);
      const resData = res.data;
      console.log(resData);
      alert('성공적으로 삭제됐습니다.');
      getService();
      init();
    }

    const handlerClick = () => {
      if(btnNm.value === '저장') {
        storeData();
      } else {
        updateData();
      }

      init();
    };

    const storeData = () => {
      insertService({
        studentTerms: editorData.value,
        staffTerms: editorData2.value,
        effectiveDate: formattedDate.value,
      });
    };

    const updateData = () => {
      storeDatas.value.map((item) => {
        if(item.val === isClicked.value) {
          item.student = editorData.value;
            item.teacher = editorData2.value;

            updateService({
            termsId: item.id,
            studentTerms: editorData.value,
            staffTerms: editorData2.value,
            effectiveDate: item.val,
          });
        }
      });
    }

    const clearCkeditor = () => {
      editorData.value = '';
      editorData2.value = '';
    };

    const handlerBtnClick = (obj) => {
      isClicked.value = obj.val;
      editorData.value = obj.student;
      editorData2.value = obj.teacher;
      btnNm.value = '수정';
    };

    const checkDuplicateDate = () => {
      storeDatas.value.map((item) => {
        if(item.val ===  formattedDate.value) {
          alert('이미 저장된 시행일입니다.');
          
          date.value = new Date();

          return ;
        }
      })

      init();
    };

    const init = () => {
      isClicked.value = '';
      btnNm.value = '저장';
      clearCkeditor();
    }

    return {
      date,
      formattedDate,
      btnNm,
      isClicked,
      storeDatas,
      editor,
      editorData,
      editorData2,
      editorConfig,

      handlerClick,
      handlerBtnClick,
      checkDuplicateDate,
      deleteService
    };
  },
};
</script>