import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";

export default [
  // React Component Bundle (external React)
  {
    input: "src/StackOneHub.tsx",
    output: [
      {
        file: "dist/StackOneHub.esm.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/StackOneHub.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      terser(),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
  },

  // Web Component Bundle (bundled React)
  {
    input: "src/WebComponentWrapper.tsx",
    output: {
      file: "dist/StackOneHub.web.js",
      format: "iife",
      name: "StackOneHubWebComponent",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      terser(),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
  },
];
