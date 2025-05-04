import MainComponent from "./components/main/MainComponent.vue";
import { createRouter, createWebHistory } from "vue-router";
import ErrorComponent from "./components/error/ErrorComponent.vue";
import LoginComponent from "./components/login/LoginComponent.vue";
import UserPageComponent from "./components/user/UserPageComponent.vue";
import CatalogComponent from "./components/catalog/CatalogComponent.vue";

const routes = [
  { path: "/", component: MainComponent },
  { path: "/catalog", component: CatalogComponent },
  { path: "/login", component: LoginComponent },
  { path: "/user", component: UserPageComponent },
  { path: "/:pathMatch(.*)*", component: ErrorComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
