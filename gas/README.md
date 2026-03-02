# BPMN Designer - Google Apps Script

**Human + AI Collaboration Workflow Editor with GitHub Integration**

## 概要
GoogleApps Scriptで動作するスタンドアロンBPMNデザイナー。  
人間とAIの協働プロセスを可視化・設計し、**GitHub Issue として自動委譲**できます。

## ✨ 新機能（v2.0 - GitHub Integration）
- 🚀 **GitHub Issue 自動作成** - BPMN を YAML 変換して Issue として AI に委譲
- 📋 **YAML Export** - GitHub Actions 変換可能な YAML フォーマット
- 🤖 **リモート AI 連携** - Local Copilot → GitHub Copilot Agent への自動ワークフロー
- 🔗 **複数リポジトリ対応** - dashboard / platform / docs から選択可能

## 機能
- ✅ Human/AI レーン分離表示
- ✅ ドラッグ&ドロップでノード配置
- ✅ ブラウザLocalStorageで保存
- ✅ JSON エクスポート/インポート
- ✅ リアルタイムインスペクター
- ✅ n8n ワークフロー変換
- 🆕 **GitHub Issue 自動作成**
- 🆕 **YAML Export (ai-bpmn-model/v1)**

## デプロイ方法

### 1. clasp でプッシュ
```bash
cd gas/
clasp login
clasp create --type webapp --title "BPMN Designer" --rootDir .
clasp push
```

### 2. デプロイ
Google Apps Script Editor で:
1. 「デプロイ」→「新しいデプロイ」
2. 種類: ウェブアプリ
3. アクセス: 全員（匿名ユーザーを含む）
4. デプロイ

### 3. 公開URLを取得
`https://script.google.com/macros/s/XXXXX/exec`

## ファイル構成
```
gas/
├── Code.gs              # メインロジック（doGet）
├── BpmnDesigner.html    # UIフロントエンド
├── appsscript.json      # GAS設定
└── README.md            # このファイル
```

## 使い方
1. 公開URLにアクセス
2. Pal ette からノードをドラッグ
3. Human/AIレーンに配置
4. 💾 Save でブラウザに保存
5. 📤 Export JSON で外部保存

## 公開URL

### 🎨 BPMN Designer（標準版）
**URL**: https://script.google.com/a/macros/urlounge.co.jp/s/AKfycbzOFStOJRdYblPXloslKV0rDmzP24aO9uQuudQn_koE_ENnqdFfLX98svbyJOJ2Vx1_/exec

### 🚀 BPMN Designer + GitHub Integration
**URL**: https://script.google.com/a/macros/urlounge.co.jp/s/AKfycbzOFStOJRdYblPXloslKV0rDmzP24aO9uQuudQn_koE_ENnqdFfLX98svbyJOJ2Vx1_/exec?version=github

### 📋 プロジェクト受付フォーム
**作成予定**: Google Form → IntakeFormHandler.gs → GitHub Issue

**デプロイ日:** 2026-02-28  
**バージョン:** v2.0 (GitHub Integration)  
**アカウント:** k.miyata@urlounge.co.jp

---

## 💼 ビジネス活用

### 窓口の種類
1. **BPMN Designer** - ワークフローを設計して Issue 作成
2. **Google Form** - 非技術者向け受付フォーム
3. **GitHub Issue** - 開発者向け直接作成
4. **Email → Webhook** - メールから自動 Issue 化
5. **Slack / Google Chat** - チャットから Issue 化

### 料金体系
詳細は [`BUSINESS_MODEL.md`](../../ai-automation-platform/BUSINESS_MODEL.md) を参照

**主要価格**:
- CRUD画面: ¥15,000 / 画面
- REST API: ¥10,000 / エンドポイント
- ワークフロー: ¥18,000 / フロー

### 自動見積もり機能
`IntakeFormHandler.gs` が自動計算:
- 項目数 × 単価 = 見積金額
- 工数計算 → 納期自動算出
- Google Chat 通知
- 確認メール自動送信

## ローカル開発
```bash
# このフォルダで開く
cd C:\xampp\htdocs\ai-automation-docs\gas

# claspでプッシュ
clasp push -f

# GAS Editorで開く
clasp open-script
```

## ライセンス
MIT License

## 関連リンク
- [🚀 BPMN Designer (Live)](https://script.google.com/a/macros/urlounge.co.jp/s/AKfycbzOFStOJRdYblPXloslKV0rDmzP24aO9uQuudQn_koE_ENnqdFfLX98svbyJOJ2Vx1_/exec)
- [GoJS Library](https://gojs.net/)
- [Google Apps Script](https://script.google.com/)
- [GitHub Repository](https://github.com/kenichimiyata/ai-automation-docs)
