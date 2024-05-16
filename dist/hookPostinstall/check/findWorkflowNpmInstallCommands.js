import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import c from 'chalk';
const workflowsDir = './.github/workflows';
const targetCommands = [
    'npm install',
    'yarn install',
    /* skipped 'yarn' and 'npm i' to keep things simple */
];
export const findWorkflowNpmInstallCommands = () => {
    const files = fs
        .readdirSync(workflowsDir)
        .filter((file) => file.endsWith('.yml') || file.endsWith('.yaml'));
    let userActionNeeded = false;
    files.forEach((file) => {
        const filePath = path.join(workflowsDir, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const doc = yaml.parse(fileContents);
        Object.entries(doc.jobs).forEach(([jobName, job]) => {
            job?.steps?.forEach((step, index) => {
                targetCommands.forEach((cmd) => {
                    if (!step.run) {
                        return;
                    }
                    const fullCmd = `LOCAL_MACHINE=false ${cmd}`;
                    if (step.run.includes(cmd) && !step.run.includes(fullCmd)) {
                        const FILE = c.yellowBright(filePath);
                        const JOB = c.yellowBright(jobName);
                        const CMD = c.redBright(cmd);
                        const NEW_CMD = c.greenBright(`LOCAL_MACHINE=false`) + ' ' + c.green(`${cmd}`);
                        console.error(`Change file "${FILE}" job: ${JOB} '${CMD}' to '${NEW_CMD}'.`);
                        userActionNeeded = true;
                    }
                });
            });
        });
    });
    if (userActionNeeded) {
        const USER_ACTION_NEEDED = c.redBright(`USER ACTION NEEDED`);
        const CLI_NAME = c.whiteBright(`@telicent-oss/telicent-frontend-cli`);
        console.error(`${USER_ACTION_NEEDED} - Without above changes, ${CLI_NAME} may cause unintended consequences.`);
        process.exit(1);
    }
};
//# sourceMappingURL=findWorkflowNpmInstallCommands.js.map