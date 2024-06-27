import { createApp } from 'vue';
import pinia from './store/pinia.js';
import App from './App.vue';
import router from './router';
import i18n from '@/utils/i18n.js';
import './assets/css/style.css';

const app = createApp(App);
app.use(i18n);
// 글로벌 딕셔너리 추가
app.config.globalProperties.$t = i18n.global.t;
app.use(pinia);
app.use(router);
app.mount('#app');
