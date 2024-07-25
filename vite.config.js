import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from "@sveltejs/kit/vite";
import fs from "fs";
import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: "5lc",
        project: "javascript-sveltekit",
      },
    }),
    sveltekit(),
    rawFonts([".ttf"]),
  ],
  resolve: {
    alias: {
      rxjs: path.resolve(__dirname, "node_modules/rxjs"),
      "rxjs/operators": path.resolve(
        __dirname,
        "node_modules/rxjs/operators/index.js"
      ),
      "styled-components": path.resolve(
        __dirname,
        "node_modules/styled-components"
      ),
    },
  },
  optimizeDeps: {
    include: ["sanity"],
  },

  build: {
    sourcemap: true, // Config vite to generate sourcemap when bundling.
  },
};

function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(code, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return { code: `export default ${JSON.stringify(buffer)}`, map: null };
      }
    },
  };
}

export default config;
