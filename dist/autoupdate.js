#!/usr/bin/env node
import * as updateNotifier from "update-notifier";
import * as fs from 'fs';
const pkg = JSON.parse(`${fs.readFileSync('./package.json')}`);
updateNotifier.default({ pkg }).notify();
//# sourceMappingURL=autoupdate.js.map