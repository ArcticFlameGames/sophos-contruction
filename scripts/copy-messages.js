const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const exists = promisify(fs.exists);
const stat = promisify(fs.stat);

async function ensureDirectoryExists(dir) {
  try {
    await mkdir(dir, { recursive: true });
    console.log(`Ensured directory exists: ${dir}`);
    return true;
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
    return false;
  }
}

async function copyDirectory(source, target) {
  try {
    // Create target directory if it doesn't exist
    await ensureDirectoryExists(target);
    
    // Read the source directory
    const entries = await readdir(source, { withFileTypes: true });
    
    // Process each entry
    for (const entry of entries) {
      const srcPath = path.join(source, entry.name);
      const destPath = path.join(target, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively copy subdirectories
        await copyDirectory(srcPath, destPath);
      } else if (entry.name.endsWith('.json')) {
        // Copy JSON files
        await copyFile(srcPath, destPath);
        console.log(`Copied: ${srcPath} -> ${destPath}`);
      }
    }
    return true;
  } catch (error) {
    console.error(`Error copying from ${source} to ${target}:`, error);
    return false;
  }
}

async function copyMessages() {
  console.log('Starting to copy locale files...');
  
  const baseDir = process.cwd();
  const sourceDirs = [
    path.join(baseDir, 'public/messages'),
    path.join(baseDir, 'messages')
  ];

  // Ensure the target directories exist
  const targetDirs = [
    path.join(baseDir, '.next/static/messages'),
    path.join(baseDir, 'public/_next/static/messages')
  ];

  let success = true;
  
  // Process each source directory
  for (const sourceDir of sourceDirs) {
    try {
      const dirExists = await exists(sourceDir);
      console.log(`Source directory ${sourceDir} exists: ${dirExists}`);
      
      if (dirExists) {
        const files = await readdir(sourceDir);
        console.log(`Found ${files.length} files in ${sourceDir}`);
        
        // Copy to each target directory
        for (const targetDir of targetDirs) {
          console.log(`Copying from ${sourceDir} to ${targetDir}`);
          const copySuccess = await copyDirectory(sourceDir, targetDir);
          success = success && copySuccess;
        }
      }
    } catch (error) {
      console.error(`Error processing ${sourceDir}:`, error);
      success = false;
    }
  }

  if (!success) {
    console.error('Some files may not have been copied successfully');
    process.exit(1);
  }

  console.log('Locale files copy process completed');
}

// Run the script
copyMessages().catch(error => {
  console.error('Unhandled error in copy-messages:', error);
  process.exit(1);
});
