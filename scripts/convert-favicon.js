const fs = require('fs');
const path = require('path');

async function convertToFavicon() {
  try {
    const sharp = require('sharp');
    
    const logoPath = path.join(__dirname, '../public/logo.png');
    const faviconPath = path.join(__dirname, '../public/favicon.ico');
    const appleTouchIconPath = path.join(__dirname, '../public/apple-touch-icon.png');
    
    // Read the logo
    const logoBuffer = fs.readFileSync(logoPath);
    
    // Create favicon.ico (64x64 for better visibility)
    await sharp(logoBuffer)
      .resize(64, 64, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFormat('png')
      .toFile(faviconPath.replace('.ico', '-64.png'));
    
    // Rename to .ico
    fs.renameSync(faviconPath.replace('.ico', '-64.png'), faviconPath);
    console.log('✓ Created favicon.ico (64x64)');
    
    // Create apple-touch-icon (180x180)
    await sharp(logoBuffer)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFormat('png')
      .toFile(appleTouchIconPath);
    console.log('✓ Created apple-touch-icon.png');
    
    console.log('\n✓ Favicon conversion complete!');
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('Installing sharp package...');
      const { execSync } = require('child_process');
      execSync('npm install sharp', { stdio: 'inherit' });
      console.log('\nPlease run this script again.');
    } else {
      console.error('Error:', error.message);
    }
  }
}

convertToFavicon();
