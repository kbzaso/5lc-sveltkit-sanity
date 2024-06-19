import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from "@sveltejs/kit/vite";
import fs from "fs";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sentrySvelteKit({
    sourceMapsUploadOptions: {
      org: "5lc",
      project: "javascript-sveltekit"
    }
  }), sveltekit(), rawFonts([".ttf"])],

  optimizeDeps: {
    include: ["sanity"],
  },

  build:{
    sourcemap: true // Config vite to generate sourcemap when bundling.
  }
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