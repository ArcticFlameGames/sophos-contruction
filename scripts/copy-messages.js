const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');
const publicDir = path.join(process.cwd(), 'public/messages');

// Create public/messages directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy all JSON files from messages/ to public/messages/
if (fs.existsSync(messagesDir)) {
  fs.readdirSync(messagesDir).forEach(file => {
    if (file.endsWith('.json')) {
      const srcPath = path.join(messagesDir, file);
      const destPath = path.join(publicDir, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} to ${destPath}`);
    }
  });
}

console.log('Finished copying message files');
