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

export default createRouter({
  history: createWebHistory(),
  routes,
});
