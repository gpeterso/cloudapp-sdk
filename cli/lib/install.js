const { execSync } = require("child_process");

const install = () => execSync("npm install --loglevel=error", {stdio: "inherit"});

module.exports = { install }
