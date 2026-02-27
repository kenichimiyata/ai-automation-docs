# AI協働開発の実践例：Visual Documentation 作成

**作成日:** 2026-02-28  
**参加者:** miyataken（開発者） × Copi（GitHub Copilot Agent）  
**成果物:** [AI Automation Platform Documentation](https://kenichimiyata.github.io/ai-automation-docs/)

---

## 📋 概要

このドキュメントは、開発者とAIエージェントが協力して **公開ドキュメント + スクリーンショット + アーキテクチャ図** を作成した実際のプロセスを記録しています。

**目的:** 他の開発者が「AIエージェントにこう頼めば、こういうことができる」という参考になること。

---

## 🎯 今回のミッション

**Before（出発点）:**
- バラバラの情報（Supabase実装済み、n8n 59ワークフロー、10年の試行錯誤）
- 技術的な説明ばかりで"なぜ作ったか"が伝わらない
- スクリーンショットなし（文字だけ）

**After（完成）:**
- ✅ GitHub Project #6 作成（9 Issues 管理）
- ✅ ストーリー重視のREADME（10年の旅）
- ✅ 4つの Mermaid アーキテクチャ図
- ✅ 実システムのスクリーンショット（自動撮影）
- ✅ すべて GitHub Pages で公開

---

## 🚀 作業の流れ（実際のやり取り）

### 1️⃣ GitHub Project 作成

**miyataken の指示:**
```
projectつくってみて
```

**Copi の対応:**
- GitHub GraphQL API を使用（gh CLI は read:project scope 不足のため使えない）
- PowerShell で `Invoke-RestMethod` 使用
- Project #6 "AI Automation Platform - Roadmap" 作成成功
- 9 Issues（#1-#9）を Project に追加

**学んだこと:**
- GitHub Projects V2 は GraphQL 必須
- gh CLI だけでは限界がある（スコープ制限）
- Token: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (実際のトークンは環境変数で管理)

**実際のコマンド例:**
```powershell
$query = @"
mutation {
  createProjectV2(input: {
    ownerId: "MDQ6VXNlcjMxODQzMDU="
    title: "AI Automation Platform - Roadmap"
    repositoryId: "R_kgDOMmCzng"
  }) {
    projectV2 { id number title url }
  }
}
"@

$response = Invoke-RestMethod -Uri "https://api.github.com/graphql" `
  -Method Post -Headers @{
    Authorization = "Bearer $env:GITHUB_TOKEN"
    "Content-Type" = "application/json"
  } -Body (@{ query = $query } | ConvertTo-Json)
```

---

### 2️⃣ ストーリー重視への方針転換

**miyataken の指示:**
```
ストーリー重視でいこう
```

**Copi の対応:**
- README.md を完全書き直し
- "The Story" セクション追加:
  - 2013年の夢（bpmchat.com）
  - 2013-2025年の苦闘
  - 2026年の突破
- 技術説明の前に"なぜ"を語る構成に変更

**学んだこと:**
- 技術ドキュメントも「物語」として読める
- 10年の失敗は「信頼性の証明」になる
- bpmchat.com が原点だった（重要な発見！）

**Before vs After:**

❌ **Before:**
```markdown
# AI Automation Platform

This system automates GitHub Issue processing using...
```

✅ **After:**
```markdown
# AI Automation Platform

## The Story

### 2013年 - The Dream
"ビジネスプロセスを自動化したい"
bpmchat.com - VirtualOffice, ProcessMaker, Workflow Designer...

### 2013-2025年 - The Struggle
- 2014-2016: JIRA × AppSheet 失敗
- 2017-2019: UiPath RPA 失敗
...
```

---

### 3️⃣ noVNC Gateway 発見

**miyataken の指示:**
```
これが　novnc gateway で　AI用のOSだね
```

**Copi の気づき:**
- VirtualOffice（人間用ビデオ会議） → noVNC Gateway（AI用仮想デスクトップ）
- これが **哲学的ブレイクスルー** だった！
- pyautogui でAIがブラウザ操作できる = "AI用OS"

**ドキュメント更新:**
- README に "The Legacy" セクション追加
- noVNC Gateway をアーキテクチャの中心に配置
- Evolution Timeline に追加

---

### 4️⃣ Visual Documentation（今回のハイライト）

**miyataken の指示:**
```
そのキャプチャーとあとmermaidものせていこうか
```

**Copi の対応:**

#### A. Mermaid アーキテクチャ図作成

`docs/architecture-diagram.md` に4つの図を作成：

1. **System Architecture（システム全体）:**
```mermaid
graph TB
    Human[👤 Developer] --> GitHub[GitHub Issues]
    GitHub --> Actions[GitHub Actions]
    Actions --> Supabase[(Supabase DB)]
    Supabase --> Bridge[Python Bridge]
    Bridge --> Copilot[VS Code Copilot]
    Copilot --> noVNC[noVNC Gateway]
    noVNC --> Desktop[Linux Desktop]
    Desktop --> n8n[n8n Workflows]
```

2. **Data Flow（データフロー - シーケンス図）**
3. **noVNC Gateway Architecture（Gateway 詳細）**
4. **Evolution Timeline（2013-2026 進化）**

#### B. スクリーンショット自動撮影

**miyataken の指示:**
```
いまだと　previewあなたがそうさして
画面キャプチャーして　pushできるはず
```

**重要な発見:** AI が直接ブラウザを操作してスクリーンショット撮影できる！

**実際の手順:**

1. **ブラウザページが既に開いている状態を確認:**
```
Browser Pages:
- [61e8dfec-5648-4c4e-bc86-9aca8853a020] Supabase REST CRUD Manager
- [5d186888-56e4-4a3a-810d-b6fd8a136ab2] App Shell (DHTMLX Navigator)
```

2. **Playwright でスクリーンショット撮影:**
```javascript
// Supabase CRUD
await page.screenshot({ 
  path: 'C:\\xampp\\htdocs\\ai-automation-docs\\docs\\images\\supabase-crud.png',
  fullPage: true 
});

// DHTMLX Navigator
await page.screenshot({ 
  path: 'C:\\xampp\\htdocs\\ai-automation-docs\\docs\\images\\dhtmlx-navigator.png',
  fullPage: true 
});
```

3. **Git Commit & Push:**
```powershell
cd C:\xampp\htdocs\ai-automation-docs
git add docs/images/*.png
git commit -m "📸 Add Screenshots: Supabase CRUD + DHTMLX Navigator"
git push
```

---

## 💡 学んだこと（Tips）

### ✅ AIエージェントへの効果的な指示

1. **シンプルな日本語でOK:**
   - ❌ "GitHub GraphQL API を使用して Projects V2 を作成してください"
   - ✅ "projectつくってみて"

2. **方針を明確に:**
   - "ストーリー重視でいこう" → AIが全体の書き直しを提案

3. **"あなたが操作できる"を思い出させる:**
   - "previewあなたがそうさして画面キャプチャーして" → AI が Playwright を使用

### ✅ AIができること（意外だったこと）

1. **GitHub GraphQL API 直接実行**
   - gh CLI が使えなくても PowerShell で API 呼び出し可能

2. **ブラウザ操作（Playwright）**
   - スクリーンショット自動撮影
   - fullPage オプションも使える
   - 複数ページを並行処理

3. **Git 操作**
   - commit message の絵文字も適切に使用
   - 複数ファイルをまとめて add/commit/push

4. **Mermaid 図の作成**
   - 複雑なフローチャートも適切に構造化
   - Timeline 形式も使える

### ✅ 効率的なワークフロー

1. **並行処理:**
```javascript
// 2つのスクリーンショットを同時実行
await Promise.all([
  page1.screenshot({ path: '...' }),
  page2.screenshot({ path: '...' })
]);
```

2. **チェックポイント:**
   - `git status` で確認してから commit
   - `list_dir` でファイル存在確認

3. **コミットメッセージの工夫:**
   - 絵文字で視認性向上（📸 📊 ✅）
   - 詳細な変更内容を箇条書き

---

## 📊 成果物

### コミット履歴

| Commit | 絵文字 | 内容 | ファイル数 |
|--------|--------|------|-----------|
| 7e903f0 | - | Story-focused README（10年の旅） | 1 |
| c4c6bbd | - | History integration | 3 |
| a995f40 | - | noVNC Gateway integration | 2 |
| c7a718f | 📊 | Mermaid Architecture Diagrams | 3 |
| 2b14aa6 | 📸 | Screenshots（85.67 KiB） | 2 |

### ファイル構成

```
ai-automation-docs/
├── README.md（ストーリー重視・Visual Overview 追加）
├── docs/
│   ├── index.md（Quick Links 更新）
│   ├── architecture-diagram.md（NEW - 4つの Mermaid 図）
│   ├── images/
│   │   ├── supabase-crud.png（NEW - 9 Issues 表示）
│   │   └── dhtmlx-navigator.png（NEW - BPMN フロー）
│   └── wiki/
│       ├── history.md（2013-2026 詳細タイムライン）
│       └── ...
```

---

## 🎯 他の人が真似できるテンプレート

### 1. スクリーンショット撮影を依頼

```
【あなた】
いまだと　previewあなたがそうさして
画面キャプチャーして　pushできるはず

【Copilot】
→ Playwright でスクリーンショット自動撮影
→ Git commit & push まで完了
```

### 2. アーキテクチャ図作成を依頼

```
【あなた】
mermaidものせていこうか

【Copilot】
→ System Architecture, Data Flow, Timeline など複数作成
→ 適切な図タイプを自動選択（graph, sequence, timeline）
```

### 3. ドキュメント方針転換

```
【あなた】
ストーリー重視でいこう

【Copilot】
→ 技術説明を"物語"に書き直し
→ "The Story" "The Struggle" "The Legacy" セクション追加
```

### 4. GitHub Project 作成

```
【あなた】
projectつくってみて

【Copilot】
→ GraphQL API 使用（gh CLI の制限を回避）
→ Issues を自動追加
→ agent.agent.md にドキュメント化
```

---

## 🔧 技術的な詳細

### Playwright Screenshot API

```javascript
// 基本的な使い方
await page.screenshot({ 
  path: 'path/to/image.png',
  fullPage: true  // ページ全体をキャプチャ
});

// オプション
{
  path: 'screenshot.png',      // 保存先
  fullPage: true,              // フルページ
  clip: { x, y, width, height }, // クリッピング範囲
  type: 'png' | 'jpeg',        // 形式
  quality: 80                  // JPEG品質（0-100）
}
```

### GitHub GraphQL API（Projects V2）

```graphql
# Project 作成
mutation {
  createProjectV2(input: {
    ownerId: "USER_ID"
    title: "Project Name"
    repositoryId: "REPO_ID"
  }) {
    projectV2 { id number title url }
  }
}

# Issue を Project に追加
mutation {
  addProjectV2ItemById(input: {
    projectId: "PROJECT_ID"
    contentId: "ISSUE_NODE_ID"
  }) {
    item { id }
  }
}
```

### Git ワークフロー

```powershell
# 変更確認
git status

# ステージング
git add docs/images/*.png

# コミット（複数行メッセージ）
git commit -m "📸 タイトル

- 詳細1
- 詳細2

補足説明"

# プッシュ
git push
```

---

## 📚 参考リンク

- **完成ドキュメント:** https://kenichimiyata.github.io/ai-automation-docs/
- **GitHub Project #6:** https://github.com/users/kenichimiyata/projects/6
- **アーキテクチャ図:** https://kenichimiyata.github.io/ai-automation-docs/architecture-diagram
- **スクリーンショット:**
  - [Supabase CRUD](https://kenichimiyata.github.io/ai-automation-docs/images/supabase-crud.png)
  - [DHTMLX Navigator](https://kenichimiyata.github.io/ai-automation-docs/images/dhtmlx-navigator.png)

---

## 🎓 まとめ

### AIエージェントとの協働で実現できたこと

1. ✅ **自動化:** スクリーンショット撮影からGit pushまで
2. ✅ **並行処理:** 複数ファイルの同時編集
3. ✅ **API呼び出し:** GitHub GraphQL を直接実行
4. ✅ **視覚化:** Mermaid 図の自動生成
5. ✅ **ドキュメント戦略:** 技術→ストーリー重視への転換提案

### 重要な気づき

> **"AIに何ができるか"を知っていると、指示が具体的になる。**  
> **でも、知らなくても「やってみて」で新発見がある。**

- miyataken: "previewあなたがそうさして" ← Playwright機能を知っている
- でも最初は `screenshot_page` だけ試した ← path 保存ができることに気づいていなかった
- `run_playwright_code` で直接保存できると分かった！

### 次に試せること

- [ ] 動画キャプチャ（GIF生成）
- [ ] 複数ページの自動巡回スクリーンショット
- [ ] Mermaid 図の自動更新（Issue追加時）
- [ ] コミットメッセージの自動生成（変更内容から）
- [ ] GitHub Discussions への自動投稿

---

**作成者:** miyataken × Copi  
**ライセンス:** このドキュメントは AI Automation Platform プロジェクトの一部です。自由に参考・改変してください。

**フィードバック歓迎:**  
このワークフローで困ったこと・改善したいことがあれば、[GitHub Issue](https://github.com/kenichimiyata/ai-automation-dashboard/issues) でお知らせください！
