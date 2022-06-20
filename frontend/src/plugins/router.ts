import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
