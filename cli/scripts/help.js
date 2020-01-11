const chalk = require("chalk");

function printHelp(commands) {
    console.log(`\r\n${chalk.underline("Available Commands")}\r\n`);
    let length = 0;
    Object.keys(commands).forEach(cmd => length = Math.max(length, cmd.length));
    for (let command in commands) {
        const spaces = Array((length + 5) - command.length).fill(" ").join("");
        console.log(" ", chalk.bold(command), spaces, commands[command]);
    }
    console.log();
}

module.exports = { printHelp }