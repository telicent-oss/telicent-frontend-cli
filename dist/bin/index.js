#!/usr/bin/env node
// Import Commander and other necessary modules
import { program } from 'commander';
import config from '../config/index.js';
import info from '../info/info.js';
import '../autoupdate.js';
import { readJsonAtInternal } from '../utils/readJsonAtInternal.js';
import { PACKAGE_JSON } from '../constants.js';
import noise from '../noise/index.js';
program
    .command('version')
    .description('read version')
    .action(() => console.log(readJsonAtInternal(PACKAGE_JSON).version));
program
    .command('info')
    .description('Get context to help CLI developers')
    .action(info);
program
    .command('config')
    .description('Show current directory ./tefe.config.json')
    .option('--init', 'Try create ./tefe.config.json')
    .action(config);
program
    .command('noise')
    .description('Woof (default) or meow')
    .option('--meow', 'specify meow')
    .action(noise);
// Parse and execute the commands
program.parse(process.argv);
process.on('uncaughtException', (err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map