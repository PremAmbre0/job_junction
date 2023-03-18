const isBuildVersion = process.env.NODE_ENV === "production";
const BASE_URL = isBuildVersion
  ? window.location.origin + "/"
  : "https://ad7a-103-220-42-199.in.ngrok.io";

export default {
  BASE_URL,
  LOGIN : BASE_URL + "/login",
};
