import * as fs from "fs";
import { extractTokens } from "./extractTokens.js";
import { findFile } from "./findFile.js";
import { mask } from "./mask.js";
const getNpmConfig = (value) => {
    const replacer = (_, v) => typeof v === "string" ? mask(`${v}`) : v;
    try {
        const npmrcPath = findFile();
        if (!npmrcPath) {
            console.error("No .npmrc file found.");
            process.exit(1);
        }
        const npmrc = fs.readFileSync(npmrcPath, "utf8");
        const tokens = extractTokens(npmrc);
        if (value && tokens.hasOwnProperty(value)) {
            if (process.env.UNMASK === "true") {
                console.log(tokens[value]);
            }
            else {
                console.log(mask(tokens[value]));
            }
        }
        else {
            console.log(JSON.stringify(tokens, replacer, 2));
        }
    }
    catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};
export default getNpmConfig;
//# sourceMappingURL=index.js.map