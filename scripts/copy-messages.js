const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);

async function copyMessages() {
  try {
    const sourceDir = path.join(process.cwd(), 'public/messages');
    const targetDir = path.join(process.cwd(), 'public/_next/static/messages');
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }

    // Get all JSON files from source directory
    const files = await readdir(sourceDir);
    
    // Copy each JSON file
    const copyPromises = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        console.log(`Copying ${file} to ${targetDir}`);
        return copyFile(
          path.join(sourceDir, file),
          path.join(targetDir, file)
        );
      });

    await Promise.all(copyPromises);
    console.log('Successfully copied locale files to public/_next/static/messages');
  } catch (error) {
    console.error('Error copying locale files:', error);
    process.exit(1);
  }
}

copyMessages();
