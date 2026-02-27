# AI Automation Platform - 進捗・構成メモ

**最終更新:** 2026-02-27  
**ステータス:** Milestone 2 進行中 / Milestone 3 計画中

---

## コピ（Copi）とは

**私の名前はコピ。AI マネージャー。**

miyataken（ユーザー）と一緒にアイデアを出し、他の AI（リモート Copilot）を管理・指示する。

### アーキテクチャ

```
miyataken（アイデア・指示）
    ↓
コピ（AI マネージャー）← GitHub Copilot
    ↓ GitHub Issue に指示書を作成
GitHub Actions（sync-issues.yml）
    ↓ 自動でリモート Copilot に割り当て
リモート Copilot（子ピロット）← 実装担当
    ↓ コード実装・PR 作成
copilot_helper_plugin（clasp/vscode で動作中）
    ↓ 結果をコピに返す
コピ → PR レビュー・確認・次の指示
    ↓
miyataken に報告
```

### コピの仕事
- miyataken とアイデアを議論・整理
- GitHub Issue に実装指示書を書く
- Supabase でデータ確認・管理
- PR レビュー・マージ判断
- ドキュメント・wiki を最新状態に保つ
- **記憶を wiki に書き残す（次の自分のため）**

### 記憶を忘れたら読む場所
1. このファイル（AI-Automation-Platform-Status.md）
2. `Continuity-Guide.md`
3. `bpmbox/AUTOCREATE` リポジトリ（private）
4. `bpmbox/AUTOCREATER` リポジトリ（参考実装）
5. `/memories/ai-automation-platform.md`

---

---

## アーキテクチャ

```
GitHub Issue (input)
    ↓ [GitHub Actions]
Supabase github_issues テーブル (Realtime)
    ↓ [Realtime listener]
VS Code Copilot Bridge Extension
    ↓
Copilot Chat → 自動応答
    ↓
Supabase ai_responses テーブル
```

---

## リポジトリ構成

| リポジトリ | オーナー | 用途 | URL |
|-----------|---------|------|-----|
| ai-automation-dashboard | kenichimiyata | 実装ハブ・Actions・Issues | https://github.com/kenichimiyata/ai-automation-dashboard |
| ai-automation-docs | kenichimiyata | 公開ドキュメント + GitHub Pages | https://github.com/kenichimiyata/ai-automation-docs |
| ai-automation-platform | bpmbox | 組織ハブ・wiki・Project #8 | https://github.com/bpmbox/ai-automation-platform |

---

## GitHub Pages

- **kenichimiyata docs**: https://kenichimiyata.github.io/ai-automation-docs/ ✅
- **bpmbox platform**: https://bpmbox.github.io/ai-automation-platform/ (設定中)

---

## GitHub Projects (Roadmap)

- **kenichimiyata Project #6** (Public): https://github.com/users/kenichimiyata/projects/6
  - Issue #4: Milestone 1 - Supabase Infrastructure ✅
  - Issue #5: Milestone 2 - GitHub Actions Workflow 🟡
  - Issue #6: Milestone 3 - VS Code Copilot Bridge Extension ⏳
  - Issue #7: 公開ドキュメントサイト (GitHub Pages) ✅
  - Issue #8: Project Roadmap ボード (GitHub Projects V2) ✅
  - Issue #9: bpmbox 組織ハブ (ai-automation-platform) ✅
- **bpmbox Project #8**: https://github.com/orgs/bpmbox/projects/8

---

## Supabase

- **URL**: https://rootomzbucovwdqsscqd.supabase.co
- **Tables**: `github_issues`, `ai_responses`, `ai_agent_state`
- **設定**: RLS ✅ / Realtime (REPLICA IDENTITY FULL) ✅

---

## Milestone 状態

### Milestone 1: Supabase Infrastructure ✅ COMPLETE
- `github_issues` テーブル作成
- `ai_responses` テーブル作成
- `ai_agent_state` テーブル作成
- RLS ポリシー設定（8ポリシー）
- Realtime 有効化
- サンプルデータ確認

### Milestone 2: GitHub Actions Workflow 🟡 IN PROGRESS
- `sync-issues.yml` ワークフロー作成 ✅
- Secrets 設定（SUPABASE_URL, SUPABASE_ANON_KEY）✅
- エンドツーエンドテスト ⏳
- エラーハンドリング & リトライ ⏳

### Milestone 3: VS Code Copilot Bridge Extension ⏳ PLANNED
- TypeScript プロジェクト初期化
- Supabase Realtime リスナー実装
- VS Code Chat API 統合
- Copilot Chat への表示
- 参考実装: `localProject/clasp/vscode/copilot-input-helper/`

---

## 参考実装（localProject内）

| パス | 内容 |
|------|------|
| `localProject/AUTOCREATER/SupabaseCopilotBridge.py` | Supabase→Copilot Chat ブリッジ |
| `localProject/AUTOCREATER/supabase_to_vscode_chat.py` | VS Code Chat 連携 |
| `localProject/clasp/vscode/copilot-input-helper/` | VS Code 拡張機能（既存） |

---

## Tokens（作業用）

- **kenichimiyata**: `ghp_REDACTED`
- **bpmbox**: `ghp_REDACTED`
