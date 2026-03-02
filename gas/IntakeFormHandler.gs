/**
 * AI Automation Platform - Project Intake Form Handler
 * Google Form → GitHub Issue 自動作成
 * 
 * 機能:
 * - フォーム送信時に onFormSubmit トリガー
 * - 自動見積もり計算
 * - GitHub Issue 自動作成
 * - Google Chat 通知
 */

// 設定
const CONFIG = {
  githubToken: PropertiesService.getScriptProperties().getProperty('GH_TOKEN'),
  githubRepo: 'kenichimiyata/ai-automation-dashboard',
  googleChatWebhook: PropertiesService.getScriptProperties().getProperty('GOOGLE_CHAT_WEBHOOK'),
  
  // 料金表
  priceList: {
    screen_crud: 15000,
    screen_search: 8000,
    screen_custom: 20000,
    screen_master: 12000,
    screen_dashboard: 30000,
    api_rest: 10000,
    api_custom: 15000,
    api_external: 25000,
    api_batch: 20000,
    api_auth: 35000,
    workflow_simple: 18000,
    workflow_complex: 40000,
    workflow_github: 15000,
    workflow_supabase: 20000,
    maintenance_monthly: 20000,
    emergency_support: 15000
  }
};

/**
 * フォーム送信時のトリガー
 */
function onFormSubmit(e) {
  try {
    const formData = parseFormResponse(e.response);
    const estimate = calculateEstimate(formData);
    const issueBody = generateIssueBody(formData, estimate);
    
    // GitHub Issue 作成
    const issue = createGitHubIssue(formData.title, issueBody, ['intake', formData.projectType]);
    
    // Google Chat 通知
    notifyGoogleChat(formData, estimate, issue);
    
    // 回答者にメール送信
    sendConfirmationEmail(formData, estimate, issue);
    
    Logger.log(`✅ Issue #${issue.number} created: ${issue.html_url}`);
    
  } catch (error) {
    Logger.log(`❌ Error: ${error.message}`);
    notifyError(error);
  }
}

/**
 * フォーム回答をパース
 */
function parseFormResponse(response) {
  const items = response.getItemResponses();
  const data = {
    timestamp: response.getTimestamp(),
    email: response.getRespondentEmail() || '未設定'
  };
  
  items.forEach(item => {
    const title = item.getItem().getTitle();
    const answer = item.getResponse();
    
    if (title.includes('お名前') || title.includes('顧客名')) {
      data.clientName = answer;
    } else if (title.includes('会社名')) {
      data.companyName = answer || '';
    } else if (title.includes('プロジェクト名') || title.includes('案件名')) {
      data.title = answer;
    } else if (title.includes('プロジェクトタイプ') || title.includes('開発種別')) {
      data.projectType = answer;
    } else if (title.includes('詳細') || title.includes('要件')) {
      data.description = answer;
    } else if (title.includes('CRUD画面') && title.includes('数')) {
      data.screenCrud = parseInt(answer) || 0;
    } else if (title.includes('検索機能') && title.includes('数')) {
      data.screenSearch = parseInt(answer) || 0;
    } else if (title.includes('カスタムフォーム') && title.includes('数')) {
      data.screenCustom = parseInt(answer) || 0;
    } else if (title.includes('マスタ管理') && title.includes('数')) {
      data.screenMaster = parseInt(answer) || 0;
    } else if (title.includes('ダッシュボード') && title.includes('数')) {
      data.screenDashboard = parseInt(answer) || 0;
    } else if (title.includes('API') && title.includes('数')) {
      data.apiRest = parseInt(answer) || 0;
    } else if (title.includes('外部連携') && title.includes('数')) {
      data.apiExternal = parseInt(answer) || 0;
    } else if (title.includes('ワークフロー') && title.includes('数')) {
      data.workflowSimple = parseInt(answer) || 0;
    } else if (title.includes('希望納期')) {
      data.deadline = answer;
    } else if (title.includes('予算')) {
      data.budget = answer;
    }
  });
  
  return data;
}

/**
 * 見積もり計算
 */
