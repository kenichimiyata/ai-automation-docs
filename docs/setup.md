---
layout: default
title: Setup Guide
---

# Setup Guide

## Prerequisites

- GitHub account with Actions enabled
- Supabase account (free tier OK)
- VS Code with GitHub Copilot

## Step 1: Fork the repository

```bash
git clone https://github.com/kenichimiyata/ai-automation-dashboard
cd ai-automation-dashboard
```

## Step 2: Configure Supabase

1. Create a Supabase project
2. Run the SQL schema from `database/schema.sql`
3. Note your Project URL and anon key

## Step 3: Set GitHub Secrets

In your repo Settings > Secrets > Actions:

- `SUPABASE_URL` = `https://your-project.supabase.co`
- `SUPABASE_ANON_KEY` = your anon key

## Step 4: Enable GitHub Actions

The workflow triggers automatically on Issue events.

[Back to Home](.)
