import { findWorkflowNpmInstallCommands } from './check/findWorkflowNpmInstallCommands.js'
import { tryWritePrecommit } from './check/tryWritePrecommit.js'

export const hookPreinstall = (): void => {
  findWorkflowNpmInstallCommands()
  tryWritePrecommit()
}
