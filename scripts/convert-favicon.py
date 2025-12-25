#!/usr/bin/env python3
"""
Convert logo.png to favicon.ico and apple-touch-icon.png
"""
import sys
import os

try:
    from PIL import Image
except ImportError:
    print("Installing Pillow...")
    os.system(f"{sys.executable} -m pip install Pillow")
    from PIL import Image

def convert_to_favicon():
    # Paths
    logo_path = "public/logo.png"
    favicon_path = "public/favicon.ico"
    apple_touch_icon_path = "public/apple-touch-icon.png"
    
    # Open the logo
    img = Image.open(logo_path)
    
    # Convert to RGB if necessary (ICO doesn't support RGBA well)
    if img.mode == 'RGBA':
        # Create a white background
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3])  # Use alpha channel as mask
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Create favicon.ico with multiple sizes
    favicon_sizes = [(16, 16), (32, 32), (48, 48)]
    favicon_images = []
    for size in favicon_sizes:
        resized = img.copy()
        resized.thumbnail(size, Image.Resampling.LANCZOS)
        favicon_images.append(resized)
    
    # Save as ICO
    favicon_images[0].save(
        favicon_path,
        format='ICO',
        sizes=favicon_sizes
    )
    print(f"✓ Created {favicon_path}")
    
    # Create apple-touch-icon (180x180)
    apple_icon = img.copy()
    apple_icon.thumbnail((180, 180), Image.Resampling.LANCZOS)
    apple_icon.save(apple_touch_icon_path, format='PNG')
    print(f"✓ Created {apple_touch_icon_path}")
    
    print("\n✓ Favicon conversion complete!")

if __name__ == "__main__":
    convert_to_favicon()
