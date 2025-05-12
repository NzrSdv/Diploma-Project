import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router.ts";
import store, { key } from './store/store.ts';

createApp(App).use(store, key).use(router).mount('#app')
