import type { Command } from 'commander';
interface RunScriptOptions {
}
export declare const runScript: (scriptLoc: string, args?: string[]) => (options: RunScriptOptions, _command: Command) => void;
export {};
