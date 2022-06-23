<script setup lang="ts">
import { useGlobalStore } from "../../store/global";

definePageMeta({
  middleware: ["authorize"],
});

const store = useGlobalStore();

const logout = () => {
  store.logout();
  useRouter().push("/");
};

const { data, pending, error, refresh } = await useFetch("/api/login", {
  method: "POST",
  body: { employee_id: store.$state.currentEmployeeID },
});
</script>
<template>
  <v-container fluid>
    <h1>Welcome {{ data.firstName }} {{ data.lastName }}</h1>
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
