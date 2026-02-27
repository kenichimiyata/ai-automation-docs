---
layout: default
title: Quick Start Guide
---

# ⚡ Quick Start Guide - 新AI向け30秒状況把握

## 🎯 現在の状況（2024-01-XX時点）

### ✅ 完成済み主要システム
- **8つのGradioインターフェース**が稼働中（AIチャット、ファイル管理、GitHub Issue自動生成など）
- **FastAPI + Laravel風アーキテクチャ**基盤完成
- **noVNCデスクトップ環境**でPCレス・ブラウザ操作可能
- **システム監視・API基盤**構築完了
- **完全なナレッジ・ドキュメント化**体制確立

### 🚀 即座に実行できるコマンド

```bash
# 1. システム起動（30秒で全システム稼働）
cd /workspaces/AUTOCREATE
python app.py

# 2. noVNCデスクトップ起動（ブラウザから操作）
./start-novnc.sh

# 3. 個別テスト実行
python test_gradio_final_fixed.py
```

### 📁 重要ファイル場所

```
/workspaces/AUTOCREATE/
├── app.py                    # メインアプリケーション
├── mysite/asgi.py           # Gradio統合のメイン
├── routes/api.py            # API基盤
├── app/Http/Controllers/Gradio/  # 8つのGradioコンポーネント
├── wikigit/                 # 永続化ナレッジ（git管理）
└── docker-compose-novnc.yml # noVNCデスクトップ環境
```

### 🌐 アクセス先

- **Gradioメインアプリ**: http://localhost:8000/
- **FastAPI管理画面**: http://localhost:8000/docs
- **noVNCデスクトップ**: http://localhost:6901/
- **システム監視**: http://localhost:8000/（監視タブ）

## 🎯 次にやるべきこと

### 優先度A（必須）
1. **システム動作確認**: `python app.py`で全システム起動
2. **ナレッジ確認**: `wikigit/Continuity-Guide.md`を読む
3. **開発計画確認**: `wikigit/Development-Guidelines.md`を読む

### 優先度B（推奨）
1. **noVNCテスト**: `./start-novnc.sh`でデスクトップ環境テスト
2. **新機能追加**: 9つ目のGradioコンポーネント検討
3. **API拡張**: routes/api.pyに新しいエンドポイント追加

### 優先度C（長期）
1. **セキュリティ強化**: 認証・認可システム実装
2. **マルチユーザー対応**: ユーザー管理システム
3. **クラウドデプロイ**: Heroku/AWS/GCP展開

## 💡 重要な注意点

### ⚠️ 必読事項
- **wikigitディレクトリ**は必ずgit pushしてください（永続化のため）
- **Codespace再起動**時は`python app.py`で即座にシステム復旧
- **新しいGradioコンポーネント**は必ずmysite/asgi.pyに手動追加

### 🔧 トラブルシューティング
- **Gradioエラー**: `wikigit/Troubleshooting-Guide.md`参照
- **ポート競合**: 8000番ポートが使用中の場合は他のプロセスを停止
- **依存関係エラー**: `pip install -r requirements.txt`

## 📚 詳細ドキュメント

深く理解したい場合は以下を参照：

- **[Continuity Guide](Continuity-Guide.md)** - AI継続開発の必読書
- **[System Architecture](System-Architecture.md)** - システム全体設計
- **[Development Guidelines](Development-Guidelines.md)** - 開発統一計画
- **[NoVNC Browser Desktop Guide](NoVNC-Browser-Desktop-Guide.md)** - PCレス環境

---

*このガイドは新しいAIが30秒で状況を把握し、即座に開発を継続できるよう設計されています。*
