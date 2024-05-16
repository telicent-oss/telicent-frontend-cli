#!/usr/bin/env node
// Import Commander and other necessary modules
import { program } from 'commander';
import { config } from '../config/config.js';
import info from '../info/info.js';
import '../autoupdate.js';
import { readJsonAtInternal } from '../utils/readJsonAtInternal.js';
import { PACKAGE_JSON } from '../constants.js';
import npmrcAuthToken from '../npmrcAuthToken/index.js';
import { hookPrecommit } from '../hookPrecommit/hookPrecommit.js';
import { hookPostinstall } from '../hookPostinstall/hookPostinstall.js';
program
    .command('version')
    .description('read version')
    .action(() => console.log(readJsonAtInternal(PACKAGE_JSON).version));
program
    .command('info')
    .description('Get context to help CLI developers')
    .action(info);
program
    .command('hook-precommit')
    .description('Telicent frontend precommit hook')
    .action(hookPrecommit);
program
    .command('hook-postinstall')
    .description('Telicent frontend postinstall hook')
    .action(hookPostinstall);
program
    .command('config')
    .description('Show current directoryʼs ./tefe.config.json')
    .option('--init', 'Try create ./tefe.config.json')
    .action(config);
program
    .command('npmrc-authtoken')
    .description('Fetch NPM configuration tokens from the nearest npmrc file (WARNING: Has limitations see extractTokens.ts TODO)')
    .argument('[value]', 'The token key to fetch. Requires env/script var UNMASK=true to output actual value')
    .action(npmrcAuthToken);
// Parse and execute the commands
try {
    program.parse(process.argv);
}
catch (error) {
    console.error(`Parse error ${error}`);
}
process.on('uncaughtException', (error) => {
    console.error(`uncaughtException ${error}`);
    process.exit(1);
});
//# sourceMappingURL=index.js.map