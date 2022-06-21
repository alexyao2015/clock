<script setup lang="ts">
import { useGlobalStore } from "../store/global";
const store = useGlobalStore();

const currentTime = useState("currentTime", () => "");

onBeforeMount(() => {
  currentTime.value = new Date().toLocaleTimeString();
  store.punchInterval = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString();
  }, 250);
});
onBeforeUnmount(() => {
  clearInterval(store.punchInterval);
});
</script>

<template>
  <div>
    <ClientOnly>
      <h1>{{ currentTime }}</h1>
    </ClientOnly>
  </div>
</template>
