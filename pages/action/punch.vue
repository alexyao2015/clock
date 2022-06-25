<script setup lang="ts">
const userData = useState("userData", () => {
  return { firstName: "", lastName: "" };
});

const logout = async () => {
  await useFetch("/api/logout", {
    method: "POST",
    server: false,
    cache: "no-store",
    initialCache: false,
  });
  useRouter().push("/");
};

onBeforeMount(async () => {
  const { data, pending, error, refresh } = await useFetch("/api/login", {
    method: "POST",
    server: false,
    cache: "no-store",
    initialCache: false,
  });

  if (!data.value.authorized) {
    await logout();
  }
  userData.value.firstName = data.value.firstName;
  userData.value.lastName = data.value.lastName;
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
