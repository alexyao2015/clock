<script setup lang="ts">
import { useToastStore, ToastType } from "../store/toast";

const storeToast = useToastStore();

const props = defineProps({
  valid: Boolean,
  employee_id: String,
});

const onSubmit = async (e: Event) => {
  const { data, pending, error, refresh } = await useFetch("/api/login", {
    method: "POST",
    body: { employee_id: props.employee_id },
    server: false,
    cache: "no-store",
    initialCache: false,
  });
  if (data.value.authorized) {
    if (data.value.isAdmin) {
      useRouter().push("/action/punch");
    } else {
      useRouter().push("/action/punch");
    }
    return;
  }
  storeToast.msg = "Login Failed";
  storeToast.type = ToastType.alert;
  storeToast.display = true;
};
</script>

<template>
  <v-row>
    <v-col cols="12" sm="8" md="6" lg="4" xl="3">
      <v-form class="employee-form" v-model="valid" @submit.prevent="onSubmit">
        <v-text-field
          v-model="employee_id"
          label="Employee ID"
          :rules="[(v) => !!v || 'This field is required']"
          required
        ></v-text-field>
        <v-btn color="primary" type="submit" :disabled="!valid">Submit</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>
