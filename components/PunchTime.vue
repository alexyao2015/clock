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
    <h1>It is currently {{ currentTime }}</h1>
  </div>
</template>
