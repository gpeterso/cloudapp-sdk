const chalk = require("chalk");

const { generate } = require("../lib/action");
const { syncNgDir } = require("../lib/work");

const args = process.argv.slice(3);
if (args.length < 2 || args[1].startsWith("-")) {
  console.error(`${chalk.redBright(`Missing name for ${args[0]}`)}`);
  process.exit(1);
}

syncNgDir()
  .then(() => generate(args))
  .catch(error => {
    console.trace(chalk.redBright(error));
    process.exit(1);
  });
