<template>
  <div class="login-wrappper">
    <div class="login-container">
      <div class="login-image-container">
        <img src="@/assets/job_search.jpg" alt="" />
      </div>
      <div class="login-form-container">
        <div class="login-form">
          <div class="login-welcome-text">
            <h2 class="login-text-header">
              {{ isRegistered ? "Welcome Back!" : "Hello, there👋" }}
            </h2>
            <div class="login-text-desc">
              Enter your username and password to continue.
            </div>
          </div>
          <v-text-field
            v-model="username"
            outlined
            label="username"
            placeholder="username"
            clearable
            color="#5243AA"
          ></v-text-field>
          <v-text-field
            v-model="password"
            outlined
            type="password"
            label="password"
            placeholder="password"
            clearable
            color="#5243AA"
          ></v-text-field>
          <div class="login-btn-container">
            <v-btn
              class="login-btn"
              block
              large
              elevation="0"
              color="#5243AA"
              @click="register"
            >
              {{ !isRegistered ? "Sign In" : "Log In" }}
            </v-btn>
          </div>
          <div class="already-a-member">
            {{ isRegistered ? "new member," : "Already a member," }}
            <span @click="isRegistered = !isRegistered" class="register-text">
              {{ isRegistered ? "sign up?" : "logn in?" }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "loginAndSignup",
  data: () => ({
    username: "",
    password: "",
    isRegistered: false,
  }),
  methods: {
    ...mapActions(["login", "signup"]),
    register() {
      if (!this.isRegistered) {
        this.signup({
          username: this.username,
          password: this.password,
        }).then((res) => {
          if (res.ok) {
            this.$router.push("/home");
          }
        });
      } else {
        this.login({
          username: this.username,
          password: this.password,
        }).then((res) => {
          if (res.ok) {
            this.$router.push("/home");
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrappper {
  height: 100vh;
  width: 100vw;
}
.login-container {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0 4rem;
  img {
    width: 100%;
    height: 100%;
    visibility: visible;
    object-fit: contain;
  }
}
.login-form-container {
  width: 100%;
  max-width: 43.75rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
.login-welcome-text {
  width: 100%;
  padding: 2rem 0;
}

.login-form {
  width: 100%;
  padding: 2rem;
}

.login-btn-container {
  height: 2rem;
  width: 100%;
}
.login-btn {
  color: white;
}
.already-a-member {
  margin-top: 4rem;
}
.register-text {
  color: $primary;
}
@media (max-width: 992px) {
  .login-container {
    img {
      visibility: hidden;
    }
  }
  .login-image-container {
    height: 0;
    width: 0;
  }
}
</style>
