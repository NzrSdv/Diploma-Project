import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router.ts";
import { i18n } from './i18n.ts';
import store, { key } from './store/store.ts';



createApp(App).use(i18n).use(store, key).use(router).mount('#app')
