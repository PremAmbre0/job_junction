const isBuildVersion = process.env.NODE_ENV === "production";
const BASE_URL = isBuildVersion
  ? window.location.origin + "/"
  : "https://05e0-103-220-42-199.in.ngrok.io";

export default {
  BASE_URL,
  LOGIN: BASE_URL + "/login",
  REGISTER: BASE_URL + "/register",
  ADD_JOB: BASE_URL + "/add_job",
  ADD_CANDIDATE: BASE_URL + "/add_candidate",
};
