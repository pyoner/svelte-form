import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "{src,test}/**/*.ts": ["vp fmt", "git add"],
  },
});
