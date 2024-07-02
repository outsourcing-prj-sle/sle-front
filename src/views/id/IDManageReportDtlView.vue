<template>
  <div class="flex justify-center">
    <div
      class="w-full max-w-md content-center p-8 space-y-8 min-h-[350px] bg-white rounded-[20px] shadow-[3px_6px_14px_6px_rgba(0,0,0,0.1)] absolute top-1/2 left-1/2"
      style="transform: translate(-50%, -50%)"
    >
      <div>
        <IDButton :text="'asdf'" :isWhite="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useIDStore } from '@/store/IDStore.js';
import IDService from '@/service/IDService.js';
import IDButton from '@/components/id/IDButton.vue';

export default {
  name: 'IDManageReportView',
  components: {
    IDButton,
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
