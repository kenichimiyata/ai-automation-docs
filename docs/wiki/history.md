# AI Automation Platform - 10年の歴史

**2013年から2026年まで、BPMN と AI 自動化に挑戦し続けた記録**

---

## Timeline

### 2013 — The Beginning

**構想:** [bpmchat.com](https://www.bpmchat.com/)

**夢:**
- チャット × ワークフロー × AI
- 誰もが業務を自動化できる世界
- "作って動かしながら考える"

**初期技術スタック:**
- ProcessMaker (BPMS)
- Google Apps Script (チャット連携)
- Lambda (Python API)

**課題:**
- BPMNの設計が難しい
- ツールの学習コストが高い
- 保守が複雑になる

---

### 2014-2016 — Trial and Error

**試したツール:**
- **ProcessMaker** — ワークフロー設計ツール
  - ✅ 良い点: Drag & Drop で画面作成
  - ❌ 悪い点: カスタマイズ性が低い、バージョンアップで破綻

- **JIRA + Confluence** — プロジェクト管理
  - ✅ 良い点: Issue 管理が強力
  - ❌ 悪い点: ワークフロー自動化が弱い

- **SpreadSheet + AppSheet** — データ管理・画面作成
  - ✅ 良い点: 簡単にアプリが作れる
  - ❌ 悪い点: 複雑なロジックが書けない

**教訓:**
> 「簡単なツールは制限が多く、柔軟なツールは難しい」

---

### 2017-2019 — The RPA Era

**UiPath、Automation Anywhere、WinActor...**

**やったこと:**
- Excel → Web アプリへの自動入力
- メール自動送信
- PDF → データ抽出

**問題:**
- 画面変更で RPA が壊れる
- テストが地獄
- 「保守できない遺産」が量産される

**悟り:**
> 「RPA は silver bullet ではない」

---

### 2020 — ChatGPT 前夜

**Google Colab + FastAPI + Django**

**アプローチ:**
- バックエンド: Lambda (Python)
- フロント: GAS (Google Apps Script)
- データ: SpreadSheet

**bpmchat.com の主要機能:**
- 🎤 **音声入力:** Google Speech API
- 💬 **チャット:** Google Chat + GAS
- 📊 **データ管理:** SpreadSheet + JIRA
- 🖼️ **画像解析:** OCR (LINE + GAS)
- 🏢 **VirtualOffice:** ビデオ会議 + 画面共有

**成果:**
- 59個の n8n ワークフロー
- GAS 中心の開発スタイル確立
- "動くもの" は作れるようになった

**しかし:**
> 「メンテナンスが追いつかない。ツールが多すぎる。」

---

### 2021-2023 — The Integration Hell

**問題:**
- Lambda、GAS、n8n、UiPath、AppSheet...
- それぞれ違う言語、違う管理画面
- ドキュメントが散在
- 「どこに何があるか」が分からない

**試行錯誤:**
- Notion で統合管理 → 挫折
- Mermaid で図を自動生成 → コードから図への同期が難しい
- GitHub で一元管理 → Issue が増えすぎる

**教訓:**
> 「統合は難しい。特に人間が手でやると破綻する。」

---

### 2023-2024 — AI の登場

**ChatGPT、GitHub Copilot、Claude...**

**気づき:**
- AI は「対話的に開発できる」
- コードを書きながら、AI に相談できる
- これが、bpmchat.com の "チャット × 開発" の形か？

**実験:**
- Copilot で GAS コード生成
- ChatGPT でドキュメント作成
- Claude で Issue 整理

**限界:**
- AI は「その場限り」
- 文脈を覚えてくれない
- システム全体の自動化にはならない

---

### 2025 — The Turning Point

**AUTOCREATE プロジェクト**

**コンセプト:**
- AI が AI 自身を作る
- 命名規則を守れば、自動統合される
- `router`, `gradio_interface` で検出

**成果:**
- Supabase をメインDBに採用
- Realtime で状態同期
- Python (`SupabaseCopilotBridge.py`) で VS Code 連携

**しかし:**
> 「まだ Parts（部品）レベル。System 全体にはなっていない。」

---

### 2026 — AI Automation Platform

**すべてが繋がった。**

**GitHub Issue 駆動型:**
- Issue を書く → GitHub Actions → Supabase → VS Code Copilot
- AI が常に隣にいる
- システムが "生きている"

**技術スタック:**
```
GitHub (Issue, Actions, Pages)
    ↓
Supabase (PostgreSQL + Realtime + RLS)
    ↓
VS Code Copilot (Python Bridge)
    ↓
n8n (59 workflows)
```

**Milestone 進捗:**
- ✅ Milestone 1: Supabase Infrastructure (2026-02-27)
- 🟡 Milestone 2: GitHub Actions (進行中)
- ⏳ Milestone 3: Copilot Bridge (計画中)

**今の気持ち:**
> 「やっと、実現できそうだ。10年かかった。」

---

## Key Lessons (10年の教訓)

### 1. **簡単なツールは限界がある**
- Drag & Drop は嬉しいが、カスタマイズできない
- "No-Code" は結局 "Low-Code" になる

### 2. **統合は自動化しなければ破綻する**
- 人間が手で統合すると、メンテナンスが地獄
- 命名規則 + 自動検出が鍵

### 3. **AI は「対話的開発」を可能にする**
- コードを書く = AI と相談する
- Issue = AI への指示書

### 4. **データベースが中心**
- すべての状態を DB に集約（Supabase）
- Realtime で同期
- RLS でセキュリティ

### 5. **GitHub は開発者の OS**
- Issue, Actions, Pages, Projects
- すべてが揃っている
- 外部ツールを減らせる

### 6. **"作って動かしながら考える" の実現方法**
```
Issue 書く
  ↓ (自動)
AI が実装
  ↓ (自動)
Supabase に反映
  ↓ (自動)
Realtime で確認
```
**これが答えだった。**

---

## What's Next?

### Short Term (2026 Q1)
- ✅ Milestone 2 完了
- ✅ Milestone 3 開始
- ✅ Wiki 充実化

### Medium Term (2026 Q2-Q3)
- End-to-End 自動化テスト
- 外部ユーザーによるフィードバック
- n8n ワークフローの GitHub 管理

### Long Term (2026 Q4-)
- bpmchat.com の全機能を統合
- AI 自身がシステムを改善する仕組み
- **"AIがAI自身をOSレベルで作成していく" の完全実現**

---

## Acknowledgments

**10年間、諦めずに続けられたのは:**
- ProcessMaker, n8n, UiPath... すべてのツールから学んだ
- GAS, Lambda, Supabase... 技術の進化に助けられた
- **そして、2026年、Copilot との出会いがすべてを変えた**

**ありがとう。**

---

_"The only way to do great work is to love what you do. If you haven't found it yet, keep looking."_  
— Steve Jobs

**私は10年、探し続けた。そして、見つけた。**
