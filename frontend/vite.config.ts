import { defineConfig } from "vite";
import * as glob from "fast-glob";
import * as path from "path";

// Find all HTML files and build an object of names and paths to work from
const files = glob.sync(path.resolve(__dirname, "src") + "/**/*.html").reduce((acc, cur) => {
  let name = cur.replace(path.join(__dirname) + "/src/", "").replace("/index.html", "");
  // If name is blank, make up a name for it, like 'home'
  if (name === "") {
    name = "home";
  }

  acc[name] = cur;
  return acc;
}, {});

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, "src"),
  base: "./",
  build: {
    // lib: {
    //   entry: "src/my-element.ts",
    //   formats: ["es"],
    // },
    outDir: "../dist",
    rollupOptions: {
      external: /^lit/,
      input: files,
    },
  },
  server: {
    hmr: {
      clientPort: 443,
    },
  },
});
