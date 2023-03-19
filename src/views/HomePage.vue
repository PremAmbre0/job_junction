<template>
  <div class="home-page-wrapper">
    <div class="home-page">
      <div class="homepage-header">
        <h1>Join as a Job Applicant or Recruiter</h1>
      </div>
      <div class="home-page-actions">
        <div
          class="form-action-options"
          :class="selectedRole == 'job_seeker' ? 'selected-role' : ''"
          @click="triggerRadioBtnClick('job_seeker')"
        >
          <div class="form-action-icon">
            <img src="@/assets/job.png" alt="" />
          </div>
          <h2 class="form-action-text">I am a Job Seeker</h2>
          <label for="job_seeker">
            <input
              class="radios"
              type="radio"
              id="job_seeker"
              name="role"
              value="job_seeker"
              ref="job_seeker"
            />
          </label>
        </div>
        <div
          class="form-action-options"
          :class="selectedRole == 'recruiter' ? 'selected-role' : ''"
          @click="triggerRadioBtnClick('recruiter')"
        >
          <div class="form-action-icon">
            <img src="@/assets/recruitment.png" alt="" />
          </div>
          <h2 class="form-action-text">I am a Job Recruiter</h2>
          <label for="recruiter">
            <input
              type="radio"
              class="radios"
              id="recruiter"
              name="role"
              value="recruiter"
              ref="recruiter"
            />
          </label>
        </div>
      </div>
      <div class="home-page-action-submit-btn">
        <v-btn
          class="submit-btn"
          rounded
          color="#5243AA"
          block
          large
          :disabled="disableSubmitBtn"
          @click="onSubmitBtnClick"
        >
          {{ btnText }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data: () => ({
    selectedRole: "",
  }),
  methods: {
    triggerRadioBtnClick(val) {
      this.selectedRole = val;
      this.$refs[`${val}`].click();
    },
    onSubmitBtnClick() {
      if (this.selectedRole == "job_seeker") {
        this.$router.push("/uploadResume");
      } else {
        this.$router.push("/recruiterForm");
      }
    },
  },
  computed: {
    disableSubmitBtn() {
      if (!!this.selectedRole) {
        return false;
      }
      return true;
    },
    btnText() {
      if (this.selectedRole == "job_seeker") {
        return "Apply as a Job Seeker";
      } else {
        return "Apply as a Recruiter";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home-page-wrapper {
  height: 100%;
  width: 100%;
  padding-top: 4rem;
}

.home-page {
  max-width: 43.75rem;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  border: 0.5px solid $primary;
  border-radius: 1rem;
  padding: 3rem;
}
.home-page-actions {
  display: flex;
  width: 100%;
  height: 10rem;
  justify-content: space-evenly;
  align-items: cenetr;
  margin-bottom: 2.5rem;
  img {
    height: 3rem;
    width: 3rem;
  }
}
.homepage-header {
  margin-bottom: 2.5rem;
  width: 100%;
  text-align: center;
}
.form-action-options {
  border: 0.5px solid $primary;
  border-radius: 1rem;
  position: relative;
  padding: 2rem;
}
.submit-btn {
  color: white;
  font-weight: 500;
}
.selected-role {
  border: 2px solid $primary;
}

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.5em;
  height: 1.5em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  position: absolute;
  top: 6%;
  right: 3%;
  &::before {
    content: "";
    width: 0.8em;
    height: 0.8em;
    background-color: $primary;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em $primary;
    background-color: CanvasText;
  }
  &:checked::before {
    transform: scale(1);
  }
}

.radios:focus-within {
  color: $primary;
}
</style>
