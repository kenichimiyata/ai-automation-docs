# リポジトリ構成ガイド

**最終更新:** 2026-02-28

---

## 🎯 3層リポジトリ構造

AI Automation Platformは、役割ごとに **3つのリポジトリ** で構成されています。

```
kenichimiyata（個人アカウント）
├── ai-automation-docs       ← 📖 メインリポジトリ（外部公開用）
└── ai-automation-dashboard  ← 🔧 実装ハブ（Issue管理・Actions）

bpmbox（組織アカウント）
└── ai-automation-platform   ← 🏢 組織リポジトリ（Wiki・アーキテクチャ）
```

---

## 📖 1. ai-automation-docs（メインリポジトリ）⭐

**URL:** https://github.com/kenichimiyata/ai-automation-docs  
**GitHub Pages:** https://kenichimiyata.github.io/ai-automation-docs/

### 役割
- **外部公開用の美しいドキュメントサイト**
- 一般ユーザー、新しいAI、外部協力者向け
- Jekyll (minima theme) で自動ビルド

### ディレクトリ構造
```
ai-automation-docs/
├── _config.yml          # Jekyll設定
├── index.md            # トップページ
├── docs/
│   ├── getting-started.md
│   ├── architecture.md
│   └── api-reference.md
└── _layouts/           # カスタムレイアウト（オプション）
```

### 更新タイミング
- ✅ 新機能のリリース時
- ✅ Wikiでナレッジが固まったとき
- ✅ 一般公開できる情報ができたとき

### 注意事項
- ⚠️ **機密情報（APIキー・トークン）は絶対に記載しない**
- ⚠️ 内部実装の詳細は載せず、使い方にフォーカス
- ✅ コード例は動作確認済みのものだけ

---

## 🔧 2. ai-automation-dashboard（実装ハブ）

**URL:** https://github.com/kenichimiyata/ai-automation-dashboard

### 役割
- **GitHub Issues でタスク管理**
- **GitHub Actions で自動化ワークフロー実行**
- **開発者専用の実装記録**

### 主要ファイル
```
ai-automation-dashboard/
├── .github/
│   └── workflows/
│       └── sync-issues.yml    # Issue → Supabase 自動同期
├── README.md
└── docs/                      # 内部ドキュメント
```

### Issues 運用ルール
| ラベル | 用途 |
|--------|------|
| `milestone-1` | Milestone 1: Supabase Infrastructure |
| `milestone-2` | Milestone 2: GitHub Actions |
| `milestone-3` | Milestone 3: VS Code Copilot Bridge |
| `bug` | バグ報告 |
| `documentation` | ドキュメント更新 |

### GitHub Actions
- **sync-issues.yml:** Issue作成/更新時に自動でSupabaseと同期
- トリガー: `issues` イベント (`opened`, `edited`)

---

## 🏢 3. ai-automation-platform（組織リポジトリ）

**URL:** https://github.com/bpmbox/ai-automation-platform  
**Wiki:** https://github.com/bpmbox/ai-automation-platform/wiki

### 役割
- **Wikiで内部ナレッジを管理**（このページはここ）
- **スキーマ定義・設計書を保管**
- 組織レベルでの情報共有

### ディレクトリ構造
```
ai-automation-platform/
├── README.md
├── IMPLEMENTATION_PLAN.md   # 実装計画書
├── _config.yml             # Jekyll設定（GitHub Pages用）
├── docs/                   # GitHub Pages用ドキュメント
│   ├── index.md
│   └── wiki/
└── supabase/
    └── schema.sql          # Supabaseスキーマ定義
```

### Wiki構成（このリポジトリのWiki）
| ページ | 内容 |
|--------|------|
| [[Home]] | Wikiトップ・全体概要 |
| [[Repository-Guide]] | このページ（リポジトリ構成） |
| [[Setup-Guide]] | セットアップ手順 |
| [[Workflow-Design]] | ワークフロー設計思想 |
| [[Troubleshooting]] | トラブルシューティング |

---

## 📊 GitHub Projects（タスク管理）

**URL:** https://github.com/users/kenichimiyata/projects/6

### 役割
- Issueの進捗を可視化（Todo / In Progress / Done）
- Milestone 1/2/3 でグループ化
- 優先度フィールドで並び替え

### ⚠️ 重要な制限
- ✅ **Projectは個人アカウント（kenichimiyata）のみ使用**
- ❌ 組織アカウント（bpmbox）ではProjectに制限がある
- すべてのタスク管理は `kenichimiyata/projects/6` で行う

---

## 🔄 情報の流れ（ナレッジライフサイクル）

```
1. タスク発生
   └→ Issue作成（ai-automation-dashboard）
        ↓
2. 実装・調査
   └→ Issue comment に記録
   └→ Project で進捗管理
        ↓
3. 完了・ナレッジ化
   └→ Wiki にまとめる（ai-automation-platform）
        ↓
4. 外部公開（必要に応じて）
   └→ Pages に転記（ai-automation-docs）
```

---

## 🗄️ データストレージ（Supabase）

**URL:** https://rootomzbucovwdqsscqd.supabase.co

### テーブル構成
| テーブル | 用途 |
|---------|------|
| `github_issues` | GitHub Issuesの同期データ |
| `ai_responses` | AI応答ログ |
| `ai_agent_state` | エージェント状態管理 |

### 同期フロー
```
GitHub Issue 作成/更新
    ↓ (GitHub Actions: sync-issues.yml)
Supabase INSERT/UPDATE
    ↓ (Realtime)
VS Code Copilot 通知（予定）
```

---

## 🔗 クイックリンク集

### GitHub
- 📖 [ai-automation-docs（メイン）](https://github.com/kenichimiyata/ai-automation-docs)
- 🔧 [ai-automation-dashboard（Issue管理）](https://github.com/kenichimiyata/ai-automation-dashboard)
- 🏢 [ai-automation-platform（組織）](https://github.com/bpmbox/ai-automation-platform)
- 📊 [Project #6（ロードマップ）](https://github.com/users/kenichimiyata/projects/6)

### 公開サイト
- 🌐 [GitHub Pages（メイン）](https://kenichimiyata.github.io/ai-automation-docs/)
- 📚 [Wiki（このサイト）](https://github.com/bpmbox/ai-automation-platform/wiki)

### Supabase
- 🗄️ [Supabase Dashboard](https://supabase.com/dashboard/project/rootomzbucovwdqsscqd)
- 📊 [CRUD Manager（ローカル）](http://localhost/supabase_crud.html)

### n8n統合
- 🔄 [n8n Workflows](https://kenken999-n8n-free.hf.space)
- 🖥️ [DHTMLX Navigator（ローカル）](http://localhost/dhtmlx_navigator.html)

---

## 💡 使い分けガイド

| やりたいこと | 使うリポジトリ/ツール |
|-------------|---------------------|
| 外部に見せるドキュメント | `ai-automation-docs` ⭐ |
| Issueを作成 | `ai-automation-dashboard` |
| タスク進捗を確認 | `kenichimiyata/projects/6` |
| 内部手順を記録 | `ai-automation-platform/wiki` |
| データベースを確認 | Supabase Dashboard または CRUD Manager |
| n8nワークフローを見る | DHTMLX Navigator |

---

## 📝 更新履歴

| 日付 | 変更内容 |
|------|---------|
| 2026-02-28 | Repository-Guide.md 初版作成 |

---

**次のページ:** [[Setup-Guide|セットアップ手順]]
