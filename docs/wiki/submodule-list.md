---
layout: default
title: Submodule 一覧
---

# Submodule 一覧

**最終更新:** 2026-02-27

プロジェクト全体で使用している Git Submodule の一覧です。

---

## localProject (メインリポジトリ)

`localProject/.gitmodules` の構成。

### urlounge-ds 系（本番サーバー）

| サブモジュールパス | リポジトリ | 用途 |
|--|--|--|
| `var/www/html/shop5` | urlounge-ds/shop5 | ショップ旧バージョン（v5） |
| `var/www/html/include` | urlounge-ds/include | 共通 PHP インクルード群 |
| `var/www/html/kagoya` | urlounge-ds/kagoya | カゴヤサーバー固有設定 |
| `var/www/html/evaProject` | urlounge-ds/evaProject | EVA 基幹プロジェクト |
| `var/www/html/refastaProject` | urlounge-ds/refastaProject | リファスタ CMS/バックエンド |
| `var/www/html/refasta_public` | urlounge-ds/refasta_public | リファスタ 公開サイト |
| `var/www/html/refasta_shop_front` | urlounge-ds/refasta_shop_front | リファスタ EC フロントエンド |
| `var/www/html/refasta_wordpres` | urlounge-ds/refasta_wordpres | リファスタ WordPress |
| `var/www/html/refasta_main` | urlounge-ds/refasta-main | リファスタ メインシステム |
| `var/www/html/refasta_master` | urlounge-ds/refasta_master | リファスタ マスタデータ |
| `var/www/html/lounge_API` | urlounge-ds/lounge_API | ラウンジ REST API |
| `var/www/html/lounge_zendesk` | urlounge-ds/lounge_zendesk | Zendesk 連携 |
| `var/www/html/config` | urlounge-ds/config | サーバー設定ファイル群 |
| `usr/local/src` | urlounge-ds/batch | バッチ処理スクリプト |

### kenichimiyata 系（AI 自動化）

| サブモジュールパス | リポジトリ | 用途 |
|--|--|--|
| `clasp` | kenichimiyata/clasp | Google Apps Script + VS Code Copilot Bridge |
| `shops` | kenichimiyata/shops | ショップ管理統合リポジトリ |

### bpmbox 系（AUTOCREATE Platform）

| サブモジュールパス | リポジトリ | 用途 |
|--|--|--|
| `AUTOCREATE` | bpmbox/AUTOCREATE | AI 自動化プラットフォーム本体 |
| `AUTOCREATER` | bpmbox/AUTOCREATER | AUTOCREATE 拡張・テスト環境 |

---

## AUTOCREATE 内部サブモジュール

`bpmbox/AUTOCREATE/.gitmodules` の構成。

| サブモジュールパス | リポジトリ | 用途 |
|--|--|--|
| `wiki` | bpmbox/AUTOCREATE.wiki | ナレッジベース wiki |
| `packages/php-bulk-batch-processing-project` | miyataken999/php-bulk-batch-processing | PHP バルク処理ライブラリ |
| `fastapi_django_main_live` | HuggingFace: kenken999/fastapi_django_main_live | FastAPI + Django デモ（HuggingFace Spaces） |
| `python-hello-world-create-project` | miyataken999/python-hello-world-create-project | Python プロジェクト自動生成テンプレート |
| `laravel-database-schema` | miyataken999/laravel-database-schema | Laravel DB スキーマ定義 |

---

## その他のリポジトリ内サブモジュール

### TODOList-Laravel

| サブモジュールパス | リポジトリ | 用途 |
|--|--|--|
| `phprunner-knowledge` | kenichimiyata/PHPRunner-Knowledge | PHPRunner ナレッジベース |

### shop11 copy

| サブモジュールパス | リポジトリ | 用途 |
|--|--|--|
| `vendor/include` | urlounge-ds/include | 共通インクルード（shop11 用） |
| `vendor/PhPRunner_11` | urlounge-ds/PhPRunner_11 | PHPRunner v11 本体 |

---

## 全体構造図

```
localProject/
├── AUTOCREATE/              ← bpmbox/AUTOCREATE
│   ├── wiki/                ← bpmbox/AUTOCREATE.wiki
│   ├── fastapi_django_main_live/  ← HuggingFace Spaces
│   ├── laravel-database-schema/
│   └── packages/
│       └── php-bulk-batch-processing-project/
├── AUTOCREATER/             ← bpmbox/AUTOCREATER (同構成)
├── clasp/                   ← kenichimiyata/clasp (VS Code Bridge)
├── shops/                   ← kenichimiyata/shops
└── var/www/html/
    ├── evaProject/          ← urlounge-ds/evaProject
    ├── include/             ← urlounge-ds/include
    ├── kagoya/              ← urlounge-ds/kagoya
    ├── lounge_API/          ← urlounge-ds/lounge_API
    ├── refasta*/            ← urlounge-ds/refasta-*
    └── shop5/               ← urlounge-ds/shop5
```

---

## 関連リンク

- [AUTOCREATE Platform 概要](AI-Automation-Platform-Status)
- [システムアーキテクチャ](System-Architecture)
- [クイックスタート](Quick-Start-Guide)
- [clasp / VS Code Bridge 設定](Continuity-Guide)
