import type { Command } from 'commander';
interface RunScriptOptions {
}
/**
 * Runs a shell script as a child processes, ensuring the there is
 * access to telicent-frontend-cli's  working directory (and environment)
 * so the shell scripts in this repo can can source other files in this repo
 *
 * Higher order function for config of command's action
 */
export declare const runScript: (scriptLoc: string, args?: string[]) => (options: RunScriptOptions, _command: Command) => void;
export {};
