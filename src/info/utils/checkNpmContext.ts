#!/usr/bin/env node

import * as fs from "fs";
import formatJsonFile from "../../utils/formatJsonFile.js";
import tryCatch from "../../utils/tryCatch.js";
import {
  getTefeJson,
  TEFE_CONFIG,
} from "../../utils/tefe.config.json.utils.js";
import { readJsonAtInternal } from "../../utils/readJsonAtInternal.js";
import { readJsonAtInvoked } from "../../utils/readJsonAtInvoked.js";

export const TEFE = "@telicent-oss/telicent-frontend-cli";

function checkNpmContext() {
  const packageJson = `${process.cwd()}/package.json`;
  const isNpmPackage = fs.existsSync(packageJson);
  
  const isTefePackage = isNpmPackage && readJsonAtInternal(packageJson).name === TEFE;
  const isTefeInstalled = tryCatch(() => readJsonAtInvoked(TEFE), true, false);
  const tefeJson = getTefeJson() ? formatJsonFile(TEFE_CONFIG) : false;
  return [
    ["process.cwd():", process.cwd()],
    ["Current dir:", ""],
    ["  - is npm package:", isNpmPackage],
    [`  - is ${TEFE}:`, isTefePackage, isNpmPackage ? ` (${readJsonAtInternal(packageJson).name}@${readJsonAtInternal(packageJson).version})` : ''],
    ["  - has tefe installed:", isTefeInstalled],
    [`  - has ${TEFE_CONFIG}:`, tefeJson],
  ];
}

export default checkNpmContext;
