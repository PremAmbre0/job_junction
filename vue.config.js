const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/scss/main.scss";
        `,
      },
    },
  },
  transpileDependencies: ["vuetify"],
});
