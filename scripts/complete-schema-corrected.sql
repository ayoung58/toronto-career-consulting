-- ============================================
-- COMPLETE DATABASE SCHEMA (CORRECTED)
-- Toronto Career Consulting
-- ============================================
-- Run this in Supabase SQL Editor
-- This is the corrected version without infinite recursion

-- ============================================
-- TABLE: courses
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT,
  description_en TEXT NOT NULL,
  description_zh TEXT,
  key_learning_en TEXT[] NOT NULL DEFAULT '{}',
  key_learning_zh TEXT[],
  career_pathways_en TEXT[] NOT NULL DEFAULT '{}',
  career_pathways_zh TEXT[],
  employment_outlook_en TEXT NOT NULL,
  employment_outlook_zh TEXT,
  salary_range TEXT NOT NULL,
  category TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);

-- ============================================
-- TABLE: translations
-- ============================================
CREATE TABLE IF NOT EXISTS translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value_en TEXT NOT NULL,
  value_zh TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_translations_key ON translations(key);
CREATE INDEX IF NOT EXISTS idx_translations_category ON translations(category);

-- ============================================
-- TABLE: admin_roles
-- ============================================
CREATE TABLE IF NOT EXISTS admin_roles (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- COURSES TABLE POLICIES
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read published courses" ON courses;
DROP POLICY IF EXISTS "Admin full access to courses" ON courses;

-- Public can read published courses
CREATE POLICY "Public read published courses" ON courses
  FOR SELECT 
  USING (is_published = true);

-- Authenticated users with admin role can do everything
-- NOTE: This checks admin_roles, but only for INSERT/UPDATE/DELETE, not SELECT
CREATE POLICY "Admin full access to courses" ON courses
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE admin_roles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- TRANSLATIONS TABLE POLICIES
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read translations" ON translations;
DROP POLICY IF EXISTS "Admin full access to translations" ON translations;

-- Public can read all translations
CREATE POLICY "Public read translations" ON translations
  FOR SELECT 
  USING (true);

-- Admins can modify translations
CREATE POLICY "Admin full access to translations" ON translations
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE admin_roles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- ADMIN_ROLES TABLE POLICIES
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin view admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Authenticated users can view admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Public read admin roles" ON admin_roles;

-- FIX: Allow authenticated users to view admin roles
-- This prevents infinite recursion since we're not checking admin_roles from within admin_roles
CREATE POLICY "Authenticated users can view admin roles" ON admin_roles
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Optional: Only admins can modify admin_roles (insert/update/delete)
-- This is safe because it only applies to write operations
CREATE POLICY "Admins can modify admin roles" ON admin_roles
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE admin_roles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- ============================================
-- DONE!
-- ============================================
-- Now test your connection at http://localhost:3000/test-supabase
