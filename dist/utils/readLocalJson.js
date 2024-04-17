import * as fs from "fs";
import * as getModuleMeta from "./getModuleMeta.js";
const { __dirname } = getModuleMeta.getModuleMeta(import.meta.url);
import getRealPath from '../info/utils/getRealPath.js';
const readLocalJson = (jsonPath) => {
    const packageJson = getRealPath(jsonPath);
    const text = fs.readFileSync(packageJson, "utf8");
    return JSON.parse(text);
};
export default readLocalJson;
//# sourceMappingURL=readLocalJson.js.map