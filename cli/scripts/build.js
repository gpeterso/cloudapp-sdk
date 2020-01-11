const ora = require("ora");
const chalk = require("chalk");

const { buildProd } = require("../lib/action");
const { syncNgDir } = require("../lib/work");

process.env.NODE_ENV = "production";

let spinner;

syncNgDir()
  .then(async () => {
    spinner = ora().start("Building...");
    buildProd(() => spinner.stop());
  })
  .catch(error => {
    spinner && spinner.stop();
    console.trace(chalk.redBright(error));
    process.exit(1);
  });


