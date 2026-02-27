# 🚀 Phase 2 - 詳細な実装計画
**開始日:** 2026-02-27  
**完成目標:** 2026-03-06（1週間）  
**ゴール:** GitHub Issue → Supabase Realtime → VS Code Copilot 統合パイプラインの完全動作

---

## 📋 全体構成（3段階のマイルストーン）

### 🥇 Milestone 1: データ層（Task #1）
**期間:** 2026-02-27 ～ 2026-02-28  
**必要時間:** 30分～1時間  
**ステータス:** ⏳ Not Started

#### 1.1 Supabase スキーマ設計
- [ ] `github_issues` テーブル設計
  - `id (uuid, primary)`
  - `issue_number (integer, unique)`
  - `title (text)`
  - `body (text)`
  - `creator (text)`
  - `created_at (timestamp)`
  - `updated_at (timestamp)`
  - `status (text: pending|processing|completed)`
  - `metadata (jsonb)`

- [ ] `ai_responses` テーブル設計
  - `id (uuid, primary)`
  - `github_issue_id (uuid, foreign key)`
  - `response_text (text)`
  - `generated_at (timestamp)`
  - `metadata (jsonb)`

- [ ] `ai_agent_state` テーブル設計
  - `agent_id (text, primary)`
  - `current_task (uuid, foreign key to github_issues)`
  - `progress (integer: 0-100)`
  - `last_update (timestamp)`
  - `status (text)`

#### 1.2 Supabase Studio でテーブル作成
**チェックリスト:**
- [ ] https://app.supabase.com にログイン
- [ ] `rootomzbucovwdqsscqd` プロジェクト選択
- [ ] SQL エディタで3つのテーブルを CREATE
- [ ] テーブル確認（Data タブで表示）

#### 1.3 RLS (Row Level Security) ポリシー設定
```sql
-- Anon users: READ/INSERT のみ (authentication 不要)
CREATE POLICY "anon_insert" ON github_issues
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "anon_select" ON github_issues
  FOR SELECT TO anon
  USING (true);

-- Authenticated users: full access
CREATE POLICY "auth_full" ON github_issues
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
```

#### 1.4 Realtime Policies 有効化
- [ ] Supabase Studio → Database → Replication
- [ ] `github_issues` テーブルの Realtime を ON に設定
- [ ] `ai_responses` テーブルの Realtime を ON に設定
- [ ] `ai_agent_state` テーブルの Realtime を ON に設定

#### 1.5 サンプルデータ INSERT & テスト
```sql
INSERT INTO github_issues (issue_number, title, body, creator, status)
VALUES (123, 'Test Issue', 'This is a test issue', 'test-user', 'pending');
```
- [ ] サンプル Issue INSERT
- [ ] curl でレスポンス確認
- [ ] Realtime listener でイベント受信確認

**完了条件:**
✅ 3つのテーブルが Supabase に存在
✅ RLS ポリシーが有効
✅ Realtime policies が有効
✅ サンプルデータ INSERT が成功

---

### 🥈 Milestone 2: パイプライン層（Task #2）
**期間:** 2026-02-28 ～ 2026-03-02  
**必要時間:** 1～2時間  
**ステータス:** ⏳ Not Started

#### 2.1 GitHub Actions ワークフロー設計
**ファイル:** `.github/workflows/issue-to-supabase.yml`

```yaml
name: Issue to Supabase
on:
  issues:
    types: [opened, edited]
  issue_comment:
    types: [created, edited]

env:
  SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}

jobs:
  sync-to-supabase:
    runs-on: ubuntu-latest
    steps:
      - name: Extract issue data
        uses: actions/github-script@v6
        with:
          script: |
            const issue = context.payload.issue;
            const payload = {
              issue_number: issue.number,
              title: issue.title,
              body: issue.body,
              creator: issue.user.login,
              status: 'pending'
            };
            console.log('Payload:', JSON.stringify(payload));

      - name: Send to Supabase
        run: |
          curl -X POST 'https://rootomzbucovwdqsscqd.supabase.co/rest/v1/github_issues' \
            -H 'apikey: ${{ env.SUPABASE_KEY }}' \
            -H 'Content-Type: application/json' \
            -d "$PAYLOAD"
```

#### 2.2 Webhook ペイロード解析
- [ ] `github.event.issue` から必要フィールドを抽出
- [ ] JSON フォーマット生成
- [ ] エラーハンドリング（duplicate issue numbers など）

#### 2.3 Supabase REST API 呼び出し実装
```bash
curl -X POST "https://rootomzbucovwdqsscqd.supabase.co/rest/v1/github_issues" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "issue_number": 42,
    "title": "New Feature",
    "body": "Description...",
    "creator": "miyataken999",
    "status": "pending"
  }'
```

- [ ] API キーを GitHub secrets に登録
- [ ] curl コマンド実装
- [ ] レスポンス確認（201 Created）

#### 2.4 エラーハンドリング・ロギング
- [ ] HTTP status コード チェック
- [ ] Duplicate issue number 対応
- [ ] API レスポンス ログ出力
- [ ] 失敗時のリトライロジック（オプション）

