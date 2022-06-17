import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import svg from "rollup-plugin-svg";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import static_files from "rollup-plugin-static-files";

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ["./dist"],
  host: "0.0.0.0",
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};
const reloadopts = {
  port: 12345,
  delay: 300,
  clientUrl: "https://alexyao2015-clock-xx66g9vv3pjq4-12345.githubpreview.dev/livereload.js?snipver=1&port=443",
};

export default {
  input: "frontend/user.ts",
  output: {
    dir: "dist",
    format: "module",
  },
  plugins: [
    static_files({
      include: ["frontend/public/"],
    }),
    svg(),
    external(),
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    postcss(),
    dev && serve(serveopts),
    !dev && terser(),
    dev && livereload(reloadopts),
  ],
};
