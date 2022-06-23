<script setup lang="ts">
import { useGlobalStore } from "../../store/global";
const store = useGlobalStore();

const currentTime = useState("currentTime", () => "");

onBeforeMount(() => {
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
    <div>It is currently {{ currentTime }}</div>
  </div>
</template>
