// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

const fs = require("fs")
const fse = require("fs-extra")
const path = require("path")

const appDistPath = path.join(__dirname, "..", "..", "app", "dist");
const extensionMediaPath = path.join(__dirname, "..", "media")

// delete media folder first
if (fs.existsSync(extensionMediaPath)) {
  console.log('Deleting existing media folder...');
  fse.removeSync(extensionMediaPath);
}

// Paths to the individual files
const filesToCopy = ['bundle.js', 'bundle.css'];

fse.ensureDirSync(extensionMediaPath);

filesToCopy.forEach(file => {
  const src = path.join(appDistPath, file);
  const dest = path.join(extensionMediaPath, file);

  if (!fs.existsSync(src)) {
    console.error(`Error: Required file ${file} not found in app dist folder!`);
    console.error('Run `pnpm --filter @workspace/app run build` first.');
    process.exit(1);
  }

  fse.copySync(src, dest, { overwrite: true });
  console.log(`Copied ${file} to extension media folder.`);
});
