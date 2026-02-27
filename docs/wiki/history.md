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

**そして、決定的な発見:**

**noVNC + Gateway = AI 用の OS**

**気づき:**
- noVNC: ブラウザで動く VNC クライアント
- Gateway: AI がアクセスできる仮想デスクトップ
- **AI がブラウザを通じて「仮想 OS」を操作できる**

**重要な洞察（2026年2月の振り返り）:**
> **noVNC 自体は10年以上前から知っていた。**  
> でも当時は「使い勝手が...」と思って見送っていた。  
> 
> **しかし、Gateway（silkeway）の登場で すべてが変わった。**  
> Gateway が noVNC を「実用的」にした。  
> AI がアクセスできる「仮想 OS」として機能する条件が整った。

**つまり:**
- **2013年:** noVNC 存在を知る → 使い勝手に懸念 → 見送り
- **2015-2024:** VirtualOffice（人間用）で Video + Screen Sharing
- **2025年:** Gateway 出現 → noVNC が「AI用OS」として現実的に 💡
- **技術は存在していた。足りなかったのは「組み合わせ方」だった。**

**これは bpmchat.com の VirtualOffice の進化形:**
```
VirtualOffice (2013-2020)
  ↓ 
noVNC Gateway (2025)
  ↓
AI が「自分のPC」を持つ
```

**意味:**
- AI は単なる「チャット」ではない
- AI は「仮想マシン」を操作する
- AI が「人間と同じ環境」で作業できる

**実装:**
- noVNC で Linux デスクトップをブラウザ表示
- pyautogui で AI が操作
- VS Code, Terminal, Browser すべて AI がアクセス可能

**しかし:**
> 「まだ Parts（部品）レベル。System 全体にはなっていない。」

---

### 2026 — AI Automation Platform

**すべてが繋がった。**

**GitHub Issue 駆動型 + noVNC AI OS:**
- Issue を書く → GitHub Actions → Supabase → VS Code Copilot
- AI が常に隣にいる
- **AI が noVNC Gateway を通じて「仮想 OS」を持つ**
- システムが "生きている"

**アーキテクチャの統合:**
```
GitHub (Issue, Actions, Pages)
    ↓
Supabase (PostgreSQL + Realtime + RLS) ← 状態管理の中心
    ↓
VS Code Copilot (Python Bridge) ← AI インターフェース
    ↓
noVNC Gateway ← AI 用の仮想デスクトップ
    ↓
n8n (59 workflows) ← ワークフロー実行
```

**noVNC + Gateway が実現したこと:**
- ✅ **AI が「デスクトップ環境」を持つ** - ブラウザ、ターミナル、VS Code すべてアクセス可能
- ✅ **pyautogui で完全自動化** - マウス・キーボード操作を AI が実行
- ✅ **人間と同じ環境** - AI は「リモートワーカー」として働く
- ✅ **スケーラブル** - 複数の AI エージェントが並列動作可能

**これが意味すること:**
> 「AI は単なるチャットボットではない。AI は開発者であり、同僚である。」

**bpmchat.com の夢が完成した:**
- 🎤 音声入力 → VS Code Copilot Chat
- 🏢 VirtualOffice → noVNC Gateway
- 📊 SpreadSheet → Supabase PostgreSQL
- ⚙️ BPMS → GitHub Actions + n8n
- 🤖 RPA → pyautogui + Copilot

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
