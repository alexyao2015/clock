<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const logout = async () => {
  await useFetch("/api/logout", {
    method: "POST",
    headers: useRequestHeaders(["cookie"]),
    cache: "no-store",
    initialCache: false,
  });
  useRouter().push("/");
};

const { data } = await useFetch("/api/login", {
  method: "POST",
  headers: useRequestHeaders(["cookie"]),
});

const userData = useState("userData", () => {
  return { firstName: data.value.firstName, lastName: data.value.lastName };
});
</script>
<template>
  <v-container fluid>
    <h1>Welcome {{ userData.firstName }} {{ userData.lastName }}</h1>
    <PunchTime />
    <PunchActionButtons />
    <div class="d-flex justify-center" style="padding-top: 10px">
      <v-btn color="primary" @click="logout()">Log Out</v-btn>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.button-layout {
  padding-top: 10px;
  gap: 1rem;
}
</style>
