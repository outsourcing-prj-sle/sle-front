import { createApp } from 'vue';
import pinia from './store/pinia.js';
import App from './App.vue';
import router from './router';
import i18n from '@/utils/i18n.js';
import './assets/css/style.css';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App);
app.use(i18n);
// 글로벌 딕셔너리 추가
app.config.globalProperties.$t = i18n.global.t;

// 달력
app.use(setupCalendar, {});
app.component('VCalendar', Calendar);
app.component('VDatePicker', DatePicker);

// 차트
app.use(VueApexCharts);

app.use(pinia);
app.use(router);
app.mount('#app');
