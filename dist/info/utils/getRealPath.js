import fs from "fs";
function getRealPath(path) {
    try {
        return fs.realpathSync(path);
    }
    catch (error) {
        // If there's an error resolving the path, return 'unknown'
        return `Unknown`;
    }
}
export default getRealPath;
//# sourceMappingURL=getRealPath.js.map