function calculateEstimate(data) {
  const items = [];
  let total = 0;
  
  // 画面開発
  if (data.screenCrud > 0) {
    const subtotal = data.screenCrud * CONFIG.priceList.screen_crud;
    items.push({ name: 'CRUD画面', quantity: data.screenCrud, unitPrice: CONFIG.priceList.screen_crud, subtotal });
    total += subtotal;
  }
  
  if (data.screenSearch > 0) {
    const subtotal = data.screenSearch * CONFIG.priceList.screen_search;
    items.push({ name: '検索機能', quantity: data.screenSearch, unitPrice: CONFIG.priceList.screen_search, subtotal });
    total += subtotal;
  }
  
  if (data.screenCustom > 0) {
    const subtotal = data.screenCustom * CONFIG.priceList.screen_custom;
    items.push({ name: 'カスタムフォーム', quantity: data.screenCustom, unitPrice: CONFIG.priceList.screen_custom, subtotal });
    total += subtotal;
  }
  
  if (data.screenMaster > 0) {
    const subtotal = data.screenMaster * CONFIG.priceList.screen_master;
    items.push({ name: 'マスタ管理画面', quantity: data.screenMaster, unitPrice: CONFIG.priceList.screen_master, subtotal });
    total += subtotal;
  }
  
  if (data.screenDashboard > 0) {
    const subtotal = data.screenDashboard * CONFIG.priceList.screen_dashboard;
    items.push({ name: 'ダッシュボード', quantity: data.screenDashboard, unitPrice: CONFIG.priceList.screen_dashboard, subtotal });
    total += subtotal;
  }
  
  // API開発
  if (data.apiRest > 0) {
    const subtotal = data.apiRest * CONFIG.priceList.api_rest;
    items.push({ name: 'REST API', quantity: data.apiRest, unitPrice: CONFIG.priceList.api_rest, subtotal });
    total += subtotal;
  }
  
  if (data.apiExternal > 0) {
    const subtotal = data.apiExternal * CONFIG.priceList.api_external;
    items.push({ name: '外部API連携', quantity: data.apiExternal, unitPrice: CONFIG.priceList.api_external, subtotal });
    total += subtotal;
  }
  
  // ワークフロー
  if (data.workflowSimple > 0) {
    const subtotal = data.workflowSimple * CONFIG.priceList.workflow_simple;
    items.push({ name: 'ワークフロー', quantity: data.workflowSimple, unitPrice: CONFIG.priceList.workflow_simple, subtotal });
    total += subtotal;
  }
  
  // 納期計算（営業日）
  let estimatedDays = 0;
  estimatedDays += (data.screenCrud || 0) * 2.5;
  estimatedDays += (data.screenSearch || 0) * 1.5;
  estimatedDays += (data.screenCustom || 0) * 4;
  estimatedDays += (data.screenMaster || 0) * 2.5;
  estimatedDays += (data.screenDashboard || 0) * 6;
  estimatedDays += (data.apiRest || 0) * 1.5;
  estimatedDays += (data.apiExternal || 0) * 4;
  estimatedDays += (data.workflowSimple || 0) * 2.5;
  
  return {
    items,
    subtotal: total,
    tax: Math.floor(total * 0.1),
    total: Math.floor(total * 1.1),
    estimatedDays: Math.ceil(estimatedDays),
    estimatedDelivery: getDeliveryDate(Math.ceil(estimatedDays))
  };
}

/**
 * 納期計算（営業日ベース）
 */
function getDeliveryDate(businessDays) {
  const today = new Date();
  let count = 0;
  let current = new Date(today);
  
  while (count < businessDays) {
    current.setDate(current.getDate() + 1);
    const day = current.getDay();
    // 土日を除外
    if (day !== 0 && day !== 6) {
      count++;
    }
  }
  
  return Utilities.formatDate(current, 'Asia/Tokyo', 'yyyy-MM-dd');
}

/**
 * Issue Body 生成
 */
function generateIssueBody(data, estimate) {
  let body = `## 📋 プロジェクト概要\n\n`;
  body += `- **顧客**: ${data.clientName}`;
  if (data.companyName) body += ` (${data.companyName})`;
  body += `\n`;
  body += `- **メール**: ${data.email}\n`;
  body += `- **プロジェクトタイプ**: ${data.projectType}\n`;
  if (data.deadline) body += `- **希望納期**: ${data.deadline}\n`;
  if (data.budget) body += `- **予算**: ${data.budget}\n`;
  body += `- **受付日時**: ${Utilities.formatDate(data.timestamp, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss')}\n\n`;
  
  body += `## 📝 要件詳細\n\n`;
  body += `${data.description}\n\n`;
  
  body += `## 💰 自動見積もり\n\n`;
  body += `| 項目 | 数量 | 単価 | 小計 |\n`;
  body += `|------|------|------|------|\n`;
  
  estimate.items.forEach(item => {
    body += `| ${item.name} | ${item.quantity} | ¥${item.unitPrice.toLocaleString()} | ¥${item.subtotal.toLocaleString()} |\n`;
  });
  
  body += `| **小計** | - | - | **¥${estimate.subtotal.toLocaleString()}** |\n`;
  body += `| 消費税(10%) | - | - | ¥${estimate.tax.toLocaleString()} |\n`;
  body += `| **合計** | - | - | **¥${estimate.total.toLocaleString()}** |\n\n`;
  
  body += `### 📅 納期\n`;
  body += `- **見積もり工数**: ${estimate.estimatedDays} 営業日\n`;
  body += `- **予定納期**: ${estimate.estimatedDelivery}\n\n`;
  
  body += `## ✅ 対応チェックリスト\n\n`;
  body += `- [ ] 見積もり確認・調整\n`;
  body += `- [ ] 顧客への見積もり提示\n`;
  body += `- [ ] 承認確認\n`;
  body += `- [ ] 詳細仕様策定\n`;
  body += `- [ ] 開発着手\n`;
  body += `- [ ] レビュー\n`;
  body += `- [ ] 納品\n`;
  body += `- [ ] 請求\n\n`;
  
  body += `---\n`;
  body += `**Generated by**: AI Automation Platform - Intake Form\n`;
  body += `**Timestamp**: ${new Date().toISOString()}\n`;
  
  return body;
}

