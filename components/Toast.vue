<script setup lang="ts">
import { useToastStore } from "../store/toast";

const store = useToastStore();
</script>

<template>
  <ClientOnly>
    <v-snackbar
      v-model="store.$state.display"
      :color="store.backgroundColor"
      :timeout="2000"
    >
      {{ store.$state.msg }}
      <template v-slot:actions>
        <v-btn
          :color="store.buttonColor"
          variant="text"
          @click="store.$state.display = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </ClientOnly>
</template>
