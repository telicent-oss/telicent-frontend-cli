import { findWorkflowNpmInstallCommands } from './check/findWorkflowNpmInstallCommands.js';
import { tryWritePrecommit } from './check/tryWritePrecommit.js';
export const hookPostinstall = () => {
    findWorkflowNpmInstallCommands();
    tryWritePrecommit();
};
//# sourceMappingURL=hookPostinstall.js.map