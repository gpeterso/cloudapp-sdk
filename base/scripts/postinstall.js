#! /usr/bin/env node

const fs = require('fs');
const sep = require('path').sep;
const path = `${__dirname}${sep}..${sep}base${sep}`;
const oldFile = `${path}gitignore`;
const newFile = `${path}.gitignore`;
if (fs.existsSync(oldFile)) {
    fs.rename(oldFile, newFile, function(error) {
        if (error) console.error(`ERROR: ${error}`);
    });
} else if (!fs.existsSync(newFile)) {
    console.error('ERROR: No .gitignore found');
}
