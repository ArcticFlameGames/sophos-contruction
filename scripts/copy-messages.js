const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const exists = promisify(fs.exists);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

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

async function copyFileWithLog(source, target) {
  try {
    // Ensure target directory exists
    const targetDir = path.dirname(target);
    await ensureDirectoryExists(targetDir);
    
    // Read the source file
    const content = await readFile(source, 'utf8');
    
    // Write to target file
    await writeFile(target, content, 'utf8');
    console.log(`✅ Copied: ${source} -> ${target}`);
    return true;
  } catch (error) {
    console.error(`❌ Error copying ${source} to ${target}:`, error.message);
    return false;
  }
}

async function copyDirectory(source, target) {
  try {
    console.log(`📂 Processing directory: ${source}`);
    const entries = await readdir(source, { withFileTypes: true });
    
    // Filter for JSON files only
    const jsonFiles = entries.filter(entry => 
      entry.isFile() && entry.name.endsWith('.json')
    );

    if (jsonFiles.length === 0) {
      console.log(`⚠️  No JSON files found in: ${source}`);
      return false;
    }

    // Copy each JSON file
    let success = true;
    for (const file of jsonFiles) {
      const srcPath = path.join(source, file.name);
      const destPath = path.join(target, file.name);
      const fileCopied = await copyFileWithLog(srcPath, destPath);
      success = success && fileCopied;
    }

    return success;
  } catch (error) {
    console.error(`❌ Error processing directory ${source}:`, error.message);
    return false;
  }
}

async function copyMessages() {
  console.log('🚀 Starting to copy locale files...');
  const startTime = Date.now();
  
  const baseDir = process.cwd();
  console.log(`📁 Working directory: ${baseDir}`);
  
  // Define source and target directories
  const sourceDirs = [
    path.join(baseDir, 'public/messages'),
    path.join(baseDir, 'messages')
  ];

  // Target directory for Next.js static files
  const targetDir = path.join(baseDir, '.next/static/messages');
  
  console.log('🔍 Checking source directories...');
  
  let sourceDirFound = false;
  let filesCopied = 0;
  
  // Process each source directory
  for (const sourceDir of sourceDirs) {
    try {
      const dirExists = await exists(sourceDir);
      console.log(`📂 Source directory ${sourceDir} exists: ${dirExists ? '✅' : '❌'}`);
      
      if (dirExists) {
        sourceDirFound = true;
        console.log(`🔄 Copying files from ${sourceDir} to ${targetDir}`);
        const copySuccess = await copyDirectory(sourceDir, targetDir);
        
        if (copySuccess) {
          const files = (await readdir(sourceDir)).filter(f => f.endsWith('.json'));
          filesCopied += files.length;
          console.log(`✅ Successfully processed ${files.length} files from ${sourceDir}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${sourceDir}:`, error.message);
      continue;
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  if (!sourceDirFound) {
    console.error('❌ No valid source directory found. Checked locations:', sourceDirs);
    process.exit(1);
  }
  
  if (filesCopied === 0) {
    console.error('❌ No locale files were copied. Please check your source directories.');
    process.exit(1);
  }
  
  console.log(`✨ Successfully copied ${filesCopied} locale files in ${duration}s`);
  console.log('✅ Locale files copy process completed successfully');
  
  // Verify the files were copied
  try {
    const targetFiles = await readdir(targetDir);
    console.log(`📋 Copied files in ${targetDir}:`, targetFiles);
  } catch (error) {
    console.error('⚠️  Could not verify copied files:', error.message);
  }
}

// Run the script
copyMessages().catch(error => {
  console.error('Unhandled error in copy-messages:', error);
  process.exit(1);
});
