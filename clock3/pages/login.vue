<script setup lang="ts">
const props = defineProps({
  valid: Boolean,
  employee_id: String,
});

const login_success = useState("login_success", () => true);

const onSubmit = (e: Event) => {
  login_success.value = false;
  console.log(props.employee_id);
};

const button_state = useState("button_state", () => 1);
</script>

<template>
  <v-col cols="8" xs="12">
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
    <v-btn color="primary" @click="button_state++">{{ button_state }}</v-btn>
  </v-col>
</template>
