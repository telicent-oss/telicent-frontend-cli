import { findWorkflowNpmInstallCommands } from "./check/findWorkflowNpmInstallCommands.js";
import { tryWritePrecommit } from "./check/tryWritePrecommit.js";
export const hookPreinstall = () => {
    findWorkflowNpmInstallCommands();
    tryWritePrecommit();
};
//# sourceMappingURL=hookPreinstall.js.map