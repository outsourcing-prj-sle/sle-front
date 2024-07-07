<template>
  <div
    class="flex justify-start mx-[40px] my-[20px] max-md:mx-[20px] max-md:my-[20px]"
  >
    <div class="flex flex-col gap-[20px] items-start w-full">
      <p class="font-bold text-[20px] max-md:text-[16px]">시행일 이력</p>
      <div class="flex w-full justify-between content-center">
        <div>
          <AppDropdown
            v-if="selectedOption"
            :options="options"
            :startText="selectedOption"
            @update:selectedOption="handleSelection1"
          />
        </div>
      </div>
      <div class="w-full text-right">
        <AdminButton :text="'등록'" @onClick="goSiteUpdate" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/adminStore.js';
import AdminService from '@/service/AdminService.js';
import AdminButton from '@/components/admin/AdminButton.vue';
import AppDropdown from '@/components/AppDropdown.vue';

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
    const options = ref(['최신순', '오래된순']);
    const selectedOption = ref('최신순');
    const page = ref(1);
    const limit = ref(10);
    const totalCount = ref();

    onMounted(() => {
    });

    const handleSelection1 = (v) => {
      selectedOption.value = v;
    };

    return {
      options,
      limit,
      totalCount,
      page,
      selectedOption,

      handleSelection1,
    };
  },
};
</script>

<style scoped></style>
