-- Add additional_images column to news table
-- This column will store an array of image URLs for the gallery

-- Add the column
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS additional_images TEXT[];

-- Update existing records to have empty array instead of null (optional)
UPDATE news 
SET additional_images = ARRAY[]::TEXT[] 
WHERE additional_images IS NULL;

-- Verify the change
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'news' AND column_name = 'additional_images';
