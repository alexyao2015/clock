<script setup lang="ts">
import { mdiAlarm, mdiAccount } from "@mdi/js";

const router = useRouter();

const visit = (path: string) => {
  router.push(path);
};
</script>

<template>
  <v-app-bar theme="dark" dense style="height: 62px">
    <v-tabs>
      <v-tab @click="visit('/')">
        <v-icon :icon="mdiAlarm"></v-icon>
        Punch
      </v-tab>
      <v-tab @click="visit('/register')">
        <v-icon :icon="mdiAccount"></v-icon>
        Register
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>
