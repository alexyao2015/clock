<script setup lang="ts">
import { useToastStore, ToastType } from "../../store/toast";
import { PunchActions } from "../../util/punchActions";
const storeToast = useToastStore();

// store available buttons and disabled state
const buttonLayout = useState("buttonLayout", () => {
  return [];
});

// fetch available actions
const { data, refresh } = await useFetch("/api/punch/available-actions", {
  method: "GET",
  headers: useRequestHeaders(["cookie"]),
});

const updateUserState = async () => {
  // refresh data from server
  await refresh();

  if (data.value.authorized) {
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
  }
};

await updateUserState();

const performAction = async (action: PunchActions) => {
  buttonLayout.value = [];
  const { data } = await useFetch("/api/punch/action", {
    method: "POST",
    body: { action: action },
    headers: useRequestHeaders(["cookie"]),
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
  <v-container fluid>
    <v-row dense class="d-flex justify-center">
      <v-btn
        class="d-none d-sm-flex justify-center ma-2"
        v-for="item in buttonLayout"
        color="primary"
        @click="performAction(item.action)"
        :disabled="item.disabled"
        >{{ item.name }}</v-btn
      >
      <v-col
        class="d-flex d-sm-none justify-center"
        v-for="item in buttonLayout"
        cols="12"
        sm="4"
      >
        <v-btn
          color="primary"
          @click="performAction(item.action)"
          :disabled="item.disabled"
          >{{ item.name }}</v-btn
        >
      </v-col>
      <v-col
        v-if="buttonLayout.length == 0"
        class="d-flex justify-center"
        cols="12"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss"></style>
