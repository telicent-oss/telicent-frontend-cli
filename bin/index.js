#!/usr/bin/env node

// Caporal provides you with a program instance
import caporal from "@caporal/core";
import config from "../src/config.js";
import info from "../src/info/info.js";
import "../src/autoupdate.js";
import readPackageJson from "../src/utils/readPackageJson.js";

// Simplest program ever: this program does only one thing
caporal.program
  .version(readPackageJson().version)
    .option("-v, --version", "Get version")
  .command("info", "Get info")
    .action(info)
  .command("config", "Utils for ./tefe.config.json")
    .option("--init", "Create file")
    .action(config);


caporal.program.run().catch((err, programInstance, logger) => {
  // Log the full error to the console, including stack trace
  // TODO This "dirty" output could be nominated (by developers)
  console.error(err);
  process.exit(1); // Exit with non-zero for commands
});
