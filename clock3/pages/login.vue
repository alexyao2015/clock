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
</script>

<template>
  <v-container fluid>
    <v-form class="employee-form" v-model="valid" @submit.prevent="onSubmit">
      <v-text-field
        v-model="employee_id"
        class="text-field"
        label="Employee ID"
        :rules="[(v) => !!v || 'This field is required']"
        required
      ></v-text-field>
      <v-btn
        color="primary"
        type="submit"
        :disabled="!valid"
        class="form-button"
        >Submit</v-btn
      >
    </v-form>
    <v-alert v-if="!login_success" class="alert" border type="error"
      >Login Failed</v-alert
    >
  </v-container>
</template>

<style scoped>
.employee-form {
  padding-left: 40px;
  text-align: left;
}
.text-field {
  width: 400px;
}
.form-button {
  text-align: center;
  width: 100px;
}
.alert {
  width: 400px;
  margin-top: 20px;
  margin-left: 40px;
  padding-left: 0px;
  text-align: center;
}
</style>
