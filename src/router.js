import MainComponent from "@/components/main/MainComponent.vue";
import { createRouter, createWebHistory } from "vue-router";
import ErrorComponent from "@/components/ErrorComponent.vue";

const routes = [
  { path: "/", component: MainComponent },
  { path: "/*", component: ErrorComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
