/**
 * Single entry point for every table. `lib/db/index.ts` does
 * `import * as schema from "./schema"`, which now resolves to this file.
 */
export * from "./auth";
export * from "./enums";
export * from "./workspaces";
export * from "./rooms";
export * from "./messages";
export * from "./tasks";
export * from "./documents";
export * from "./activity";
