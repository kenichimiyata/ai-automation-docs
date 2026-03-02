/**
 * BPMN Designer - GAS Web App (Full Featured + GitHub Integration)
 * Human + AI Collaboration Workflow Designer
 * 
 * フル機能版：
 * - n8n JSON インポート/エクスポート
 * - Canonical Model (ai-bpmn-model/v1) 対応
 * - Human/AI Lane 自動配置
 * - ローカルストレージ保存
 * - JSON 変換機能
 * - 🚀 GitHub Issue 自動作成 (NEW!)
 * 
 * 公開URL経由でアクセス可能なスタンドアロンBPMNエディタ
 */

function doGet(e) {
  // クエリパラメータで version を指定可能
  // ?version=github → GitHub統合版
  // デフォルト → 標準版
  const version = e && e.parameter && e.parameter.version;
  
  if (version === "github") {
    return HtmlService.createHtmlOutputFromFile('BpmnDesigner_GitHub')
      .setTitle('BPMN Designer + GitHub Integration')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  // デフォルト: 標準版
  return HtmlService.createHtmlOutputFromFile('BpmnDesigner')
    .setTitle('BPMN Designer - Human + AI Collaboration')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * サンプルワークフローデータを返す
 */
function getSampleWorkflow() {
  return {
    "schema": "ai-bpmn-model/v1",
    "metadata": {
      "exportedAt": new Date().toISOString(),
      "source": "gas-bpmn-designer"
    },
    "nodes": [
      {
        "id": "start",
        "label": "🔄 Start",
        "kind": "Start",
        "role": "Human",
        "note": "",
        "pos": { "x": 120, "y": 170 },
        "meta": "start",
        "rawType": "event"
      },
      {
        "id": "task1",
        "label": "Human Task",
        "kind": "Task",
        "role": "Human",
        "note": "",
        "pos": { "x": 330, "y": 170 },
        "meta": "task",
        "rawType": "manual-task"
      },
      {
        "id": "task2",
        "label": "AI Task",
        "kind": "Task",
        "role": "AI",
        "note": "",
        "pos": { "x": 560, "y": 460 },
        "meta": "task",
        "rawType": "service-task"
      },
      {
        "id": "end",
        "label": "✅ End",
        "kind": "End",
        "role": "Human",
        "note": "",
        "pos": { "x": 790, "y": 170 },
        "meta": "end",
        "rawType": "event"
      }
    ],
    "edges": [
      { "id": "e1", "from": "start", "to": "task1", "label": "" },
      { "id": "e2", "from": "task1", "to": "task2", "label": "" },
      { "id": "e3", "from": "task2", "to": "end", "label": "" }
    ]
  };
}

/**
 * ローカルストレージ保存用のヘルパー（フロントエンドで使用）
 */
function saveToProperties(key, data) {
  PropertiesService.getUserProperties().setProperty(key, JSON.stringify(data));
  return { success: true };
}

function loadFromProperties(key) {
  var data = PropertiesService.getUserProperties().getProperty(key);
  return data ? JSON.parse(data) : null;
}
