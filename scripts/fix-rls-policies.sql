-- ============================================
-- FIX: Remove infinite recursion in admin_roles RLS policy
-- ============================================
-- Run this SQL in your Supabase SQL Editor to fix the issue

-- First, drop the problematic policy
DROP POLICY IF EXISTS "Admin view admin roles" ON admin_roles;

-- Create a simpler policy: authenticated users can view admin roles
-- This avoids the infinite recursion of checking admin_roles from within admin_roles
CREATE POLICY "Authenticated users can view admin roles" ON admin_roles
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Alternative: If you want admin_roles to be completely public (read-only)
-- Uncomment the lines below and comment out the policy above
-- DROP POLICY IF EXISTS "Authenticated users can view admin roles" ON admin_roles;
-- CREATE POLICY "Public read admin roles" ON admin_roles
--   FOR SELECT 
--   USING (true);

-- Keep the courses policies as they are (no changes needed)
-- Keep the translations policies as they are (no changes needed)
