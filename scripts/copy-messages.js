const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  try {
    await mkdir(dest, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }

  // Read the source directory
  const entries = await readdir(src, { withFileTypes: true });

  // Copy each file/directory
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      await copyDir(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      // Only copy JSON files
      await copyFile(srcPath, destPath);
      console.log(`Copied ${path.relative(process.cwd(), srcPath)} to ${path.relative(process.cwd(), destPath)}`);
    }
  }
}

async function main() {
  const messagesDir = path.join(process.cwd(), 'messages');
  const publicDir = path.join(process.cwd(), 'public/messages');

  try {
    // Check if source directory exists
    const stats = await stat(messagesDir);
    if (!stats.isDirectory()) {
      throw new Error(`Source path ${messagesDir} is not a directory`);
    }

    console.log(`Copying messages from ${messagesDir} to ${publicDir}`);
    await copyDir(messagesDir, publicDir);
    console.log('Successfully copied all message files');
  } catch (error) {
    console.error('Error copying messages:', error);
    process.exit(1);
  }
}

main().catch(console.error);
