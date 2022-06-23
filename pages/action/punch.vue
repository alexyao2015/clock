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
</script>
<template>
  <v-container fluid>
    <PunchTime />
    <!-- <span>Welcome {{ data.firstName }} {{ data.lastName }}</span> -->
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
