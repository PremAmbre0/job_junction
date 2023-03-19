<template>
  <div class="recruiter-container">
    <div class="form-container">
      <v-text-field
        v-model="formData.position"
        outlined
        label="position"
        placeholder="position"
        clearable
        :rules="[rules.required]"
        color="#5243AA"
      ></v-text-field>
      <v-text-field
        :rules="[rules.required]"
        v-model="formData.email"
        outlined
        type="email"
        label="email"
        placeholder="email"
        clearable
        color="#5243AA"
      ></v-text-field>
      <v-text-field
        :rules="[rules.required]"
        v-model="formData.phone"
        outlined
        label="phone"
        placeholder="phone"
        clearable
        color="#5243AA"
      ></v-text-field>
      <v-text-field
        :rules="[rules.required]"
        v-model="formData.mail"
        outlined
        type="email"
        label="mail"
        placeholder="mail"
        clearable
        color="#5243AA"
      ></v-text-field>
      <v-textarea
        :rules="[rules.required]"
        v-model="formData.address"
        outlined
        label="address"
        placeholder="address"
        clearable
        color="#5243AA"
      ></v-textarea>
      <v-textarea
        :rules="[rules.required]"
        v-model="formData.job_desc"
        outlined
        label="Job Description"
        placeholder="Job Description"
        clearable
        color="#5243AA"
      ></v-textarea>

      <v-text-field
        :rules="[rules.required]"
        v-model="formData.education"
        outlined
        type="education"
        label="education"
        placeholder="education"
        clearable
        color="#5243AA"
      ></v-text-field>

      <v-combobox
        :rules="[rules.required, rules.counter]"
        v-model="formData.skills"
        label="skills"
        placeholder="skills"
        hint="click enter to add skills"
        multiple
        chips
        outlined
        clearable
        color="#5243AA"
      ></v-combobox>
      <v-text-field
        :rules="[rules.required]"
        v-model="formData.salary"
        outlined
        type="number"
        label="salary"
        placeholder="salary"
        clearable
        color="#5243AA"
      ></v-text-field>

      <v-btn color="#5243AA" dark large block @click="submmitForm">
        Submit
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "recruiterForm",
  data: () => ({
    pdfFile: null,
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length >= 5 || "Add atleast 5 skills",
    },
    formData: {
      skills: "",
      address: "",
      job_desc: "",
      salary: "",
      position: "",
      education: "",
      job_id: "",
      education: "",
      phone: "",
      mail: "",
    },
  }),
  methods: {
    ...mapActions(['addJob']),
    validateForm() {
      if (this.formData.job_desc == "" || !this.formData.job_desc) {
        return false;
      } else if (this.formData.skills == [] || !this.formData.skills) {
        return false;
      } else if (this.formData.address == "" || !this.formData.address) {
        return false;
      } else if (this.formData.education == "" || !this.formData.education) {
        return false;
      } else if (this.formData.phone == "" || !this.formData.phone) {
        return false;
      } else if (this.formData.mail == "" || !this.formData.mail) {
        return false;
      } else if (this.formData.education == "" || !this.formData.education) {
        return false;
      } else if (this.formData.salary == "" || !this.formData.salary) {
        return false;
      } else if (this.formData.position == "" || !this.formData.position) {
        return false;
      }
      return true;
    },
    submmitForm() {
      if (this.validateForm()) {
        this.addJob({ ...this.formData });
      } else {
        alert("Please enter the details properly");
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.recruiter-container {
  margin: 4rem auto 2rem auto;
  height: 100%;
  width: 60%;
}
</style>
