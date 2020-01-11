#! /usr/bin/env node

const chalk = require("chalk");
const { printHelp } = require("./scripts/help");
const { getCommands, getSubCommands } = require("./lib/commands");

const [command, subcommand] = process.argv.slice(2);

const commands = getCommands();
const subcommands = getSubCommands(command);

const checkSubcommand = () => {
    if (Object.keys(subcommands).length > 0 && (!subcommand || !subcommands[subcommand])) { 
        if (!subcommand) {
            console.error(`\r\n${chalk.redBright(`Missing subcommand`)}`);
        } else if (!subcommands[subcommand]) {
            console.error(`\r\n${chalk.redBright(`Unknown subcommand: ${subcommand}`)}`);
        }
        printHelp(subcommands);
        process.exit(1);
    }
}

if (command && command !== "help") {
    if (commands[command]) {
        checkSubcommand();
        return require(`./scripts/${process.argv[2]}.js`);
    }
    if (command.length > 0) {
        console.error(`\r\n${chalk.redBright(`Unknown command: ${command}`)}`);
    }
}

printHelp(commands);

