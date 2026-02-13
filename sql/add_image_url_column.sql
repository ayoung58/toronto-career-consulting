-- Day 8, Step 2: Add image_url column to courses table
-- Run this in Supabase SQL Editor

-- Add image_url column to courses table
ALTER TABLE courses
ADD COLUMN image_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN courses.image_url IS 'URL path to course image in Supabase Storage';

-- Verification query (should return null for all courses currently)
SELECT id, title_en, image_url FROM courses LIMIT 5;
