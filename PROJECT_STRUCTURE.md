# AI Automation Platform - プロジェクト構成図

**更新日:** 2026-02-28

## 📂 リポジトリ ディレクトリツリー（ai-automation-docs）

```
ai-automation-docs/                      # 📚 ドキュメント + GitHub Pages
├── README.md                            # プロジェクト概要・アーキテクチャ・リンク集
├── PROJECT_STRUCTURE.md                 # このファイル（フォルダー構成）
├── _config.yml                          # Jekyll設定（テーマ・タイトル）
│
├── _includes/                           # Jekyll カスタムインクルード
│   └── head-custom.html                 # Mermaid.js 読み込み用カスタムHTMLヘッド
│
├── docs/                                # 📄 GitHub Pages ドキュメント
│   ├── index.md                         # ドキュメントトップ（クイックリンク）
│   ├── architecture.md                  # アーキテクチャ概要
│   ├── architecture-diagram.md          # システム全体図・データフロー・noVNC Gateway
│   ├── implementation-plan.md           # Milestone 1/2/3 完全ガイド
│   ├── milestone-1.md                   # Milestone 1: Supabase インフラ構築
│   ├── milestone-2.md                   # Milestone 2: GitHub Actions ワークフロー
│   ├── milestone-3.md                   # Milestone 3: VS Code Copilot Bridge
│   ├── setup.md                         # 環境セットアップガイド
│   ├── contributing.md                  # 貢献ガイド・仲間募集
│   │
│   └── wiki/                            # 📚 ナレッジベース（Wiki）
│       ├── index.md                     # Wiki トップ（一覧）
│       ├── history.md                   # 📜 10年の歴史（2013-2026）
│       ├── repository-guide.md          # 3層リポジトリ構造の使い分け
│       ├── quick-start-guide.md         # 30分で始めるクイックスタート
│       ├── system-architecture.md       # システム設計・技術深堀り
│       ├── tech-stack-architecture.md   # Supabase + GitHub + VS Code 全体図
│       ├── copilot-workflow-example.md  # Copilot協働実践例・Mermaid図作成 ⭐
│       ├── ai-collaboration-guide.md    # AI との協働開発パターン
│       ├── continuity-guide.md          # AI への完全引き継ぎ方法
│       ├── memory-restore-guide.md      # AI 記憶回復システム
│       ├── development-guidelines.md    # 命名規則・コーディング規約
│       ├── platform-status.md           # 現在の進捗状況
│       └── submodule-list.md            # 全リポジトリ・サブモジュール構成図
│
├── images/                              # 🖼️ スクリーンショット
│   ├── supabase-crud.png                # Supabase CRUD Manager（9 Issues 同期済み）
│   └── dhtmlx-navigator.png             # DHTMLX Navigator（BPMN × n8n 統合）
│
└── supabase/                            # 🗄️ Supabase データベース設定
    ├── README.md                        # セットアップ手順・テーブル構成説明
    ├── schema.sql                       # テーブル定義（github_issues / ai_responses / ai_agent_state）
    ├── realtime_config.sql              # Realtime 有効化スクリプト
    └── test_queries.sql                 # 動作確認クエリ集
```

---

## 📄 ファイル説明

### ルートファイル

| ファイル | 説明 |
|--------|------|
| `README.md` | プロジェクト概要・ビジョン・アーキテクチャ・リンク集 |
| `PROJECT_STRUCTURE.md` | フォルダー構成まとめ（このファイル） |
| `_config.yml` | Jekyll サイト設定（テーマ: cayman） |

### docs/ - ドキュメント

| ファイル | 説明 |
|--------|------|
| `index.md` | ドキュメントトップページ |
| `architecture.md` | アーキテクチャ概要 |
| `architecture-diagram.md` | Mermaid による視覚的なシステム全体図 |
| `implementation-plan.md` | Milestone 1/2/3 実装計画 |
| `milestone-1.md` | Supabase インフラ構築（✅ 完了） |
| `milestone-2.md` | GitHub Actions 連携（🟡 進行中） |
| `milestone-3.md` | VS Code Copilot Bridge（⏳ 予定） |
| `setup.md` | 環境セットアップ手順 |
| `contributing.md` | 貢献ガイド |

### docs/wiki/ - ナレッジベース

| ファイル | 説明 |
|--------|------|
| `index.md` | Wiki トップ（全ページ一覧） |
| `history.md` | 2013-2026年の開発史 |
| `repository-guide.md` | 3リポジトリの役割・使い分け |
| `quick-start-guide.md` | 30分で動かすガイド |
| `system-architecture.md` | 設計・データフロー詳細 |
| `tech-stack-architecture.md` | 全体アーキテクチャ図（Mermaid）+ サービス一覧 |
| `copilot-workflow-example.md` | Copilot 協働実践例（スクリーンショット付き） |
| `ai-collaboration-guide.md` | AI と人間の協働開発パターン |
| `continuity-guide.md` | AI への記憶引き継ぎ方法 |
| `memory-restore-guide.md` | AI 記憶回復システム |
| `development-guidelines.md` | 命名規則・コーディング規約 |
| `platform-status.md` | 現在の進捗・TODO |
| `submodule-list.md` | 全リポジトリ・サブモジュール一覧 |

### supabase/ - データベース

| ファイル | 説明 |
|--------|------|
| `README.md` | Supabase セットアップ手順 |
| `schema.sql` | 3テーブル定義（github_issues / ai_responses / ai_agent_state） |
| `realtime_config.sql` | Realtime 有効化設定 |
| `test_queries.sql` | 動作確認クエリ |

---

## 🔗 関連リポジトリ

| リポジトリ | 役割 |
|----------|------|
| [ai-automation-docs](https://github.com/kenichimiyata/ai-automation-docs) | 🌟 **このリポジトリ** - 公開ドキュメント・GitHub Pages |
| [ai-automation-dashboard](https://github.com/kenichimiyata/ai-automation-dashboard) | 🔧 実装ハブ - GitHub Actions・Issue トラッキング |
| [ai-automation-platform](https://github.com/bpmbox/ai-automation-platform) | 🏢 組織リポジトリ - Wiki・Project 管理 |

**詳細は [Repository Guide](docs/wiki/repository-guide.md) を参照。**
