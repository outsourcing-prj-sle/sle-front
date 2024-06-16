import { createApp } from 'vue';
import pinia from './store/pinia.js';
import App from './App.vue';
import router from './router';
import './assets/css/style.css';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
