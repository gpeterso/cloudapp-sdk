const path = require("path");
const chokidar = require("chokidar");
const {cwd, work} = require("./dirs");
const {copyWorkFile, copyWorkDir, deleteWorkFile, deleteWorkDir} = require("./work");

const ignored = [ 
    /(^|[\/\\])\..+/, 
    "**/node_modules", 
    "package-lock.json",
    "package.json",
    "scripts/**"
];

const startWatcher = () => {
    const watcher = chokidar.watch("file, dir, glob, or array", { ignored, persistent: true, cwd, ignoreInitial: true });
    watcher.on("add", copyWorkFile).on("change", copyWorkFile).on("unlink", deleteWorkFile);
    watcher.on("addDir", copyWorkDir).on("unlinkDir", deleteWorkDir);
    watcher.add(path.basename(work));
}

module.exports = { startWatcher };
