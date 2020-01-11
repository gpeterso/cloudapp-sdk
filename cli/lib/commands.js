const commands = {
    init: "Initialize current directory",
    start: "Install dependencies, configure and start development server",
    generate: "Generate code in an initialized project",
    "extract-labels": "Extract labels into json files for translation",
    build: "Build production-ready assets for app",
    help: "Display this list of available commands"
}

const subcommands = {
    generate: {
        class: "Creates a new generic class definition",
        directive: "Creates a new generic directive definition",
        component: "Creates a new generic component definition",
        pipe: "Creates a new generic pipe definition",
        service: "Creates a new generic service definition"
    }
}

function getCommands() {
    return commands;
}

function getSubCommands(command) {
    return subcommands[command] || {};
}

module.exports = { getCommands, getSubCommands };
