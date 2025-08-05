#!/usr/bin/env node
const { Command } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

export const devScript = async (script:string) => {
    const target = path.resolve(script);
    let src = target;

    // 1) locate or copy from example
    if (!fs.existsSync(target)) {
      const example = target.replace(/\.gitignored$/, '') + '.example';
      if (fs.existsSync(example)) {
        const { copy } = await inquirer.prompt([{
          type: 'confirm',
          name: 'copy',
          message: `${script} not found. Copy from ${path.basename(example)}?`,
          default: false
        }]);
        if (!copy) process.exit(1);
        fs.copyFileSync(example, target);
        console.log(`→ Copied ${path.basename(example)} → ${script}`);
      } else {
        console.error(`✖ Neither ${script} nor ${path.basename(example)} exists`);
        process.exit(1);
      }
    }

    // 2) prompt for any KEY="<hint>" placeholders
    let text = fs.readFileSync(target, 'utf8');
    const re = /^(\w+)=["']<([^>]+)>["']/mg;
    for (const m of text.matchAll(re)) {
      const [full, key, hint] = m;
      const { val } = await inquirer.prompt([{
        type: 'input',
        name: 'val',
        message: `Enter value for ${key} (${hint}):`
      }]);
      text = text.replace(full, `${key}="${val}"`);
    }
    fs.writeFileSync(target, text);

    // 3) offer to run
    const { run } = await inquirer.prompt([{
      type: 'confirm',
      name: 'run',
      message: `Run ${script}?`,
      default: true
    }]);
    if (run) {
      spawnSync(script, { stdio: 'inherit', shell: true });
    }
  };
