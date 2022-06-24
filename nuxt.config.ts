import { defineNuxtConfig } from "nuxt";
import vuetify from "vite-plugin-vuetify";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    // build: {
    //   sourcemap: "inline",
    // },
    build: {
      transpile: ["vuetify"],
    },
    ssr: {
      noExternal: ["vuetify"],
    },
    server: {
      // port: 3000,
      hmr: {
        // protocol: "wss",
        clientPort: 3001,
        port: 3001,
        // host: "alexyao2015-clock-9wvvgqjj3xx4v-3001.githubpreview.dev",
      },
    },
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins.push(vuetify({ autoImport: true }))
      );
    },
    "@pinia/nuxt",
  ],
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  ssr: false,
});
