<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="this.$route.path != '/'">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
      <v-snackbar
        v-model="localSnackbarState"
        multi-line
        light
        :timeout="snackbarTime"
        text
        :color="snackbarColor"
        top
      >
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click.stop="closeSnackbar" icon>
            <v-icon color="#091E42">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <v-overlay :value="showOverlayLoader">
        <v-progress-circular
          indeterminate
          color="#5243AA"
          size="70"
        ></v-progress-circular>
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "App",

  data: () => ({
    localSnackbarState: false,
  }),
  methods: {
    ...mapMutations(["openSnackbar", "closeSnackbar"]),
  },
  computed: {
    ...mapGetters([
      "snackbarState",
      "snackbarText",
      "snackbarTime",
      "snackbarColor",
      "showOverlayLoader",
    ]),
  },
  watch: {
    snackbarState(nv) {
      this.localSnackbarState = nv;
    },
    localSnackbarState(nv) {
      if (!nv) {
        this.closeSnackbar();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.snackbarComponentWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // err since error is the styling class in vuetify
  &.err {
    color: $red;
  }
}
</style>
