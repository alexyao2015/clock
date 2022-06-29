export default defineNuxtRouteMiddleware(async (to, from) => {
  const data = await $fetch("/api/login", {
    method: "POST",
    headers: useRequestHeaders(["cookie"]),
  });

  if (!data.authorized) {
    return navigateTo("/");
  }
});
