import MainComponent from "./components/main/MainComponent.vue";
import { createRouter, createWebHistory } from "vue-router";
import ErrorComponent from "./components/error/ErrorComponent.vue";
import LoginComponent from "./components/login/LoginComponent.vue";
import UserPageComponent from "./components/user/UserPageComponent.vue";
import CatalogComponent from "./components/catalog/CatalogComponent.vue";
import ProductComponent from "./components/product/ProductComponent.vue";
import RegisterComponent from "./components/register/RegisterComponent.vue";
import InfoComponent from "./components/user/nested/InfoComponent.vue";
import CardComponent from "./components/user/nested/CardComponent.vue";
import SettingsComponent from "./components/user/nested/SettingsComponent.vue";

const routes = [
  { path: "/", component: MainComponent },
  { path: "/catalog", component: CatalogComponent },
  { path: "/redWines/:WineId", component: ProductComponent },
  { path: "/register", component: RegisterComponent },
  { path: "/login", component: LoginComponent },
  {
    path: "/user", component: UserPageComponent, children: [
      { path: '/user/info', component: InfoComponent },
      { path: '/user/card', component: CardComponent },
      { path: '/user/settings', component: SettingsComponent }

    ]
  },
  { path: "/:pathMatch(.*)*", component: ErrorComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
