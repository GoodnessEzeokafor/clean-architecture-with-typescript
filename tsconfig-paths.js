const tsConfigPaths = require("tsconfig-paths");
// import tsConfigPaths from "tsconfig-paths";
// import tsConfig from "./tsconfig.json";
const tsConfig = require("./tsconfig.json");

// we have to use tsconfig-paths to rewrite absolute paths into relative path
// when compiling production when compiling production code to build
// https://github.com/microsoft/TypeScript/issues/10866
tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths: tsConfig.compilerOptions.paths,
});
