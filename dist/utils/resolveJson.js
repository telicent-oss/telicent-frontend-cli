import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const resolveJson = (jsonFilePath) => {
    // Obtain the directory name of the current module
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // Resolve the full path to the JSON file
    const fullPath = path.resolve(__dirname, jsonFilePath);
    // Check if the file exists synchronously
    if (existsSync(fullPath)) {
        return fullPath;
    }
    else {
        throw new Error(`JSON file not found: ${fullPath}`);
    }
};
export default resolveJson;
//# sourceMappingURL=resolveJson.js.map