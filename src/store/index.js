import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import api from "../../apis/index";

Vue.use(Vuex);

let apiErrorFunction = ({ err, commit, reject }) => {
  console.log("[HTTP API Request Error]", err);
  if (err.message == "Network Error") {
    commit("openSnackbar", { text: "Network Error!", type: "error" });
    console.error("Network Error!");
    commit("closeLoaderDialog");
  } else if (err.response && err.response.status == 401) {
    localStorage.clear();
    commit("resetState");
  } else if (err.response && err.response.status == 400) {
    commit("openSnackbar", {
      text: err.response.data.message || "Request Failed, please try again!",
      type: "error",
    });
  } else if (err.response && err.response.status == 500) {
    console.error("Internal SERVER ERROR!");
  } else {
    commit("openSnackbar", {
      text: "Request Failed, please try again!",
      type: "error",
    });
  }
  let errMsg = "";
  try {
    errMsg = err.response.data.message;
    if (typeof errMsg == "object") {
      errMsg = errMsg[Object.keys(errMsg)[0]];
    }
  } catch (e) {
    console.log(e);
  }
  reject({
    ok: false,
    err,
    message: errMsg || "Request Failed, please try again",
  });
};

export default new Vuex.Store({
  state: {
    isRegistered: false,
    loaderDialog: false,
    snackbarState: false,
    snackbarText: "",
    snackbarTime: -1,
    currentState: {},
    messages: {
      loginFailed: "",
      failure: "",
    },
    showOverlayLoader: false,
    snackbarColor: "",
  },
  getters: {
    isRegistered: (state) => state.isRegistered,
    loaderDialog: (state) => state.loaderDialog,
    snackbarState: (state) => state.snackbarState,
    snackbarText: (state) => state.snackbarText,
    snackbarTime: (state) => state.snackbarTime,
    snackbarColor: (state) => state.snackbarColor,
  },
  mutations: {
    openLoaderDialog(state) {
      state.loaderDialog = true;
    },
    closeLoaderDialog(state) {
      state.loaderDialog = false;
    },
    openSnackbar(state, { text = "", time = 3000, type = "" } = {}) {
      state.snackbarTime = time;
      state.snackbarText = text;
      state.snackbarState = true;
      switch (type) {
        case "error":
          state.snackbarColor = "#BF2600";
          break;
        case "success":
          state.snackbarColor = "#00875A";
          break;
        case "":
          state.snackbarColor = "#5243AA";
          break;
      }
    },
    closeSnackbar(state) {
      state.snackbarState = false;
    },
    openOverlayLoader(state) {
      state.showOverlayLoader = true;
    },
    closeOverlayLoader(state) {
      state.showOverlayLoader = false;
    },
  },
  actions: {
    apiCall({ commit }, partConfig) {
      return new Promise((resolve, reject) => {
        commit("openOverlayLoader");
        axios({
          ...partConfig,
        })
          .then((response) => {
            let data = response.data;
            resolve(data);
            commit("closeOverlayLoader");
          })
          .catch((err) => {
            apiErrorFunction({ err, commit, reject });
            commit("closeOverlayLoader");
          });
      }).catch((err) => {
        apiErrorFunction({ err, commit, reject });
        commit("closeOverlayLoader");
      });
    },
    getAuth: async ({ commit, dispatch }, payload) => {
      let { username, password } = payload;
      let fail = (msg) => commit("failure", msg);
      return dispatch("apiCall", {
        method: "post",
        url: api.LOGIN,
        data: { username, password },
      })
        .then((data) => {
          commit("openSnackbar", {
            text: "Login Successfully!",
            type: "success",
          });
          return data;
        })
        .catch((err) => {
          console.error("Err:", err);
          commit(
            "openSnackbar",
            {
              text: "Failed to Login, try again!",
              type: "error",
            },
            { root: true }
          );
          fail(err.toString() || "Failed to Login");
          return {
            ok: false,
            message: err.message,
          };
        });
    },
  },
  modules: {},
});
