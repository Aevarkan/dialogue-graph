// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

const fs = require("fs")
const fse = require("fs-extra")
const path = require("path")

const workspaceRootPath = path.join(__dirname, "..", "..", "..");
const extensionPath = path.join(__dirname, "..")

// Paths to the individual files
const filesToCopy = ['CHANGELOG.md'];

fse.ensureDirSync(extensionPath);

filesToCopy.forEach(file => {
  const src = path.join(workspaceRootPath, file);
  const dest = path.join(extensionPath, file);

  if (!fs.existsSync(src)) {
    console.error(`Error: Required file ${file} not found in workspace root directory!`);
    process.exit(1);
  }

  fse.copySync(src, dest, { overwrite: true });
  console.log(`Copied ${file} to extension folder.`);
});
