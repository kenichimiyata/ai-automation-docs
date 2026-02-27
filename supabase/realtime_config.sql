-- ============================================
-- Realtime Configuration
-- Enable Realtime for all tables
-- ============================================

-- Note: Realtime must also be enabled in Supabase Studio UI
-- This file documents the configuration for reference

-- Tables requiring Realtime:
-- 1. github_issues - for new issue notifications
-- 2. ai_responses - for AI response notifications
-- 3. ai_agent_state - for agent status monitoring

-- To enable in Supabase Studio:
-- 1. Go to Database → Replication
-- 2. Enable Realtime for each table:
--    - github_issues
--    - ai_responses
--    - ai_agent_state

-- Alternatively, use SQL (requires proper permissions):
ALTER PUBLICATION supabase_realtime ADD TABLE github_issues;
ALTER PUBLICATION supabase_realtime ADD TABLE ai_responses;
ALTER PUBLICATION supabase_realtime ADD TABLE ai_agent_state;
