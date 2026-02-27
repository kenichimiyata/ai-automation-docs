---
layout: default
title: Tech Stack & Architecture
---

# Tech Stack & Architecture 全体図

**最終更新:** 2026-02-27

---

## 全体アーキテクチャ図

```mermaid
graph TB
    subgraph INPUT["入力レイヤー"]
        LINE["LINE Messaging API"]
        SLACK["Slack"]
        WEB["Web フォーム"]
        MOBILE["スマホ / ブラウザ"]
    end

    subgraph AUTOMATION["自動化ハブ"]
        N8N["n8n / Zapier<br/>ノーコード Automation"]
        GAS["Google Apps Script<br/>(clasp)"]
        GHISSUE["GitHub Issue"]
        GHACTIONS["GitHub Actions"]
    end

    subgraph DATA["データレイヤー"]
        SUPABASE["Supabase<br/>Postgres + Realtime + Auth"]
        CLOUDSQL["Cloud SQL<br/>(本番 MySQL/Postgres)"]
        REDIS["Redis<br/>セッション / キャッシュ"]
        HASURA["Hasura<br/>GraphQL API"]
        STRAPI["Strapi<br/>ヘッドレス CMS"]
    end

    subgraph AI["AI レイヤー"]
        COPILOT["VS Code Copilot<br/>(コピ AI Manager)"]
        FASTAPI["FastAPI<br/>AI API サーバー"]
        DJANGO["Django<br/>管理画面 + ORM"]
        GRADIO["Gradio<br/>AI デモ UI<br/>(HuggingFace Spaces)"]
    end

    subgraph FRONTEND["フロントエンド"]
        DHTMLX["DHTMLX<br/>業務グリッド / ガント"]
        PHPRUNNER["PHPRunner<br/>CRUD UI + REST API"]
        LARAVEL["Laravel<br/>MVC フレームワーク"]
        REACT["React / Next.js<br/>SPA フロントエンド"]
    end

    subgraph INFRA["インフラ"]
        CLOUDRUN["Cloud Run<br/>コンテナホスティング"]
        GHPAGES["GitHub Pages<br/>静的ドキュメント"]
        XAMPP["XAMPP<br/>ローカル開発"]
    end

    %% 入力 → 自動化
    LINE -->|Webhook| N8N
    SLACK -->|Webhook| N8N
    WEB -->|POST| N8N
    MOBILE -->|API| GAS
    N8N -->|Issue 作成| GHISSUE
    GAS -->|Issue 作成| GHISSUE

    %% 自動化 → データ
    GHISSUE -->|trigger| GHACTIONS
    GHACTIONS -->|upsert| SUPABASE

    %% データ連携
    SUPABASE -->|Realtime| COPILOT
    SUPABASE <-->|sync| CLOUDSQL
    SUPABASE --> HASURA
    HASURA -->|GraphQL| DHTMLX
    HASURA -->|GraphQL| REACT
    STRAPI -->|REST/GraphQL| LARAVEL
    STRAPI -->|コンテンツ| PHPRUNNER
    CLOUDSQL --> REDIS

    %% AI レイヤー
    COPILOT -->|実装指示| GHISSUE
    FASTAPI <--> SUPABASE
    FASTAPI <--> DJANGO
    DJANGO --> CLOUDSQL
    GRADIO --> FASTAPI

    %% フロントエンド → データ
    PHPRUNNER --> CLOUDSQL
    PHPRUNNER --> SUPABASE
    LARAVEL --> CLOUDSQL
    DHTMLX --> PHPRUNNER
    DHTMLX --> HASURA

    %% インフラ
    FASTAPI --> CLOUDRUN
    DJANGO --> CLOUDRUN
    LARAVEL --> CLOUDRUN
    GHPAGES -.->|docs| GHISSUE
    XAMPP -.->|local dev| PHPRUNNER
```

---

## サービス一覧

### フロントエンド / UI

| サービス | 用途 | 連携先 |
|--|--|--|
| **DHTMLX** | 業務グリッド・ガントチャート・スケジューラ | PHPRunner, Hasura GraphQL |
| **PHPRunner** | CRUD UI + REST API 自動生成 | MySQL, Supabase, Cloud SQL |
| **Laravel** | MVC フレームワーク・Web バックエンド | Cloud SQL, Strapi |
| **React / Next.js** | SPA フロントエンド | Hasura GraphQL, Supabase |

---

### データ / API レイヤー

