<script setup lang="ts">
// definePageMeta({
//   middleware: ["redirect"],
// });
import { useGlobalStore } from "../store/global";

const store = useGlobalStore();
const currentEmployeeID = useState(
  "currentEmployeeID",
  () => store.currentEmployeeID
);

currentEmployeeID.value = "hiaa";

const valid = useState("valid", () => true);
</script>
<template>
  <v-container fluid>
    <PunchTime />
    <v-btn color="primary" :disabled="!valid"
      >Punch In {{ currentEmployeeID }}</v-btn
    >
    <v-btn color="primary" :disabled="!valid">Start Lunch</v-btn>
    <v-btn color="primary" :disabled="!valid">Start Break</v-btn>
    <v-btn color="primary" :disabled="!valid">Log Out</v-btn>
  </v-container>
</template>
