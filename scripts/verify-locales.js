const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function checkDirectory(dirPath) {
  try {
    const stats = await stat(dirPath);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

async function listFiles(dir) {
  try {
    const files = await readdir(dir);
    return files;
  } catch (error) {
    return [];
  }
}

async function verifyLocales() {
  console.log('Verifying locale files...');
  
  const baseDir = process.cwd();
  const locales = ['fr', 'en']; // Add other locales as needed
  
  // Check public/messages
  const publicMessagesDir = path.join(baseDir, 'public/messages');
  const hasPublicMessages = await checkDirectory(publicMessagesDir);
  console.log(`Public messages directory exists: ${hasPublicMessages}`);
  
  if (hasPublicMessages) {
    const files = await listFiles(publicMessagesDir);
    console.log(`Files in public/messages: ${files.join(', ') || 'None'}`);
  }
  
  // Check .next/static/messages
  const staticMessagesDir = path.join(baseDir, '.next/static/messages');
  const hasStaticMessages = await checkDirectory(staticMessagesDir);
  console.log(`Static messages directory exists: ${hasStaticMessages}`);
  
  if (hasStaticMessages) {
    const files = await listFiles(staticMessagesDir);
    console.log(`Files in .next/static/messages: ${files.join(', ') || 'None'}`);
  }
  
  // Check each locale file
  for (const locale of locales) {
    const fileName = `${locale}.json`;
    const paths = [
      path.join(publicMessagesDir, fileName),
      path.join(staticMessagesDir, fileName),
      path.join(baseDir, 'messages', fileName)
    ];
    
    console.log(`\nChecking locale: ${locale}`);
    for (const filePath of paths) {
      try {
        await stat(filePath);
        console.log(`✅ Found: ${filePath}`);
      } catch (error) {
        console.log(`❌ Missing: ${filePath}`);
      }
    }
  }
}

verifyLocales().catch(error => {
  console.error('Error verifying locales:', error);
  process.exit(1);
});
