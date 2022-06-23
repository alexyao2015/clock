<script setup lang="ts">
import { useGlobalStore } from "../../store/global";
import { useToastStore, ToastType } from "../../store/toast";
import { PunchActions } from "../../enum/punchActions";

const store = useGlobalStore();
const storeToast = useToastStore();

// store available buttons and disabled state
const buttonLayout = useState("buttonLayout", () => {
  return [];
});

// store data from actions request
const userData = useState("userData", () => {
  return {};
});

const updateUserState = async () => {
  // refresh data from server

  // fetch available actions
  const { data } = await useFetch("/api/punch/available-actions", {
    method: "GET",
    params: { employee_id: store.$state.currentEmployeeID },
    server: false,
    cache: "no-store",
    initialCache: false,
  });

  userData.value = data;
  buttonLayout.value = [
    {
      name: data.value.workShiftActive ? "Punch Out" : "Punch In",
      disabled: data.value.lunchActive || data.value.breakActive,
      action: data.value.workShiftActive
        ? PunchActions.punchOut
        : PunchActions.punchIn,
    },
    {
      name: data.value.lunchActive ? "End Lunch" : "Start Lunch",
      disabled: !data.value.workShiftActive || data.value.breakActive,
      action: data.value.lunchActive
        ? PunchActions.lunchOut
        : PunchActions.lunchIn,
    },
    {
      name: data.value.breakActive ? "End Break" : "Start Break",
      disabled: !data.value.workShiftActive || data.value.lunchActive,
      action: data.value.breakActive
        ? PunchActions.breakOut
        : PunchActions.breakIn,
    },
  ];
};

onMounted(async () => {
  await updateUserState();
});

const performAction = async (action: PunchActions) => {
  buttonLayout.value = [];
  const { data } = await useFetch("/api/punch/action", {
    method: "POST",
    body: { employee_id: store.$state.currentEmployeeID, action: action },
    server: false,
    cache: "no-store",
    initialCache: false,
  });
  if (data.value.success) {
    storeToast.msg = "Action succeeded";
    storeToast.type = ToastType.success;
  } else {
    storeToast.msg = "Action failed";
    storeToast.type = ToastType.alert;
  }
  storeToast.display = true;
  await updateUserState();
};
</script>
<template>
  <div class="d-flex align-baseline justify-center button-layout">
    <v-btn
      v-for="item in buttonLayout"
      color="primary"
      @click="performAction(item.action)"
      :disabled="item.disabled"
      >{{ item.name }}</v-btn
    >
    <v-progress-circular
      v-if="buttonLayout.length == 0"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<style scoped lang="scss">
.button-layout {
  padding-top: 10px;
  gap: 1rem;
}
</style>
