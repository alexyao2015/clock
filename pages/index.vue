<script setup lang="ts">
import { useGlobalStore } from "../store/global";

const props = defineProps({
  valid: Boolean,
  employee_id: String,
});

const login_failed = useState("login_failed", () => false);

const onSubmit = async (e: Event) => {
  const { data, pending, error, refresh } = await useFetch("/api/login", {
    method: "POST",
    body: { employee_id: props.employee_id },
  });
  if (data.value.authorized) {
    const store = useGlobalStore();
    store.currentEmployeeID = props.employee_id;

    if (data.value.isAdmin) {
      useRouter().push("/action/punch");
    } else {
      useRouter().push("/action/punch");
    }
    return;
  }
  login_failed.value = true;
};
</script>

<template>
  <v-col cols="12" md="4">
    <v-form class="employee-form" v-model="valid" @submit.prevent="onSubmit">
      <v-text-field
        v-model="employee_id"
        label="Employee ID"
        :rules="[(v) => !!v || 'This field is required']"
        required
      ></v-text-field>
      <v-btn color="primary" type="submit" :disabled="!valid">Submit</v-btn>
    </v-form>
    <ClientOnly>
      <v-snackbar v-model="login_failed" color="red lighten-2" :timeout="2000">
        Login Failed
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="login_failed = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </ClientOnly>
  </v-col>
</template>
