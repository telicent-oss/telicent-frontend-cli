## Telicent Frontend CLI ("TEFE" CLI)

CLI package to capture & propagate _Telicent frontend opinion_ on code, config & tools

Install this in each npm package repository to provide:
1. Some scripts to manually-trigger
    * idea: generate Telicent-flavoured™ Cypress config
2. Some scripts to use in hooks
    * idea: echo "tefe test-only-changed-files" >> ./husky/pre-commit
3. Some self-executing checks
    * idea: on CI, check yarn.lock didn't change after yarn install

And perhaps if we add globally-useful dev-scripts, we end up using this as a global install on our dev machines

## Install

```sh
# Install within a package
cd <npm package directory>;
yarn add @telicent-oss/telicent-frontend-cli
# IMPORTANT: If you use `yarn` to install locally, manually prefix with "yarn" e.g. `yarn tefe`
```

To test:
```sh
yarn tefe version # or `tefe version`
```

## Usage

All commands are available via `tefe help`:
<!-- help -->
```sh
Usage: tefe [options] [command]

Options:
  -h, --help        display help for command

Commands:
  version           read version
  info              Get context to help CLI developers
  config [options]  Show current directory ./tefe.config.json
  noise [options]   Woof (default) or meow
  help [command]    display help for command

```
<!-- /help -->

**Note**: This package uses [update-notifier](https://www.npmjs.com/package/update-notifier?activeTab=readme)

<details>
  <summary>To develop commands:</summary>

<hr />

### Tips

1. TypeScript source files import with `.js` extension e.g. `import a from './path.js`  (as `./src/**/*.ts` files are emitted and run from `./dist/**/*.js`)
2. JavaScript test files must not include any extension in imports `import a from './path';`
3. CLI developer workflows require heavy use of _symlinks_ via
    * [yarn link](https://classic.yarnpkg.com/lang/en/docs/cli/link/)
    * [yarn unlink](https://classic.yarnpkg.com/en/docs/cli/unlink#search)
    * And custom [yarn relink](https://github.com/telicent-oss/telicent-frontend-cli/commit/7e85e2383dd2494486cde4f65146dbb606b49159#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519R10) command for forcing stubborn symlinks to reset

4. It might help to familiarise yourself with the general process of
[building CLI tools](https://www.google.com/search?q=npm+cli+development+tutorial)


### Dev workflow

```sh
# To use (and develop) locally:
git clone git@telicent-oss/telicent-frontend-cli
cd telicent-frontend-cli
yarn link # creates symlink
# Sym-link/bin changes (e.g. package.json "bin" field) require:
yarn unlink && yarn link
```

Then for every local package you wish to use this cli:
```sh
cd <package>
yarn link @telicent-oss/telicent-frontend-cli
```

Or to use the package globally:
```sh
yarn global link @telicent-oss/telicent-frontend-cli
```

### Best Practices

**Automate** - When you have an idea for a CLI task:
   - Try to automate the task
   - Else, try to automate part of the task
   - Else, try to automate errors/warnings
   - Else, create some feedback to help the next idea

**Inter-operability**: Bias for CLI scripts running (consistently) on as many different platforms as possible — including stripped down CI machines. So:
* avoid non-node code
* target node 16
* do not bundle, to allow easy ssh-debugging/editing of scripts on CI machines

**Usefulness**: Avoid being so precious about the code that nothing gets added


</details>
