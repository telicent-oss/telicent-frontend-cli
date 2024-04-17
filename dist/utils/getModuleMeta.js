import { fileURLToPath } from "url";
import { dirname } from "path";
export const getModuleMeta = (importMetaUrl) => {
    const __filename = fileURLToPath(importMetaUrl);
    const __dirname = dirname(__filename);
    return {
        __filename,
        __dirname,
    };
};
//# sourceMappingURL=getModuleMeta.js.map