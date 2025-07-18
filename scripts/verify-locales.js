const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const exists = promisify(fs.exists);

// In a Netlify build, the files will be in the public directory
// because we can't rely on the .next directory persisting
async function checkLocaleFiles() {
  console.log(' Verifying locale files...');
  const baseDir = process.cwd();
  
  // Check public/messages directory
  const publicMessagesDir = path.join(baseDir, 'public/messages');
  const publicDirExists = await exists(publicMessagesDir);
  
  console.log(` Public messages directory exists: ${publicDirExists ? ' ' : ' '}`);
  
  if (publicDirExists) {
    try {
      const files = await readdir(publicMessagesDir);
      console.log(`Files in public/messages: ${files.join(', ')}`);
    } catch (error) {
      console.error('Error reading public/messages directory:', error.message);
    }
  }
  
  // Check for required locale files
  const requiredLocales = ['en', 'fr'];
  let allFilesExist = true;
  
  for (const locale of requiredLocales) {
    const filePath = path.join(publicMessagesDir, `${locale}.json`);
    const fileExists = await exists(filePath);
    
    console.log(`\n Checking ${locale}.json:`);
    console.log(`   ${filePath} - ${fileExists ? ' Found' : ' Missing'}`);
    
    if (!fileExists) {
      allFilesExist = false;
    }
  }
  
  if (allFilesExist) {
    console.log('\n All required locale files are present in the public directory');
  } else {
    console.error('\n Some required locale files are missing from the public directory');
    process.exit(1);
  }
}

// Run the verification
checkLocaleFiles().catch(error => {
  console.error(' Error during locale verification:', error.message);
  process.exit(1);
});
