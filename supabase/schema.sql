-- ============================================
-- AI Automation Platform - Supabase Schema
-- Created: 2026-02-28
-- Milestone 1: Data Layer
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Table 1: github_issues
-- ============================================
CREATE TABLE IF NOT EXISTS github_issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    issue_number INTEGER UNIQUE NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    creator TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_github_issues_status ON github_issues(status);
CREATE INDEX IF NOT EXISTS idx_github_issues_created_at ON github_issues(created_at DESC);

-- ============================================
-- Table 2: ai_responses
-- ============================================
CREATE TABLE IF NOT EXISTS ai_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    github_issue_id UUID NOT NULL REFERENCES github_issues(id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for foreign key
CREATE INDEX IF NOT EXISTS idx_ai_responses_issue_id ON ai_responses(github_issue_id);

-- ============================================
-- Table 3: ai_agent_state
-- ============================================
CREATE TABLE IF NOT EXISTS ai_agent_state (
    agent_id TEXT PRIMARY KEY,
    current_task UUID REFERENCES github_issues(id) ON DELETE SET NULL,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    last_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'idle' CHECK (status IN ('idle', 'active', 'error', 'paused')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- ============================================
-- RLS (Row Level Security) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE github_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agent_state ENABLE ROW LEVEL SECURITY;

-- Policies for github_issues
CREATE POLICY "anon_select_github_issues" ON github_issues
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "anon_insert_github_issues" ON github_issues
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "authenticated_all_github_issues" ON github_issues
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policies for ai_responses
CREATE POLICY "anon_select_ai_responses" ON ai_responses
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "anon_insert_ai_responses" ON ai_responses
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "authenticated_all_ai_responses" ON ai_responses
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policies for ai_agent_state
CREATE POLICY "anon_select_ai_agent_state" ON ai_agent_state
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "anon_update_ai_agent_state" ON ai_agent_state
    FOR UPDATE TO anon
    USING (true)
    WITH CHECK (true);

CREATE POLICY "authenticated_all_ai_agent_state" ON ai_agent_state
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- Test Sample Data
-- ============================================
INSERT INTO github_issues (issue_number, title, body, creator, status)
VALUES 
    (1, 'Setup Supabase Tables', 'Create the initial database schema for the AI automation platform', 'system', 'completed'),
    (2, 'Test GitHub Actions Workflow', 'Verify that the GitHub Actions can send data to Supabase', 'system', 'pending')
ON CONFLICT (issue_number) DO NOTHING;
