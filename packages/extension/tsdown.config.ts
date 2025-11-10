import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/extension.ts"],
  format: ["cjs"],
  outDir: "dist",
  dts: false,
  clean: true,
  external: ["vscode"],
});