/**
 * GitHub Issue 作成
 */
function createGitHubIssue(title, body, labels) {
  const url = `https://api.github.com/repos/${CONFIG.githubRepo}/issues`;
  
  const payload = {
    title: `📋 ${title}`,
    body: body,
    labels: labels
  };
  
  const options = {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${CONFIG.githubToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());
  
  if (response.getResponseCode() !== 201) {
    throw new Error(`GitHub API Error: ${data.message}`);
  }
  
  return data;
}

/**
 * Google Chat 通知
 */
function notifyGoogleChat(data, estimate, issue) {
  const message = {
    cards: [{
      header: {
        title: `🆕 新規案件受付`,
        subtitle: data.title,
        imageUrl: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
      },
      sections: [{
        widgets: [
          {
            keyValue: {
              topLabel: '顧客',
              content: data.clientName,
              icon: 'PERSON'
            }
          },
          {
            keyValue: {
              topLabel: '見積金額',
              content: `¥${estimate.total.toLocaleString()}`,
              icon: 'DOLLAR'
            }
          },
          {
            keyValue: {
              topLabel: '予定納期',
              content: `${estimate.estimatedDays}営業日 (${estimate.estimatedDelivery})`,
              icon: 'CLOCK'
            }
          },
          {
            buttons: [{
              textButton: {
                text: 'Issue を開く',
                onClick: {
                  openLink: {
                    url: issue.html_url
                  }
                }
              }
            }]
          }
        ]
      }]
    }]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(message),
    muteHttpExceptions: true
  };
  
  UrlFetchApp.fetch(CONFIG.googleChatWebhook, options);
}

/**
 * 確認メール送信
 */
function sendConfirmationEmail(data, estimate, issue) {
  const subject = `【AI Automation Platform】お見積もりのご案内 - ${data.title}`;
  
  let body = `${data.clientName} 様\n\n`;
  body += `この度は AI Automation Platform にお問い合わせいただき、ありがとうございます。\n\n`;
  body += `ご依頼内容を確認し、自動見積もりを作成いたしました。\n\n`;
  body += `## お見積もり内容\n\n`;
  
  estimate.items.forEach(item => {
    body += `- ${item.name} × ${item.quantity}: ¥${item.subtotal.toLocaleString()}\n`;
  });
  
  body += `\n**合計金額（税込）**: ¥${estimate.total.toLocaleString()}\n`;
  body += `**予定納期**: ${estimate.estimatedDelivery} (${estimate.estimatedDays}営業日)\n\n`;
  body += `## 次のステップ\n\n`;
  body += `1. 担当者が内容を確認し、詳細なお見積もりを作成いたします\n`;
  body += `2. 2営業日以内に正式なお見積書をお送りいたします\n`;
  body += `3. ご承認後、開発に着手いたします\n\n`;
  body += `ご不明点がございましたら、このメールに返信してください。\n\n`;
  body += `進捗は以下の Issue でも確認できます:\n`;
  body += `${issue.html_url}\n\n`;
  body += `---\n`;
  body += `AI Automation Platform\n`;
  body += `Email: k.miyata@urlounge.co.jp\n`;
  
  GmailApp.sendEmail(data.email, subject, body);
}

/**
 * エラー通知
 */
function notifyError(error) {
  const message = {
    text: `❌ IntakeForm Error: ${error.message}\n\`\`\`\n${error.stack}\n\`\`\``
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(message),
    muteHttpExceptions: true
  };
  
  UrlFetchApp.fetch(CONFIG.googleChatWebhook, options);
}

/**
 * セットアップ関数（初回のみ実行）
 */
function setup() {
  // Script Properties に トークンを設定
  // PropertiesService.getScriptProperties().setProperty('GH_TOKEN', 'ghp_xxxxx');
  // PropertiesService.getScriptProperties().setProperty('GOOGLE_CHAT_WEBHOOK', 'https://chat.googleapis.com/...');
  
  Logger.log('✅ Setup complete. Please set GH_TOKEN and GOOGLE_CHAT_WEBHOOK in Script Properties.');
}
