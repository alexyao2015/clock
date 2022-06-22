<script setup lang="ts">
import { useGlobalStore } from "../../store/global";
import { PunchActions } from "../../enum/punchActions";

definePageMeta({
  middleware: ["authorize"],
});

const store = useGlobalStore();

const logout = () => {
  store.logout();
  useRouter().push("/");
};

const { data, pending, error, refresh } = await useFetch(
  "/api/punch/available-actions",
  {
    method: "GET",
    params: { employee_id: store.$state.currentEmployeeID },
  }
);

const buttonLayout = useState("buttonLayout", () => {
  return [
    {
      name: data.value.workShiftActive ? "Punch Out" : "Punch In",
      status: data.value.workShiftActive,
    },
    {
      name: data.value.lunchActive ? "End Lunch" : "Start Lunch",
      status: data.value.lunchActive,
    },
    {
      name: data.value.breakActive ? "End Break" : "Start Break",
      status: data.value.breakActive,
    },
  ];
});
console.log(buttonLayout.value);

const performAction = async (action: PunchActions) => {
  await useFetch("/api/punch/action", {
    method: "POST",
    body: { employee_id: store.$state.currentEmployeeID, action: action },
  });
};
</script>
<template>
  <v-container fluid>
    <ClientOnly>
      <PunchTime />
      <span>Welcome {{ data.firstName }} {{ data.lastName }}</span>
      <div class="d-flex align-baseline justify-center button-layout">
        <v-btn
          v-for="item in buttonLayout"
          color="primary"
          @click="performAction(PunchActions.punchIn)"
          :disabled="item.status"
          >{{ item.name }}</v-btn
        >
      </div>
      <div class="d-flex justify-center" style="padding-top: 10px">
        <v-btn color="primary" @click="logout()">Log Out</v-btn>
      </div>
    </ClientOnly>
  </v-container>
</template>

<style scoped lang="scss">
.button-layout {
  padding-top: 10px;
  gap: 1rem;
}
</style>