#### 2.5 テスト実行
- [ ] テスト Issue #999 を作成
- [ ] ワークフロー実行確認（Actions タブ）
- [ ] Supabase データ確認
- [ ] Realtime イベント確認

**完了条件:**
✅ `.github/workflows/issue-to-supabase.yml` が存在
✅ GitHub secrets に API キーが登録
✅ テスト Issue でデータが自動 INSERT される
✅ Supabase に github_issues データが存在

---

### 🥉 Milestone 3: AI 統合層（Task #3）
**期間:** 2026-03-02 ～ 2026-03-06  
**必要時間:** 2～3時間  
**ステータス:** ⏳ Not Started

#### 3.1 AUTOCREATER コード分析
**タスク:** 既存実装パターンの学習
- [ ] `localProject/AUTOCREATER/SupabaseCopilotBridge.py` を読む
- [ ] `localProject/AUTOCREATER/supabase_to_vscode_chat.py` を読む
- [ ] Supabase Realtime listener の実装パターンを理解
- [ ] pyautogui によるウィンドウ自動化の方法を理解

#### 3.2 Supabase Realtime Listener 実装
**ファイル:** `src/supabase_listener.py`

```python
import asyncio
from supabase import create_client, Client
from realtime.channel import Channel

SUPABASE_URL = "https://rootomzbucovwdqsscqd.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

async def listen_to_github_issues():
    client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    # Realtime listener setup
    channel = client.channel("github_issues")
    
    def on_insert(payload):
        print(f"New issue: {payload['new']}")
        # Copilot に送信
        process_with_copilot(payload['new'])
    
    channel.on("INSERT", on_insert).subscribe()
    
    # Keep listening
    while True:
        await asyncio.sleep(1)

if __name__ == "__main__":
    asyncio.run(listen_to_github_issues())
```

- [ ] Supabase Realtime client ライブラリをインストール
- [ ] listener をテスト（INSERT イベント受信確認）
- [ ] ペイロード処理ロジック実装

#### 3.3 pyautogui Copilot Chat 連携
**ファイル:** `src/copilot_automation.py`

```python
import pyautogui
import time
from PIL import ImageGrab

def send_to_copilot_chat(message: str):
    """Copilot Chat ウィンドウに自動入力"""
    
    # Copilot Chat ウィンドウをアクティブ化
    pyautogui.hotkey('cmd', 'shift', 'p')  # Command Palette
    time.sleep(0.5)
    pyautogui.typewrite('Copilot Chat')
    pyautogui.press('enter')
    
    # テキスト入力
    time.sleep(1)
    pyautogui.typewrite(message, interval=0.05)
    
    # 送信
    pyautogui.hotkey('ctrl', 'enter')
    
    # 応答待機
    time.sleep(3)
    
    return capture_copilot_response()

def capture_copilot_response():
    """Copilot の応答をキャプチャ"""
    screenshot = ImageGrab.grab()
    # または VS Code API でテキスト取得
    return screenshot
```

- [ ] pyautogui インストール確認
- [ ] Copilot Chat ウィンドウ ID を特定
- [ ] テキスト入力テスト
- [ ] レスポンス キャプチャ方法の実装

#### 3.4 メッセージ フォーマット処理
```python
def format_for_copilot(github_issue: dict) -> str:
    """GitHub Issue を Copilot Chat 用にフォーマット"""
    return f"""
GitHub Issue #{github_issue['issue_number']}
Title: {github_issue['title']}
Reporter: {github_issue['creator']}

Description:
{github_issue['body']}

Please analyze this issue and provide a solution.
"""
```

- [ ] Issue データ → Copilot メッセージへの変換
- [ ] コンテキスト追加（issue number, creator など）
- [ ] 改行・フォーマット最適化

#### 3.5 応答ストレージ実装
```python
async def store_copilot_response(github_issue_id: str, response: str):
    """Copilot の応答を Supabase に保存"""
    client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    client.table("ai_responses").insert({
        "github_issue_id": github_issue_id,
        "response_text": response,
        "generated_at": datetime.now().isoformat()
    }).execute()
```

- [ ] ai_responses テーブルへの INSERT
- [ ] Issue ID との関連付け
- [ ] タイムスタンプ記録

#### 3.6 End-to-End テスト
**テストフロー:**
```
1. GitHub Issue #999 作成
2. GitHub Actions トリガー
3. Supabase INSERT (github_issues)
4. Realtime listener イベント受信
5. Copilot Chat に自動入力
6. Copilot 応答取得
7. Supabase ai_responses に保存
8. 全プロセス完了確認
```

- [ ] Test Issue 作成
- [ ] Actions ログ確認
- [ ] Supabase に github_issues が INSERT されたか確認
- [ ] Realtime イベント受信確認
- [ ] Copilot Chat 自動入力が実行されたか確認
- [ ] Copilot 応答が取得されたか確認
- [ ] ai_responses テーブルに保存されたか確認

