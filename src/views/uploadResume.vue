<template>
  <div class="upload-resume-container">
    <div
      class="resume-uploader-conatiner"
      @dragenter.prevent
      @dragover.prevent
      @dragleave.prevent
      @drop.prevent="onDrop"
    >
      <div class="pdf-dropbox">
        <label for="pdf-file-input"
          >Drop PDF file here or click to select:
        </label>
        <input
          type="file"
          id="pdf-file-input"
          accept="application/pdf"
          @change="onFileChange"
        />
      </div>
    </div>

    <div class="form-container">
      <v-text-field
        v-model="formData.name"
        outlined
        label="name"
        placeholder="name"
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
        type="number"
        label="phone"
        placeholder="phone"
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

      <v-text-field
        :rules="[rules.required]"
        v-model="formData.education"
        outlined
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

      <v-btn color="#5243AA" dark large block @click="submmitForm">
        Submit
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UploadResume",
  data: () => ({
    pdfFile: null,
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length >= 5 || "Add atleast 5 skills",
    },
    formData: {
      name: "",
      skills: [],
      address: "",
      education: "",
      phone: "",
      email: "",
    },
  }),
  methods: {
    ...mapActions(["addCandidate"]),
    async onFileChange(event) {
      const file = event.target.files[0];
      this.pdfFile = file;
      ``;
    },
    onDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      this.pdfFile = file;
      console.log(file);
    },
    validateForm() {
      if (this.formData.name == "" || !this.formData.name) {
        return false;
      } else if (this.formData.skills == [] || !this.formData.skills) {
        return false;
      } else if (this.formData.address == "" || !this.formData.address) {
        return false;
      } else if (this.formData.education == "" || !this.formData.education) {
        return false;
      } else if (this.formData.phone == "" || !this.formData.phone) {
        return false;
      } else if (this.formData.email == "" || !this.formData.email) {
        return false;
      }
      return true;
    },
    submmitForm() {
      if (this.validateForm()) {
        this.addCandidate({ ...this.formData });
      }else{
        alert("Please enter the details properly")
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.upload-resume-container {
  margin: 4rem auto 2rem auto;
  height: 100%;
  width: 60%;
}
.resume-uploader-conatiner {
  margin-bottom: 2rem;
}

.pdf-dropbox {
  height: 10rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.125rem dashed #ccc;
  padding: 1.25rem;
  background: rgba($tint-five, 0.3);
}

.pdf-dropbox label {
  font-size: 1.125rem;
  margin-bottom: 0.625rem;
}

.pdf-dropbox input {
  display: none;
}
</style>
