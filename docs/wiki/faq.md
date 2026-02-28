---
layout: default
title: よくある質問 (FAQ)
---

# よくある質問 (FAQ)

このページでは、AI Automation Platform に関するよくある質問と回答をまとめています。

---

## 質問の仕方

### Q. 質問はどこでできますか？

**A.** 以下の方法で質問できます：

1. **GitHub Issues**（推奨）  
   [ai-automation-dashboard の Issues](https://github.com/kenichimiyata/ai-automation-dashboard/issues/new) から新しい Issue を作成してください。  
   - バグ報告・機能リクエスト・質問など、なんでも歓迎です。

2. **GitHub Discussions**  
   一般的な議論や質問は [Discussions](https://github.com/kenichimiyata/ai-automation-docs/discussions) をご利用ください。

3. **このリポジトリの Issues**  
   ドキュメントに関する質問は [こちら](https://github.com/kenichimiyata/ai-automation-docs/issues/new) へどうぞ。

---

## プロジェクトについて

### Q. AI Automation Platform とは何ですか？

**A.** GitHub Issue を書くだけで AI が自動実装する、オープンソースの AI 自動化プラットフォームです。  
詳しくは [README](https://github.com/kenichimiyata/ai-automation-docs) をご覧ください。

### Q. どのような技術スタックを使っていますか？

**A.** 主な技術スタックは以下の通りです：

| レイヤー | 技術 |
|---------|------|
| データ層 | Supabase (PostgreSQL + Realtime) |
| パイプライン | GitHub Actions |
| AI 統合 | VS Code Copilot |
| AI OS | noVNC Gateway |
| ワークフロー | n8n |

詳細は [Tech Stack](tech-stack-architecture) をご覧ください。

### Q. 始め方を教えてください

**A.** [クイックスタートガイド](quick-start-guide) を参照してください。30 分で環境構築できます。

### Q. コントリビュートできますか？

**A.** はい！[コントリビュートガイド](../contributing) をご覧ください。  
AI エンジニア・フロントエンド・ドキュメント・アイデアマン、どなたでも歓迎です。

---

## トラブルシューティング

### Q. うまく動かない場合はどうすればよいですか？

**A.** [トラブルシューティング](troubleshooting) ページを確認してください。  
解決しない場合は、[Issues](https://github.com/kenichimiyata/ai-automation-dashboard/issues/new) で質問してください。

---

## 関連リンク

- [実装計画](../implementation-plan) - Milestone 1/2/3 の詳細
- [システム設計](system-architecture) - アーキテクチャ詳細
- [AI 協働開発ガイド](ai-collaboration-guide) - AI との協働開発パターン
- [プラットフォーム状態](platform-status) - 現在の進捗

---

_質問・フィードバックはいつでも歓迎です！_
