## Telicent Frontend CLI ("TEFE" CLI)

CLI package to capture _Telicent frontend opinion_ of code/config/tools.

Specific ideas:
1. manually-triggered scripts e.g. check system memory
2. `npm`/`yarn`/`git` scripts intended for life-cycle hooks e.g. test only changed files
3. _and most importantly_, self-executing (auto) checks e.g. _For any package that has this CLI installed, automatically ensure the package calls "lint" before "git commit"_ ).

The general philosophy is: _air quotes_ Automated alignment

## Install

```sh
# Install within a package
cd <npm package directory>;
npm install @telicent-oss/telicent-frontend-cli
# IMPORTANT: If you use `yarn` to install locally, manually prefix with "yarn" e.g. `yarn tefe`
```

To test:
```sh
tefe --version # or `yarn tefe version`
```

## Usage

Once TEFE CLI is installed in a npm package, that should be it for 90% of developers. The cli will largely take care of itself. It will prompt for developer input only when needed, and try to stay out of the way the rest of the time.

That said, all commands are available via `tefe help`:
<!-- help -->
```sh
Usage: tefe [options] [command]

Options:
  -h, --help        display help for command

Commands:
  version           read version
  info              Get context to help CLI developers
  config [options]  Show current directory ./tefe.config.json
  help [command]    display help for command

```
<!-- /help -->

<details>
  <summary>To develop commands:</summary>

This section explores how to modify the commands if the existing tefe commands do not meet your needs.

NOTE: CLI developer workflows require heavy use of _symlinks_ (via `npm link`).
It might help to familiarise yourself with the general process of
[building CLI tools](https://www.google.com/search?q=npm+cli+development+tutorial)

**Best Practices**:

When adding commands that are useful for all npm package repositories:
   - First, try to integrate these directly into this package for automation.
   - If that's not possible, check if the CLI's consumer repos have this feature. Warn them if they don't.
   - If the above two don't work out, just add the feature where it's needed.

**Key Point**: This CLI should always be easy to use. So, avoid dependencies on other packages or tools not commonly available. For example, don't use Deno (a JavaScript runtime) or rely too much on shell scripting, particularly for formatting or output ordering (which vary wildly).

**Why?**: The CLI might be used before running any npm/yarn install. Some tools, like `jq`, may not install or run correctly in all environments, like some cut-down CI linux distributions.

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
</details>
