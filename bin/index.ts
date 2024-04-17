#!/usr/bin/env node

// Import Commander and other necessary modules
import { program } from 'commander';
import config from '../src/config.js';
import info from '../src/info/info.js';
import '../src/autoupdate.js';


program
  .command('info')
  .description('Get context to help CLI developers')
  .action(info);

program
  .command('config')
  .description('Show current directory ./tefe.config.json')
  .option('--init', 'Try create ./tefe.config.json')
  .action(config);

// Parse and execute the commands
program.parse(process.argv);

// Handling errors (similar to Caporal's catch block)
process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});
