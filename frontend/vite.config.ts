import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "@vuetify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith("punch-");
          },
        },
      },
    }),
    vuetify({ autoImport: true }),
  ],
  base: "./",
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "src"),
  //   },
  // },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  build: {
    cssCodeSplit: true,
    // lib: {
    //   entry: path.resolve(__dirname, "src/main.ts"),
    //   name: "clock",
    //   fileName: (format) => `clock.${format}.js`,
    //   formats: ["iife"],
    // },
    rollupOptions: {
      input: "index.html",
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  server: {
    hmr: {
      clientPort: 443,
    },
  },
});
