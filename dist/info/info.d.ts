#!/usr/bin/env node
import type { Command } from 'commander';
declare const info: (options: Record<string, unknown>, _command: Command) => void;
export default info;
