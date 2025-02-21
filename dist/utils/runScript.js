import { spawn } from 'child_process';
import path from 'path';
import { dirname } from './dirname.js';
export const runScript = (scriptLoc, args = []) => 
/**
 */
(options, _command) => {
    console.log('scriptLoc', scriptLoc);
    console.log('dirname', dirname);
    const scriptPath = path.join(dirname, scriptLoc);
    console.log('scriptPath', scriptPath);
    const proc = spawn('bash', [scriptPath, ...args], {
        cwd: process.cwd(), // current working directory should be the repo root
        stdio: 'inherit'
    });
    proc.on('close', (code) => process.exit(code || 0));
};
//# sourceMappingURL=runScript.js.map