export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to);
  console.log(from);
  // if (to.params.id === "1") {
  //   return abortNavigation();
  // }
  // return navigateTo("/");
});
