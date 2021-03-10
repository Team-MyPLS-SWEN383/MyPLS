// this file is responsible for helping NPM bundle everything into the "bundle.js" file in the "public" folder
// as well as generating the source maps for better debugging support

// tsconfig.json is for telling the editor (and rollup) how typescript should be configured.

import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default [{
  input: './src/server/index.ts',
  output: {
    name: 'Server',
    file: './server/bundle.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    typescript(),
    json(),
  ]
}, {
  input: "./src/client/index.ts",
  output: {
    name: 'Client',
    file: './public/js/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      browser: true
    }),
    commonjs(),
    typescript(),
    json(),
  ]
}];
