import * as path from "path";
import * as fs from "fs";
import * as getModuleMeta from "./getModuleMeta.js";
const { __dirname } = getModuleMeta.getModuleMeta(import.meta.url);
const readJson = (jsonPath) => {
    const packageJson = path.join(__dirname, jsonPath);
    const text = fs.readFileSync(packageJson, "utf8");
    return JSON.parse(text);
};
export default readJson;
//# sourceMappingURL=readJson.js.map