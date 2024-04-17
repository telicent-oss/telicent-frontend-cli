import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Reads a JSON file from the directory where the CLI package is located
export const readJsonAtInternal = (jsonPath) => {
    try {
        const fullPath = path.resolve(__dirname, jsonPath);
        const text = fs.readFileSync(fullPath, "utf8");
        return JSON.parse(text);
    }
    catch (error) {
        throw new Error(`${jsonPath} from ${error}`);
    }
};
//# sourceMappingURL=readJsonAtInternal.js.map