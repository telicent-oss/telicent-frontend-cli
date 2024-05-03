import * as fs from 'fs';
import * as path from 'path';
export function findFile() {
    let currentDir = process.cwd();
    const root = path.parse(currentDir).root;
    while (currentDir !== root) {
        const npmrcPath = path.join(currentDir, '.npmrc');
        if (fs.existsSync(npmrcPath)) {
            return npmrcPath;
        }
        currentDir = path.dirname(currentDir);
    }
    return null;
}
//# sourceMappingURL=findFile.js.map