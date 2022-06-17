import { createApp } from "vue";
import App from "./App.vue";
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const Hello = { template: "<div>Home</div>" };
const Foo = { template: "<div>Foo</div>" };

const routes = [
  { path: "/hello", component: Hello },
  { path: "/foo", component: Foo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
