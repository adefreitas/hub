import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

export default [
  // React Component Bundle (external React)
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/react/StackOneHub.esm.js",
        format: "esm",
      },
      {
        file: "dist/react/StackOneHub.cjs.js",
        format: "cjs",
      },
    ],
    plugins: [
      del({ targets: "dist/react/*" }),
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
      file: "dist/webcomponent/StackOneHub.web.js",
      format: "iife",
      name: "StackOneHubWebComponent",
      sourcemap: true,
    },
    plugins: [
      del({ targets: "dist/webcomponent/*" }), // Clean the dist folder before each build
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

  // Declaration file bundle
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [del({ targets: "dist/index.d.ts" }), dts()],
  },
];
