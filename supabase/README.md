# Supabase Database Setup

## セットアップ手順

### 1. Supabase Studioでスキーマ作成

1. https://app.supabase.com にログイン
2. プロジェクト `rootomzbucovwdqsscqd` を選択
3. 左メニューから **SQL Editor** を選択
4. `schema.sql` の内容を貼り付けて実行

### 2. Realtime有効化

1. 左メニューから **Database** → **Replication** を選択
2. 以下のテーブルで Realtime を有効化：
   - ✅ `github_issues`
   - ✅ `ai_responses`
   - ✅ `ai_agent_state`

または `realtime_config.sql` を実行

### 3. 動作確認

1. **Data** タブで3つのテーブルが存在することを確認
2. `test_queries.sql` を実行してデータ操作をテスト
3. サンプルデータが正しく表示されることを確認

## テーブル構成

### github_issues
GitHub Issue情報を格納
- `id`: UUID（主キー）
- `issue_number`: Issue番号（ユニーク）
- `title`: Issue タイトル
- `body`: Issue 本文
- `creator`: 作成者
- `status`: pending | processing | completed | failed

### ai_responses
AI生成レスポンスを格納
- `id`: UUID（主キー）
- `github_issue_id`: Issue外部キー
- `response_text`: AI応答テキスト
- `generated_at`: 生成日時

### ai_agent_state
AIエージェント状態を管理
- `agent_id`: エージェント識別子（主キー）
- `current_task`: 現在処理中のIssue
- `progress`: 進捗（0-100%）
- `status`: idle | active | error | paused

## 接続情報

```bash
SUPABASE_URL=https://rootomzbucovwdqsscqd.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## セキュリティ

- RLS (Row Level Security) 有効
- 匿名ユーザー: SELECT + INSERT のみ
- 認証済みユーザー: 全操作可能
