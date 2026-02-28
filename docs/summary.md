---
layout: default
title: コンテンツサマリー
---

# AI Automation Platform — コンテンツサマリー

> **GitHub Issue 駆動型の AI 協働開発基盤。10年越しの挑戦を、2026年に実現。**

---

## 📌 プロジェクト概要

**AI Automation Platform** は、GitHub Issue を起点に AI が自律的に動作するシステムです。

```
人間（Issue 作成）
     ↓
GitHub Actions（自動パイプライン）
     ↓
Supabase（Realtime 状態管理）
     ↓
VS Code Copilot（AI 実装）
     ↓
noVNC Gateway（AI 専用デスクトップ）
     ↓
完成したシステム
```

**コアコンセプト:**
- Issue を書くだけで AI が実装する
- Supabase Realtime で状態をリアルタイム管理
- noVNC Gateway により AI が「目・口・耳」を持つ
- AI が AI に指示して連携するエコシステム

---

## 🏗️ アーキテクチャ

| コンポーネント | 技術 | 役割 |
|--------------|------|------|
| **データ層** | Supabase (PostgreSQL + Realtime) | Issue 同期・状態管理・RLS |
| **パイプライン** | GitHub Actions | Issue 作成 → Supabase 自動書き込み |
| **連携** | VS Code Copilot Bridge (Python) | Supabase Realtime → Copilot Chat |
| **AI OS** | noVNC Gateway | AI 専用仮想デスクトップ・pyautogui 操作 |
| **ワークフロー** | n8n (59 workflows) | 外部サービス連携 |
| **可視化** | HTML5 (dhtmlx, Mermaid) | BPMN × データ可視化 |

---

## 📊 マイルストーン状況

| マイルストーン | 状態 | 内容 |
|-------------|------|------|
| **Milestone 1** | ✅ 完了 | Supabase Infrastructure（3テーブル・17 RLS・Realtime） |
| **Milestone 2** | 🟡 進行中 | GitHub Actions Workflow（sync-issues.yml・9 Issues 同期済み） |
| **Milestone 3** | ⏳ 計画中 | VS Code Copilot Bridge（Realtime Listener・pyautogui 連携） |

---

## 📁 リポジトリ構成

| リポジトリ | 用途 |
|-----------|------|
| [ai-automation-docs](https://github.com/kenichimiyata/ai-automation-docs) | 公開ドキュメント・GitHub Pages・Supabase スキーマ |
| [ai-automation-dashboard](https://github.com/kenichimiyata/ai-automation-dashboard) | 実装ハブ・GitHub Actions・Issue トラッキング |
| [ai-automation-platform](https://github.com/bpmbox/ai-automation-platform) | 組織リポジトリ・Wiki・Project 管理 |

---

## 📚 ドキュメント一覧

### 始め方
- [実装計画](implementation-plan.md) — Milestone 1/2/3 完全ガイド
- [クイックスタート](wiki/quick-start-guide.md) — 30秒で状況把握
- [リポジトリガイド](wiki/repository-guide.md) — 3層構造の使い分け

### アーキテクチャ・設計
- [システムアーキテクチャ](wiki/system-architecture.md) — 技術詳細
- [テックスタック](wiki/tech-stack-architecture.md) — Supabase + GitHub + VS Code
- [アーキテクチャ図](architecture-diagram.md) — システム全体・データフロー・noVNC Gateway

### AI 協働
- [Copilot ワークフロー例](wiki/copilot-workflow-example.md) — 実際のやり取り・スクリーンショット自動化
- [AI 協働ガイド](wiki/ai-collaboration-guide.md) — AI との協働開発パターン
- [継続性ガイド](wiki/continuity-guide.md) — AI への完全引き継ぎ方法
- [記憶回復ガイド](wiki/memory-restore-guide.md) — AI 記憶回復システム

### 開発
- [開発ガイドライン](wiki/development-guidelines.md) — 命名規則・コーディング規約
- [プラットフォーム状況](wiki/platform-status.md) — 現在の進捗
- [履歴](wiki/history.md) — 2013〜2025 の実験記録

---

## 🔗 主要リンク

| リソース | URL |
|---------|-----|
| GitHub Pages | https://kenichimiyata.github.io/ai-automation-docs/ |
| Supabase プロジェクト | https://supabase.com/dashboard/project/rootomzbucovwdqsscqd |
| n8n ワークフロー | https://kenken999-n8n-free.hf.space |
| GitHub Project (ロードマップ) | https://github.com/users/kenichimiyata/projects/6 |

---

## 🕐 タイムライン

| 年 | 出来事 |
|----|--------|
| **2013** | [bpmchat.com](https://www.bpmchat.com/) でチャット×ワークフロー×AI の構想 |
| **2013–2025** | ProcessMaker / n8n / dify / UiPath / GAS / AppSheet など多数のツールで試行 |
| **2025** | noVNC + Gateway = AI 専用 OS という発見 |
| **2026** | VS Code Copilot と出会い、AI Automation Platform として実現 |

---

*詳細は [README](../README.md) または各ドキュメントを参照してください。*
