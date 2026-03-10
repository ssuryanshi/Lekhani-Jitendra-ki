-- ============================================
-- Dr. Jitendra Kumar Literary Website — Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('padya', 'gadya')),
  media_urls TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes table (to prevent duplicate likes per session)
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, session_id)
);

-- Full text search index on posts
CREATE INDEX posts_search_idx ON posts
  USING GIN (to_tsvector('simple', title || ' ' || content));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Increment / Decrement likes (atomic)
CREATE OR REPLACE FUNCTION increment_likes(post_id_param UUID)
RETURNS VOID AS $$
  UPDATE posts SET likes_count = likes_count + 1 WHERE id = post_id_param;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION decrement_likes(post_id_param UUID)
RETURNS VOID AS $$
  UPDATE posts SET likes_count = GREATEST(0, likes_count - 1) WHERE id = post_id_param;
$$ LANGUAGE SQL;

-- RLS Policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- Authenticated users (admin) can do everything with posts
CREATE POLICY "Authenticated can manage posts"
  ON posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Anyone can read comments
CREATE POLICY "Public can read comments"
  ON comments FOR SELECT
  USING (true);

-- Anyone can add comments
CREATE POLICY "Public can insert comments"
  ON comments FOR INSERT
  WITH CHECK (true);

-- Anyone can like
CREATE POLICY "Public can like"
  ON likes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can unlike"
  ON likes FOR DELETE
  USING (true);

-- ============================================
-- Storage bucket for media (run separately in UI or here)
-- ============================================
-- In Supabase dashboard > Storage > New bucket:
-- Name: media
-- Public: true
-- Max file size: 50MB
-- Allowed types: image/*, video/*
