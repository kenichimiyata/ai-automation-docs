# BPMN Designer - デプロイ手順書

## 現在の状態
✅ GASプロジェクト作成完了  
✅ コードプッシュ完了 (Code.gs, BpmnDesigner.html, appsscript.json)  
✅ GAS Editor アクセス可能

**プロジェクトURL:**  
https://script.google.com/d/10zRCJZXrcPhhDQ2NhJBtVTGSuDvmH-MWyA9VAuJmOHyVpDDCPRa3vAF4/edit

---

## デプロイ手順（手動）

### 1. GAS Editorを開く
```bash
cd C:\xampp\htdocs\ai-automation-docs\gas
clasp open-script
```

または直接ブラウザで開く：  
https://script.google.com/d/10zRCJZXrcPhhDQ2NhJBtVTGSuDvmH-MWyA9VAuJmOHyVpDDCPRa3vAF4/edit

### 2. デプロイボタンをクリック
右上の青い「**デプロイ**」ボタンをクリック

### 3. 「新しいデプロイ」を選択
ドロップダウンメニューから「**新しいデプロイ**」を選択

### 4. デプロイ設定
1. 種類の選択: ⚙️ アイコンをクリック → 「**ウェブアプリ**」を選択

2. 説明:  
   `BPMN Designer v1.0 - 2026-02-28`

3. **次のユーザーとして実行:**  
   `自分（k.miyata@urlounge.co.jp）`

4. **アクセスできるユーザー:**  
   - `全員` ← 完全に公開したい場合
   - `Google アカウントを持つ全員` ← ログイン必須にする場合

5. 「**デプロイ**」ボタンをクリック

### 5. 承認プロセス
初回デプロイ時、権限の承認が必要：
1. 「承認が必要です」→ 「権限を確認」をクリック
2. アカウントを選択（k.miyata@urlounge.co.jp）
3. 「詳細」→ 「BPMN Designer（安全ではないページ）に移動」
4. 「許可」をクリック

### 6. デプロイ完了
**ウェブアプリURL**が表示される：
```
https://script.google.com/macros/s/XXXXX/exec
```

このURLをコピーして保存！

---

## デプロイ後の確認

### URLテスト
```bash
# PowerShellで開く
Start-Process "https://script.google.com/macros/s/XXXXX/exec"
```

またはブラウザで直接アクセス

### 期待される動作
1. ✅ BPMN Designerが表示される
2. ✅ Human/AI Laneが表示される
3. ✅ Paletteからノードをドラッグできる
4. ✅ 💾 Save ボタンでブラウザストレージに保存できる
5. ✅ 📤 Export JSON でダウンロードできる

---

## トラブルシューティング

### エラー: 「承認が必要です」
→ 手順5の承認プロセスを実行

### エラー: 「アクセスが拒否されました」
→ デプロイ設定で「アクセスできるユーザー」を確認

### エラー: 「スクリプトが見つかりません」
→ clasp push でコードを再アップロード

### ページが真っ白
→ ブラウザのJavaScript有効化を確認

---

## 更新手順

コードを変更した場合：

```bash
cd C:\xampp\htdocs\ai-automation-docs\gas

# 編集後
clasp push -f

# GAS Editorで「デプロイ」→「デプロイを管理」
# → 既存デプロイの「…」→「新しいバージョンとして編集」
```

---

## 公開URLの記録場所

デプロイ完了後、以下のファイルに記録：

1. **README.md** - gas/README.md に追記
2. **Memory** - User Memory (`/memories/ai-automation-platform.md`) に記録
3. **GitHub Issues** - 対応するIssueにコメント

---

## 次のステップ

1. ⏳ デプロイ実施
2. ⏳ 公開URL取得
3. ⏳ テスト実施
4. ⏳ README更新
5. ⏳ GitHub Pages から BPMNデザイナーへリンク追加

作成日: 2026-02-28  
担当: AI Automation Platform Team
