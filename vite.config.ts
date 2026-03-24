import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: {
    pluginSearchDirs: ["./node_modules"],
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: [],
  },
});
