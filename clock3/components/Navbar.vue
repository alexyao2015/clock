<script setup lang="ts">
import { mdiAlarm, mdiAccount } from "@mdi/js";

const router = useRouter();

const visit = (path: string) => {
  router.push(path);
};
</script>

<template>
  <v-app-bar theme="dark" dense style="height: 62px">
    <v-tabs align-with-title>
      <v-tab @click="visit('/')">
        <v-icon :icon="mdiAlarm"></v-icon>
        Punch
      </v-tab>
      <v-tab @click="visit('/login')">
        <v-icon :icon="mdiAccount"></v-icon>
        Account
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>
