const { pick, pickBy, omit }  = require("lodash");

const fs = require("fs-extra");

const { cwd, work, workNg } = require("../dirs");
const { getConfig } = require("./config");

const updateManifest = () => {
    const manifest = omit(require(`${cwd}/manifest.json`), ["$schema"]);
    const config = pickBy(pick(getConfig(), ["name", "title", "description"]),
        x => typeof x !== 'undefined' && `${x}`.trim().length > 0);
    const obj = Object.assign({ "$schema": "./manifest.schema.json" },
        manifest, { id: config.name }, omit(config, ["name"]), manifest);
    const updated = JSON.stringify(obj, null, 3);
    fs.writeFileSync(`${cwd}/manifest.json`, updated);
    for (const dir of [work, workNg]) {
        fs.copySync(`${cwd}/manifest.json`, `${dir}/src/assets/manifest.json`);
        fs.copySync(`${cwd}/manifest.schema.json`, `${dir}/src/assets/manifest.schema.json`);
    }
    return updated;
}

module.exports = { updateManifest }
