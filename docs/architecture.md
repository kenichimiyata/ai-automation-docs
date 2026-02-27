---
layout: default
title: Architecture
---

# System Architecture

## Data Flow

```
[Developer creates GitHub Issue]
           |
           v
[GitHub Actions Trigger]
  - Event: issues.opened/closed/edited
  - Runner: ubuntu-latest
           |
           v
[Supabase REST API - Upsert]
  - Table: github_issues
  - Columns: issue_number, title, body, creator, labels, status
           |
           v
[Supabase Realtime Broadcast]
  - Protocol: WebSocket
  - Channel: github_issues changes
           |
           v
[VS Code Extension Listener]
  - @supabase/supabase-js client
  - Realtime subscription active
           |
           v
[Copilot Chat Display]
  - VS Code Chat API
  - markdown formatted response
```

## Database Schema

### github_issues
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| issue_number | INT | GitHub issue number (unique) |
| title | VARCHAR(255) | Issue title |
| body | TEXT | Issue description |
| creator | VARCHAR(255) | GitHub username |
| labels | TEXT[] | Array of label names |
| status | VARCHAR(50) | opened/closed/edited |
| metadata | JSONB | Additional data |
| created_at | TIMESTAMPTZ | Creation timestamp |

### ai_responses
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| github_issue_id | UUID | FK to github_issues |
| agent_id | VARCHAR(255) | AI agent identifier |
| response_text | TEXT | AI-generated response |
| status | VARCHAR(50) | Response status |
| metadata | JSONB | Additional data |

### ai_agent_state
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| agent_id | VARCHAR(255) | Unique agent identifier |
| current_task | VARCHAR(255) | Active task |
| progress | INT | 0-100 percentage |
| status | VARCHAR(50) | Agent status |
| last_update | TIMESTAMPTZ | Last activity time |
