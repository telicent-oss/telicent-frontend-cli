#!/usr/bin/env node
import clean from "../utils/clean.js";
import logList from "./utils/logList.js";
import getRealPath from "./utils/getRealPath.js";
import checkNpmContext from "./utils/checkNpmContext.js";
import readPackageJson from "../utils/readPackageJson.js";

const info = ({ logger }) => {
  const [nodePath, binPath] = process.argv;

  logList(logger.info, [
    ["Version:", readPackageJson().version],
    ["CLI bin path:", clean(binPath)],
    ["CLI (real) path:", clean(getRealPath(binPath))],
    ["Node path:", clean(nodePath)],
    ...checkNpmContext(),
  ]);
};


export default info;