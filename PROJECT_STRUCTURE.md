# AI Automation Platform - プロジェクト構成図

**更新日:** 2026-02-28

## 🎯 核心プロジェクト

### ai-automation-dashboard
**目的:** GitHub Actions自動化ハブ  
**パス:** `C:\xampp\htdocs\ai-automation-dashboard\`  
**リポジトリ:** kenichimiyata/ai-automation-dashboard

**主要ファイル:**
- `.github/workflows/sync-issues.yml` - Issue → Supabase + Google Chat
- `.github/workflows/bpmn-flow-demo.yml` - BPMN風フローテスト

**GitHub Secrets:**
- `SUPABASE_URL`: https://rootomzbucovwdqsscqd.supabase.co
- `SUPABASE_ANON_KEY`: (登録済み)
- `GH_TOKEN`: ghp_**********************（マスク）
- `GOOGLE_CHAT_WEBHOOK`: (登録済み)

---

### ai-automation-docs
**目的:** ドキュメント管理 + GitHub Pages  
**パス:** `C:\xampp\htdocs\ai-automation-docs\`  
**リポジトリ:** kenichimiyata/ai-automation-docs  
**公開URL:** https://kenichimiyata.github.io/ai-automation-docs/

**主要ファイル:**
- `bpmn/memory_workflow.json` - 記憶フロー（9ノード）
- `bpmn/task_summary_workflow.json` - タスクまとめBPMN
- `gas/Code.gs` - GAS BPMN Designer
- `gas/BpmnDesigner.html` - シンプル版UI
- **NEW:** `PROJECT_STRUCTURE.md` (このファイル)

**GAS公開URL:**
https://script.google.com/macros/s/AKfycbzOFStOJRdYblPXloslKV0rDmzP24aO9uQuudQn_koE_ENnqdFfLX98svbyJOJ2Vx1_/exec

---

### ai-automation-platform
**目的:** bpmbox組織ハブ + wiki  
**パス:** `C:\xampp\htdocs\ai-automation-platform\`  
**リポジトリ:** bpmbox/ai-automation-platform  
**GitHub Pages:** https://bpmbox.github.io/ai-automation-platform/

**主要ファイル:**
- `IMPLEMENTATION_PLAN.md` - 23個のIssue実装計画
- `docs/index.md` - Jekyll landing page
- `docs/wiki/System-Architecture.md` - 技術解説
- `supabase/schema.sql` - テーブル設計（予定）

---

## 🔧 開発環境・ツール

### DHTMLX Navigator
**パス:** `C:\xampp\htdocs\`
- `dhtmlx_navigator.html` - DHX Navigator UI
- `navigator.html` - カスタムナビゲーター

**用途:** ファイルツリー可視化、ワークスペース整理

---

### n8n Workflows
**パス:** `C:\xampp\htdocs\n8n_workflows\`
- `n8n_mermaid_dash.html` - n8nダッシュボード
- `n8n_local_visualizer.html` - ローカル可視化ツール
- `gen_mermaid_local.py` - Mermaid生成スクリプト

**Hugging Face n8n:**
- URL: https://kenken999-n8n-free.hf.space/
- Workflow ID: OSJHT5V0y7LN9NNJ

---

### Supabase
**エンドポイント:** https://rootomzbucovwdqsscqd.supabase.co  
**Anon Key:** eyJhbGc...（GitHub Secretに登録済み）

**テーブル（予定）:**
- `github_issues` - Issue同期テーブル
- `ai_responses` - AI応答ログ
- `ai_agent_state` - エージェント状態

**RLS & Realtime:** 有効化予定（Milestone 1）

---

## 🐍 Python スクリプト群

### Supabase連携
**パス:** `C:\xampp\htdocs\localProject\AUTOCREATER\`
- `SupabaseCopilotBridge.py` - VS Code Copilot Chat自動連携
- `supabase_to_vscode_chat.py` - Realtime Listener

**パス:** `C:\xampp\htdocs\`
- `supabase_crud.html` - SupabaseブラウザCRUD
- `phprunner_json_history_supabase.sql` - 履歴テーブル

### n8n関連
- `n8n_download.py` - n8nワークフローダウンロード
- `n8n_download_remaining.py` - 残りダウンロード
- `n8n_check.py` - API接続確認

### GitHub関連
- `create_n8n_issue.py` - n8nからIssue作成
- `fix_issue27.py` - Issue #27修正スクリプト

### Mermaid可視化
- `gen_mermaid_local.py` - ローカル生成
- `inspect_mermaid_wf.py` - ワークフロー解析
- `extract_mermaid_html.py` - HTML抽出

---

## 🔨 Laravel / PHP プロジェクト

### PhPRunner_11
**パス:** `C:\xampp\htdocs\PhPRunner_11\`  
**リポジトリ:** (未確認)

**GitHub Actions:**
- `notify-issue-to-googlechat.yml` - Issue通知
- `auto-assign-copilot.yml` - Copilot自動アサイン
- `cloud-agent.yml` - `/execute`コマンド実行
- `deploy-n8n-workflows.yml` - n8nデプロイ

### evaProject
**パス:** `C:\xampp\htdocs\evaProject\`  
**フレームワーク:** Laravel

**主要ファイル:**
- `composer.json` - PHP依存関係
- `artisan` - Laravelコマンドライン
- `googleChat.php` - Google Chat連携

---

## 🎨 Strapi CMS

### strapi-cms-hf
**パス:** `C:\xampp\htdocs\strapi-cms-hf\`  
**用途:** Headless CMS（Hugging Face連携？）

---

## 🖥️ noVNC / Cloud Desktop

### Selkies WebTop
**URL:** https://webtop-desktop-27951941726.asia-northeast1.run.app/  
**認証:** abc:changeme123

**用途:**
- Cloud Desktopアクセス
- リモートブラウザ操作
- Playwright実行環境

---

## 📦 重複・整理対象フォルダー

### shop11系（削除候補）
- `shop11/` - 本体
- `shop11 copy/`
- `shop11_backup/`
- `shop11_build/`
- `shop11.worktrees/`
- `shop11bk/`

### phprunner系（削除候補）
- `phprunner-laravel-blade/`
- `phprunner-react-frontend/`
- `phprunner11/`

### その他重複
- `shop5/` `shop5_compare/` `shop6/`
- `ai-automation-platform-repo/` (ドキュメント重複)
- `ai-automation-platform.wiki/` `ai-automation-platform-wiki/` (wiki重複)

**整理方針:** 最新版のみ残し、GitHubバックアップ後に削除

---

## 🔗 関連Wiki・ドキュメント

### localProject/AUTOCREATE.wiki
**パス:** `C:\xampp\htdocs\localProject\AUTOCREATE.wiki\`  
**リポジトリ:** bpmbox/AUTOCREATE の wiki

**重要ファイル:**
- `Home.md` - インデックス
- `Continuity-Guide.md` - AI継続開発ガイド
- `System-Architecture.md` - FastAPI Django アーキテクチャ
- `AI-Developer-Collaboration-Guide.md` - AI協働哲学
- `Memory-Restore-System-Guide.md` - AI記憶回復
- `GitHub-Issue-System-Generator-Guide.md` - Issue自動生成

**サブフォルダー:**
- `ai-memory/` - JSON形式AIメモリ
- `knowledge-base/` - ナレッジベース
- `conversation-logs/` - 会話ログ
- `implementation-examples/` - 実装例

---

## 🚀 今後の追加予定

### Milestone 1: Supabase Infrastructure
- テーブル作成（github_issues, ai_responses, ai_agent_state）
- RLS ポリシー設定
- Realtime有効化

### Milestone 2: GitHub Actions完成
- sync-issues.yml完全版（現在ベータ版動作中）
- エラーハンドリング強化
- 詳細ロギング

### Milestone 3: VS Code Copilot Bridge
- Supabase Realtime Listener
- pyautogui自動入力
- 応答ストレージ

---

## 📊 全体フロー図

```
┌─────────────────┐
│ GitHub Issue    │
│  (Manual)       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│ GitHub Actions              │
│ (sync-issues.yml)           │
│  ├─ 種別判定                │
│  ├─ 分岐処理                │
│  ├─ Supabase同期 ←──────────┼─ Milestone 1
│  └─ Google Chat通知 ✅      │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Supabase Realtime           │
│  github_issues テーブル     │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ ローカル常駐スクリプト       │
│ (SupabaseCopilotBridge.py)  │← Milestone 3
│  ├─ Realtime Listener       │
│  ├─ pyautogui操作           │
│  └─ 応答保存                │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ VS Code Copilot Chat        │
│  (自動入力・応答取得)        │
└─────────────────────────────┘
```

---

## 🔐 認証情報・トークン管理

**GitHub Tokens:**
- kenichimiyata: `ghp_**********************`（マスク - GitHub Secretで管理）
- bpmbox: `ghp_**********************`（マスク - GitHub Secretで管理）

**Supabase:**
- URL: `https://rootomzbucovwdqsscqd.supabase.co`
- Anon Key: `eyJhbGc...` (GitHub Secretに保存)

**Google Chat Webhook:**
- `https://chat.googleapis.com/v1/spaces/AAAAi6uA0xw/messages?key=...` (GitHub Secretに保存)

**⚠️ セキュリティ:** トークンは `.env` と GitHub Secrets で管理、コードに直接書かない

---

## 📅 最終更新履歴

| 日付 | 内容 |
|------|------|
| 2026-02-28 | PROJECT_STRUCTURE.md作成 |
| 2026-02-28 | sync-issues.yml Google Chat統合 |
| 2026-02-28 | bpmn-flow-demo.yml作成・実行成功 |
| 2026-02-27 | GitHub Secrets登録（3つ） |
| 2026-02-27 | GAS BPMN Designer公開 |
| 2026-02-27 | Issue #32作成・Project #6追加 |
