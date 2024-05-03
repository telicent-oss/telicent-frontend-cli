import type { Command } from 'commander';
interface ConfigOptions {
    init?: boolean;
}
export declare const config: (options: ConfigOptions, _command: Command) => void;
export {};