| サービス | 用途 | 特徴 |
|--|--|--|
| **Supabase** | Postgres + Realtime + Auth + Storage | AI 連携のハブ。Realtime で VS Code に通知 |
| **Cloud SQL** | 本番 MySQL / Postgres | Cloud Run バックエンドの永続化 |
| **Hasura** | Postgres → GraphQL 自動生成 | Supabase/Cloud SQL に被せて GraphQL API 化 |
| **Strapi** | ヘッドレス CMS | コンテンツ管理（記事・お知らせ・商品説明）|
| **Redis** | セッション・キャッシュ | Cloud Run のステートレス補完 |

---

### AI レイヤー

| サービス | 用途 | 特徴 |
|--|--|--|
| **VS Code Copilot (コピ)** | AI マネージャー・コード生成 | GitHub Issue → 自動実装 → PR |
| **FastAPI** | AI API サーバー | Python, 高速, OpenAPI 自動生成 |
| **Django** | 管理画面 + ORM | FastAPI と組み合わせて管理 UI |
| **Gradio** | AI デモ UI | HuggingFace Spaces で公開 |

---

### 自動化 / 入力

| サービス | 用途 | 特徴 |
|--|--|--|
| **LINE Messaging API** | スマホから GitHub Issue を作成 | Webhook → n8n → Issue |
| **Google Apps Script (clasp)** | Google Workspace 連携・スプレッドシート自動化 | VS Code で開発・デプロイ |
| **n8n / Zapier** | ノーコード Automation | LINE, Slack, Supabase, GAS を繋ぐ |
| **GitHub Actions** | CI/CD・Issue トリガー自動化 | Issue → Supabase 同期 |
| **Slack** | チーム通知・Copilot への指示 | Webhook → n8n → Issue |

---

### インフラ

| サービス | 用途 | 特徴 |
|--|--|--|
| **Cloud Run** | コンテナホスティング (FastAPI, Django, Laravel) | サーバーレス、オートスケール |
| **GitHub Pages** | 静的ドキュメントサイト | ai-automation-docs 公開 |
| **XAMPP** | ローカル開発環境 | PHP + MySQL + Apache |

---

## データフロー詳細図

```mermaid
sequenceDiagram
    participant LINE as LINE / Slack
    participant N8N as n8n
    participant GH as GitHub Issue
    participant GA as GitHub Actions
    participant SB as Supabase
    participant CP as コピ (Copilot)
    participant PR as Pull Request

    LINE->>N8N: メッセージ送信
    N8N->>GH: Issue 作成
    GH->>GA: issues.opened トリガー
    GA->>SB: github_issues テーブルに upsert
    SB->>CP: Realtime 通知
    CP->>CP: コード実装
    CP->>PR: PR 作成
    PR->>GH: PR レビュー依頼
```

---

## 技術選定の理由

```mermaid
mindmap
  root((AI Automation<br/>Platform))
    入力
      LINE::スマホから指示
      Slack::チーム連携
      GAS::Google連携
    ハブ
      GitHub Issue::タスク管理
      Supabase Realtime::AI通知
      n8n::ノーコード接続
    AI
      Copilot::コード生成
      FastAPI::API高速化
      Gradio::デモ公開
    表示
      PHPRunner::業務CRUD
      DHTMLX::高機能グリッド
      Laravel::Web基盤
    インフラ
      CloudRun::本番コンテナ
      CloudSQL::本番DB
      Redis::キャッシュ
```

---

## 優先実装ロードマップ

| 優先度 | サービス | 理由 |
|--|--|--|
| 🔴 即時 | LINE → GitHub Issue | スマホから AI に指示できる |
| 🔴 即時 | clasp 公開サンプル | GAS Bridge の動作実証 |
| 🟡 次回 | Hasura on Supabase | DHTMLX GraphQL 接続 |
| 🟡 次回 | n8n セルフホスト | Cloud Run に n8n を立てる |
| 🟢 中期 | Strapi + PHPRunner | コンテンツ管理分離 |
| 🟢 中期 | Redis on Cloud Run | セッション管理 |
| 🔵 長期 | Gradio デモ展開 | AI 機能の外部公開 |

---

## 関連ページ

- [システムアーキテクチャ](System-Architecture)
- [Submodule 一覧](Submodule-List)
- [クイックスタート](Quick-Start-Guide)
- [プラットフォーム状態](AI-Automation-Platform-Status)
