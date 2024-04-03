## Telicent Frontend CLI ("TEFE" CLI)

CLI utility help frontend repos stay aligned, and easy to work with.

We envision CLI tool will contain some manually-only scripts (e.g. check system swap), some life-cycle scripts (e.g. lint commands), AND self-executing checks (_check the lint command is being automatically called on git commit_).

The general philosophy is: Automate alignment

## Install

```sh
# Install globally
npm install -g @telicent-oss/telicent-frontend-cli


# Or, install within a package
cd $packageDir;
npm install @telicent-oss/telicent-frontend-cli 
# IMPORTANT: If you use `yarn` to install locally, manually prefix with "yarn" e.g. `yarn tefe`
```

To test:
```sh
tefe version # or `yarn tefe version`
```

<details>
  <summary>To use (and develop) commands locally:</summary>

**Best Practices for Creating Functionality**:

When adding features (like lint, CI scripts) useful for front-end repositories:
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

## Usage

To list available commands
```sh
tefe help # Or `yarn tefe help`
```
