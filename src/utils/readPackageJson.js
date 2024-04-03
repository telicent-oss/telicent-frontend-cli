import { join } from "path";
import fs from "fs";
import getModuleMeta from "./getModuleMeta.js";
const { __dirname } = getModuleMeta(import.meta.url);

const readPackageJson = () => {
    const path = join(__dirname, "../../package.json");
    const text = fs.readFileSync(path, "utf8");
    return JSON.parse(text);
}

export default readPackageJson;
