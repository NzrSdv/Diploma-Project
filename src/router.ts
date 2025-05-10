import { createRouter, createWebHistory } from "vue-router";
import MainView from "./views/MainView.vue";
import CatalogView from "./views//CatalogView.vue";
import ErrorComponent from "./components/error/ErrorComponent.vue";
import LoginComponent from "./components/login/LoginComponent.vue";
import UserPageComponent from "./components/user/UserPageComponent.vue";
import ProductComponent from "./components/product/ProductComponent.vue";
import RegisterComponent from "./components/register/RegisterComponent.vue";
import InfoComponent from "./components/user/nested/InfoComponent.vue";
import CardComponent from "./components/user/nested/CardComponent.vue";
import SettingsComponent from "./components/user/nested/SettingsComponent.vue";
import CartComponent from "./components/cart/CartComponent.vue";

const routes = [
  { path: "/", component: MainView },
  { path: "/catalog", component: CatalogView },
  { path: "/cart", component: CartComponent },
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
