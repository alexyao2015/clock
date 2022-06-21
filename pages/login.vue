<script setup lang="ts">
const props = defineProps({
  valid: Boolean,
  employee_id: String,
});

const login_success = useState("login_success", () => true);

const onSubmit = async (e: Event) => {
  const { data, pending, error, refresh } = await useFetch("/api/login", {
    method: "POST",
    params: { employee_id: props.employee_id },
  });
  login_success.value = data.value.authorized;
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
    <v-alert v-if="!login_success" class="alert" border type="error"
      >Login Failed</v-alert
    >
  </v-col>
</template>
