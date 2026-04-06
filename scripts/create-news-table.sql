-- ============================================
-- TABLE: news
-- ============================================
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_zh TEXT NOT NULL,
  image_url TEXT,
  links JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR NEWS
-- ============================================

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read published news" ON news;
DROP POLICY IF EXISTS "Admin full access to news" ON news;

-- Public can read published news
CREATE POLICY "Public read published news" ON news
  FOR SELECT 
  USING (is_published = true);

-- Authenticated users with admin role can do everything
CREATE POLICY "Admin full access to news" ON news
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
