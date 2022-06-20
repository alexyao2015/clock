import { defineNuxtConfig } from "nuxt";
import vuetify from "vite-plugin-vuetify";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // css: ["vuetify/styles"],
  vite: {
    // build: {
    //   sourcemap: "inline",
    // },
    ssr: {
      noExternal: ["vuetify"],
    },
    //   server: {
    //     port: 3000,
    //     hmr: {
    //       protocol: "wss",
    //       clientPort: 443,
    //       port: 3001,
    //       host: "alexyao2015-clock-xx66g9vv3pjq4-3001.githubpreview.dev",
    //     },
    //   },
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins.push(vuetify())
      );
    },
  ],
});
