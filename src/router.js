import MainComponent from "@/components/main/MainComponent.vue";
import { createRouter, createWebHistory } from "vue-router";
import ErrorComponent from "@/components/ErrorComponent.vue";
import LoginComponent from "./components/login/LoginComponent.vue";

const routes = [
  { path: "/", component: MainComponent },
  { path: "/login", component: LoginComponent },
  { path: "/*", component: ErrorComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
