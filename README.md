## Telicent Frontend CLI ("TEFE" CLI)

A CLI for helping create Telicent [JavaScript-based projects](https://github.com/search?q=org%3Atelicent-oss++AND+%28language%3ATypeScript+OR+language%3AJavaScript+%29&type=code)


This CLI centralizes common commands and configuration, enforcing a consistent approach across Telicent projects. When installed in a project there are two main uses:
1. enable automated checks and modifications of project files — for example, ensuring a standardized GitHub PR template exists
2. exposes utility commands we have found useful in our JavaScript-based projects - for example printing values from `.npmrc` files that are masked for security by default

## Usage

### Install

1. **Install**
   ```sh
   # Within your project directory:
   cd <JavaScript-based project>
   yarn add @telicent-oss/telicent-frontend-cli -D
   # IMPORTANT: When using `yarn`, run commands like "yarn tefe" to ensure you use the local CLI.
   ```
2. **Configure Postinstall**
   Add the following to your package.json `script` field:
   ```json
   "postinstall": "[ \"$LOCAL_MACHINE\" = \"false\" ] && echo 'Skipping tefe hook-postinstall' || tefe hook-postinstall"
   ```
4. **Run and approve**
   Re-run `yarn postinstall` so the CLI can check and modify your project files. When no more suggestions/errors appear, the installation is complete.

### Help

All commands are available via `tefe help`:
<!-- help -->
```
Usage: tefe [options] [command]

Options:
  -h, --help               display help for command

Commands:
  version                  read version
  info                     Get context to help CLI developers
  hook-precommit           Telicent frontend precommit hook
  hook-postinstall         Telicent frontend postinstall hook
  config [options]         Show current directoryʼs ./tefe.config.json
  npmrc-authtoken [value]  Fetch NPM configuration tokens from the nearest
                           npmrc file (WARNING: Has limitations see
                           extractTokens.ts TODO)
  docker-build             docker build
  docker-run               docker run
  docker-open              open app in docker
  help [command]           display help for command

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
yarn install
yarn build
yarn link # creates symlink
# Sym-link/bin changes (e.g. package.json "bin" field) require:
yarn unlink && yarn link
```

Then for every local package you wish to use this cli:
```sh
cd <package>
yarn link @telicent-oss/telicent-frontend-cli
yarn tefe version
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
