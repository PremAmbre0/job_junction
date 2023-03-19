import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "loginAndSignup",
    component: () => import("@/views/LogInAndSignUp.vue"),
  },
  {
    path: "/home",
    name: "HomePage",
    component: () => import("@/views/HomePage.vue"),
  },

  {
    path: "/uploadResume",
    name: "uploadResume",
    component: () => import("@/views/uploadResume.vue"),
  },
  {
    path: "/recruiterForm",
    name: "recruiterForm",
    component: () => import("@/views/RecruitersForm.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
