-- ============================================
-- Test Queries for Supabase Tables
-- ============================================

-- 1. Verify table creation
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('github_issues', 'ai_responses', 'ai_agent_state');

-- 2. Check sample data
SELECT * FROM github_issues ORDER BY created_at DESC;

-- 3. Insert test issue
INSERT INTO github_issues (issue_number, title, body, creator, status)
VALUES (999, 'Test Issue from SQL', 'This is a test', 'test-user', 'pending')
RETURNING *;

-- 4. Query with JOIN
SELECT 
    gi.issue_number,
    gi.title,
    gi.status,
    COUNT(ar.id) as response_count
FROM github_issues gi
LEFT JOIN ai_responses ar ON gi.id = ar.github_issue_id
GROUP BY gi.id, gi.issue_number, gi.title, gi.status
ORDER BY gi.created_at DESC;

-- 5. Check agent state
SELECT * FROM ai_agent_state;

-- 6. Cleanup test data
DELETE FROM github_issues WHERE issue_number = 999;
