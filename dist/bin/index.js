#!/usr/bin/env node
// Import Commander and other necessary modules
import { program } from 'commander';
import { config } from '../config/config.js';
import info from '../info/info.js';
import '../autoupdate.js';
import { readJsonAtInternal } from '../utils/readJsonAtInternal.js';
import { PACKAGE_JSON } from '../constants.js';
import npmrcAuthToken from '../npmrcAuthToken/index.js';
import publishUtils from '../publishUtils/index.js';
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
    .description('Show current directoryʼs ./tefe.config.json')
    .option('--init', 'Try create ./tefe.config.json')
    .action(config);
program
    .command('npmrc-authtoken')
    .description('Fetch NPM configuration tokens from the nearest npmrc file (WARNING: Has limitations see extractTokens.ts TODO)')
    .argument('[value]', 'The token key to fetch. Requires env/script var UNMASK=true to output actual value')
    .action(npmrcAuthToken);
program
    .command('publish-utils')
    .description('Various helpers for publishing.')
    .argument('[command]', 'Check if a dist tag is valid')
    .argument('[tag]', 'Dist tag to validate')
    .action(publishUtils);
// Parse and execute the commands
program.parse(process.argv);
process.on('uncaughtException', (err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map