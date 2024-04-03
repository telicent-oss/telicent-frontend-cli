import { fileURLToPath } from "url";
import { dirname } from "path";

const getModuleMeta = (importMetaUrl) => {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = dirname(__filename);

  return {
    __filename,
    __dirname,
  };
};
export default getModuleMeta;
