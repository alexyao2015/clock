import { useGlobalStore } from "../store/global";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useGlobalStore();
  if (store.currentEmployeeID === "") {
    navigateTo("/");
  }
});
