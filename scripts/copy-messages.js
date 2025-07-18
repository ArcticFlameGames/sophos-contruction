const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const exists = promisify(fs.exists);

async function ensureDirectoryExists(dir) {
  if (!await exists(dir)) {
    await mkdir(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

async function copyMessages() {
  try {
    const baseDir = process.cwd();
    const sourceDirs = [
      path.join(baseDir, 'public/messages'),
      path.join(baseDir, 'messages')
    ];

    // Ensure the target directory exists
    const targetDir = path.join(baseDir, '.next/static/messages');
    await ensureDirectoryExists(targetDir);

    let filesCopied = false;

    // Try each source directory
    for (const sourceDir of sourceDirs) {
      try {
        if (await exists(sourceDir)) {
          const files = await readdir(sourceDir);
          const jsonFiles = files.filter(file => file.endsWith('.json'));
          
          if (jsonFiles.length > 0) {
            console.log(`Found ${jsonFiles.length} locale files in ${sourceDir}`);
            
            // Copy each JSON file
            await Promise.all(
              jsonFiles.map(async (file) => {
                const sourcePath = path.join(sourceDir, file);
                const targetPath = path.join(targetDir, file);
                await copyFile(sourcePath, targetPath);
                console.log(`Copied ${file} to ${targetPath}`);
                filesCopied = true;
              })
            );
            
            // If we found files in this directory, no need to check others
            if (filesCopied) break;
          }
        }
      } catch (error) {
        console.warn(`Warning processing directory ${sourceDir}:`, error.message);
        continue;
      }
    }

    if (!filesCopied) {
      throw new Error('No locale files found in any source directory');
    }

    console.log('Successfully copied locale files to .next/static/messages');
  } catch (error) {
    console.error('Error in copy-messages script:', error);
    process.exit(1);
  }
}

// Run the script
copyMessages().catch(error => {
  console.error('Unhandled error in copy-messages:', error);
  process.exit(1);
});
