#!/usr/bin/env node

import fs from "fs";
import formatJsonFile from "../../utils/formatJsonFile.js";
import tryCatch from "../../utils/tryCatch.js";
import {
  getTefeJson,
  TEFE_CONFIG,
} from "../../utils/tefe.config.json.utils.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export const TEFE = "@telicent-oss/telicent-frontend-cli";

function checkNpmContext() {
  const packageJson = `${process.cwd()}/package.json`;
  const isNpmPackage = fs.existsSync(packageJson);
  const isTefePackage = isNpmPackage && require(packageJson).name === TEFE;
  const isTefeInstalled = tryCatch(() => require.resolve(TEFE), true, false);
  const tefeJson = getTefeJson() ? formatJsonFile(TEFE_CONFIG) : false;
  return [
    ["process.cwd():", process.cwd()],
    ["Current dir:", ""],
    ["  - is npm package:", isNpmPackage],
    [`  - is ${TEFE}:`, isTefePackage, isNpmPackage ? ` (${require(packageJson).name})` : ''],
    ["  - has tefe installed:", isTefeInstalled],
    [`  - has ${TEFE_CONFIG}:`, tefeJson],
  ];
}

export default checkNpmContext;
