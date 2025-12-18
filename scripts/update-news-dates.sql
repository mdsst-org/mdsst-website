-- Update news dates to reflect actual event dates
-- Run this in Supabase SQL Editor

-- Update Nasha Mukti Jagrukta Abhiyaan to 12th July 2025
UPDATE news 
SET published_at = '2025-07-12T00:00:00Z',
    updated_at = NOW()
WHERE title = 'Nasha Mukti Jagrukta Abhiyaan';

-- Update Health Camp in Baliapur to 16th Nov 2025
UPDATE news 
SET published_at = '2025-11-16T00:00:00Z',
    updated_at = NOW()
WHERE title = 'Health Camp in Baliapur';

-- Update Women Empowerment Workshop to 28th Sept 2025
UPDATE news 
SET published_at = '2025-09-28T00:00:00Z',
    updated_at = NOW()
WHERE title = 'Women Empowerment Workshop';

-- Verify the updates
SELECT title, published_at, created_at 
FROM news 
ORDER BY published_at DESC;
