const ora = require("ora");
const util = require("util");
const fs = require("fs-extra");
const ncp = util.promisify(require("ncp").ncp);
const prompts = require("prompts");
const chalk = require("chalk");

const { checkConfig } = require("../lib/config/config");
const { updateManifest } = require("../lib/config/manifest");
const {cwd, appBaseDir, workNg, work} = require("../lib/dirs");

const copyBaseDir = () => {
    return ncp(appBaseDir, cwd)
        .then(() => ncp(`${workNg}/src/app`, `${work}/src/app`))
        .then(() => ncp(`${workNg}/src/assets`, `${work}/src/assets`))
        .then(() => fs.copy(`${workNg}/src/main.scss`, `${work}/src/main.scss`))
        .then(() => fs.copy(`${__dirname}/../lib/config/manifest.schema.json`, `${cwd}/manifest.schema.json`));
}

const confirmEmptyDir = async () => {
    if ((fs.readdirSync(cwd)||[]).length === 0) return Promise.resolve();
    console.log(`\r\nWorking directory is not empty. [${cwd}]`)
    const response = await prompts({
        type: "confirm",
        name: "value",
        message: "Are you sure you want delete everything in this directory?",
        initial: false
    });
    if (response.value) {
        const spinner = ora().start();
        return fs.emptyDir(cwd).then(() => spinner.stop());
    }
    return Promise.reject(new Error("Directory must be empty"));
}

confirmEmptyDir().then(copyBaseDir).then(async () => {
    await checkConfig();
    updateManifest();
    console.log("\r\nThe following files and folders were created:")
    console.log(chalk.green(fs.readdirSync(cwd).join("\r\n")), "\r\n");
    console.log("Done.\r\n")
}).catch(e => {
    console.error(chalk.redBright(`\r\n${e.message}`));
    process.exit(1);
});


