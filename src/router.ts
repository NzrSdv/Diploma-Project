import { createRouter, createWebHistory } from "vue-router";
import MainView from "./views/MainView.vue";
import CatalogView from "./views/Catalog/CatalogView.vue";
import ProductView from "./views/Catalog/ProductView.vue";
import UserInfoView from "./views/User/UserInfoView.vue";
import RegisterView from "./views/User/RegisterView.vue";
import LoginView from "./views/User/LoginView.vue";
import ErrorView from "./views/ErrorView.vue";
import InfoComponent from "./components/user/nested/InfoComponent.vue";
import CardComponent from "./components/user/nested/CardComponent.vue";
import SettingsComponent from "./components/user/nested/SettingsComponent.vue";
import CartView from "./views/Cart/CartView.vue";

const routes = [
  { path: "/", component: MainView },
  { path: "/catalog/:wineType/:page", component: CatalogView },
  { path: "/cart", component: CartView },
  { path: "/:wineType/:WineId", component: ProductView },
  { path: "/register", component: RegisterView },
  { path: "/login", component: LoginView },
  {
    path: "/user", component: UserInfoView, children: [
      { path: '/user/info', component: InfoComponent },
      { path: '/user/card', component: CardComponent },
      { path: '/user/settings', component: SettingsComponent }

    ]
  },
  { path: "/:pathMatch(.*)*", component: ErrorView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