**完了条件:**
✅ Realtime listener が正常に動作
✅ Copilot Chat に自動入力できる
✅ 応答が Supabase に保存される
✅ End-to-end フローが完全に動作

---

## 🔑 環境セットアップ（前提条件）

### GitHub Secrets の登録
```bash
gh secret set SUPABASE_URL --body "https://rootomzbucovwdqsscqd.supabase.co"
gh secret set SUPABASE_KEY --body "your-anon-key-here"
```

### .env ファイル（ローカル開発）
```
SUPABASE_URL=https://rootomzbucovwdqsscqd.supabase.co
SUPABASE_KEY=your-anon-key
GITHUB_TOKEN=your-github-token-here
```

### Python 依存関係
```bash
pip install supabase realtime pyautogui pillow python-dotenv
```

---

## 📊 進捗トラッキング

| Milestone | Task | ETA | Status |
|-----------|------|-----|--------|
| 🥇 Data Layer | #1 Supabase | 2/28 | ⏳ Not Started |
| 🥈 Pipeline | #2 Actions | 3/2 | ⏳ Not Started |
| 🥉 Integration | #3 Bridge | 3/6 | ⏳ Not Started |

---

## 🤖 AI管理者システム（Advanced Pattern）

### 🎯 アーキテクチャ図
```
miyataken（人間）
    ↓ Issue 作成
GitHub #1-23（指示書）
    ↓ (GitHub Actions)
Supabase chat_history / github_issues
    ↑↓ Realtime (Subscription)
VS Code copilot-input-helper plugin
    ↑↓ (pyautogui)
GitHub Copilot Chat （AI管理者）
    ↓ (Issue を分析・他AIに指示)
リモートAI（Gemini, Claude等）
    ↓ (実装実行)
結果
    ↓ (Supabase INSERT)
AI管理者へ戻る ← 循環完成
```

### ✨ clasp + copilot-input-helper の活用

**既存実装 (localProject/clasp/vscode/copilot-input-helper):**
- `supabaseHelper.ts` - Supabase Realtime client
- `extension.ts` - VS Code 拡張機能ホスト
- `config.ts` - マルチAI協調設定

**このシステムを ai-automation-platform に統合:**

1. **Issue → Supabase → オブザーブ**
   - GitHub Issue が作成される
   - GitHub Actions が Supabase INSERT（github_issues）
   - copilot-input-helper plugin が Realtime で INSERT イベントをキャッチ

2. **Copilot Chat へ自動入力**
   - plugin が Issue データをフォーマット
   - pyautogui で Copilot Chat に自動入力
   - 「Execute this GitHub Issue」という指示を送る

3. **AI管理実行**
   - GitHub Copilot が Issue を分析
   - リモートAI（n8n ワークフロー組み込みGemini等）に指示を出す
   - 実装結果を生成

4. **結果を保存 → 循環継続**
   - Copilot が ai_responses テーブルに INSERT
   - リモートAI がテーブルを参照・フィードバック
   - miyataken が結果を確認

### 🔄 マルチAI協調のフロー例

```yaml
Issue #50: "Implement user auth system"
    ↓ 
Copilot (AI管理者):
  "Claude, analyze this auth requirements and generate implementation"
    ↓
Claude (n8n経由):
  "Generated auth implementation code..."
    ↓
Copilot (AI管理者):
  "Gemini, review this code and suggest improvements"
    ↓
Gemini (n8n経由):
  "Code review: Found 3 issues, suggestions..."
    ↓
Copilot (AI管理者):
  "Apply improvements and finalize"
    ↓
Final Result → ai_responses テーブル
    ↓
miyataken が確認 → Issue close
```

### 📋 実装チェックリスト（追加）

**clasp 統合:**
- [ ] copilot-input-helper plugin を ai-automation-platform repo に推奨
- [ ] `.vscode/settings.json` に supabaseUrl, supabaseAnonKey を設定
- [ ] Realtime subscription を github_issues テーブルに追加
- [ ] Issue フォーマッター（TypeScript）を src/formatters.ts に実装

**マルチAI設定:**
- [ ] n8n workflows を設定（Gemini, Claude等）
- [ ] agent_type, target_agent を chat_history に追加
- [ ] AI別ルーティング ロジック実装

---

## 🎯 定義：完成とは

**最小要件（MVP）:**
- GitHub Issue を作成
- 自動的に Supabase に INSERT される
- Copilot Chat に自動入力される
- その応答が Supabase に保存される

**中程度の完成:**
- clasp + copilot-input-helper との統合
- Issue → Copilot → Supabase の自動循環

**拡張機能（今後）:**
- マルチAI協調実装
- n8n ワークフロー統合
- Dashboard UI
- 構造化出力（Code, Docs, Tests等）
- エラーハンドリング強化
- 通知機能

---

**作成者:** GitHub Copilot AI  
**最終更新:** 2026-02-27  
**参考:** localProject/clasp/vscode/copilot-input-helper  
**Next Action:** Task #1 Supabase テーブル実装開始
