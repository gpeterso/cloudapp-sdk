const path = require("path");

const cwd = process.cwd();
const appBaseDir = `${path.dirname(require.resolve("@exlibris/exl-cloudapp-base/package.json"))}/base`;

const work = `${cwd}${path.sep}cloudapp`;
const workNg = `${cwd}${path.sep}.ng`;
const baseNg = `${appBaseDir}${path.sep}.ng`;
const build = `${cwd}${path.sep}build`;

module.exports = { cwd, appBaseDir, work, build, workNg, baseNg }
