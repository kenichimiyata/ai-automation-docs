---
layout: default
title: Architecture Diagrams
---

# 🏗️ Architecture Diagrams

## System Architecture - 全体構成

```mermaid
graph TB
    subgraph "Human Layer"
        Human[👤 Developer]
        Issue[📝 GitHub Issue]
    end
    
    subgraph "Automation Layer - GitHub"
        Actions[⚙️ GitHub Actions<br/>sync-issues.yml]
        Pages[📄 GitHub Pages<br/>Jekyll + Docs]
        Project[📊 GitHub Project #6<br/>9 Issues Management]
    end
    
    subgraph "Data Layer - Supabase"
        DB[(🗄️ PostgreSQL<br/>github_issues<br/>ai_responses<br/>ai_agent_state)]
        Realtime[⚡ Realtime<br/>WebSocket Sync]
        RLS[🔐 RLS<br/>17 Policies]
    end
    
    subgraph "AI Layer - VS Code"
        Bridge[🐍 Python Bridge<br/>SupabaseCopilotBridge.py]
        Copilot[🤖 VS Code Copilot<br/>AI Implementation]
        pyautogui[🖱️ pyautogui<br/>Automation]
    end
    
    subgraph "AI OS Layer - noVNC"
        Gateway[🖥️ noVNC Gateway<br/>AI Virtual Desktop]
        VNC[📺 VNC Server<br/>Remote Display]
        Desktop[💻 Linux Desktop<br/>VS Code + Terminal + Browser]
    end
    
    subgraph "Workflow Layer - n8n"
        n8n[🔄 n8n<br/>59 Workflows]
        External[🌐 External Services<br/>HuggingFace, Lambda, etc.]
    end
    
    Human -->|Create| Issue
    Issue -->|Webhook| Actions
    Actions -->|REST API| DB
    DB -->|Subscribe| Realtime
    Realtime -->|Notify| Bridge
    Bridge -->|Inject Command| Copilot
    Copilot -->|Response| Bridge
    Bridge -->|Write Back| DB
    
    Copilot -->|Control| pyautogui
    pyautogui -->|Automate| Gateway
    Gateway -->|VNC Protocol| VNC
    VNC -->|Render| Desktop
    
    DB -->|Trigger| n8n
    n8n -->|Integrate| External
    
    Pages -.->|Publish| Human
    Project -.->|Track| Issue
    RLS -.->|Secure| DB
    
    style Human fill:#e1f5ff
    style Issue fill:#fff3cd
    style Actions fill:#d4edda
    style DB fill:#f8d7da
    style Realtime fill:#f8d7da
    style Copilot fill:#d1ecf1
    style Gateway fill:#e7e8ea
    style n8n fill:#cce5ff
```

---

## Data Flow - Issue から完成まで

```mermaid
sequenceDiagram
    participant H as 👤 Human
    participant GH as GitHub
    participant GA as GitHub Actions
    participant SB as Supabase
    participant RT as Realtime
    participant BR as Python Bridge
    participant CP as VS Code Copilot
    participant NV as noVNC Gateway
    
    H->>GH: Create Issue #10
    GH->>GA: Trigger webhook (on: issues)
    GA->>SB: POST /rest/v1/github_issues
    SB->>RT: Broadcast INSERT event
    RT->>BR: Notify new issue
    
    BR->>CP: Inject to Chat
    Note over CP: AI analyzes Issue
    CP->>BR: Generate response
    BR->>SB: POST /rest/v1/ai_responses
    
    CP->>NV: Execute commands (pyautogui)
    NV->>NV: Open VS Code, run tests, commit code
    
    NV->>SB: Update agent_state
    SB->>RT: Broadcast UPDATE
    RT->>H: Show realtime progress
    
    Note over H,NV: System running 24/7
```

---

## noVNC Gateway Architecture - AI 用 OS

```mermaid
graph TB
    subgraph "Browser Layer"
        Browser[🌐 Web Browser<br/>Chrome, Firefox, etc.]
        noVNCClient[📱 noVNC Client<br/>JavaScript VNC Viewer]
    end
    
    subgraph "Gateway Layer"
        Gateway[🚪 noVNC Gateway<br/>WebSocket ↔ VNC Bridge]
        Auth[🔐 Authentication<br/>Token / Session]
    end
    
    subgraph "VNC Server Layer"
        VNCServer[📺 VNC Server<br/>TightVNC / TigerVNC]
        Xvfb[🖼️ Xvfb<br/>Virtual Framebuffer]
    end
    
    subgraph "Desktop Environment"
        DE[🖥️ Linux Desktop<br/>XFCE / LXDE]
        VSCode[💻 VS Code]
        Terminal[⌨️ Terminal]
        BrowserApp[🌐 Browser<br/>Chrome / Firefox]
    end
    
    subgraph "AI Control Layer"
        pyauto[🐍 pyautogui<br/>Mouse & Keyboard Control]
        Bridge2[🔗 Supabase Bridge<br/>Command Listener]
    end
    
    Browser -->|HTTPS/WSS| noVNCClient
    noVNCClient -->|WebSocket| Gateway
    Gateway -->|VNC Protocol| VNCServer
    VNCServer -->|Display| Xvfb
    Xvfb -->|Render| DE
    DE --> VSCode
    DE --> Terminal
    DE --> BrowserApp
    
    Bridge2 -->|Listen Realtime| Gateway
    pyauto -->|Automate| DE
    
    Auth -.->|Verify| Gateway
    
    style Browser fill:#e1f5ff
    style Gateway fill:#d4edda
    style VNCServer fill:#fff3cd
    style DE fill:#f8d7da
    style pyauto fill:#d1ecf1
```

**説明:**
- **Browser Layer**: 人間が見る画面（どこからでもアクセス可能）
- **Gateway Layer**: WebSocket と VNC の変換・認証
- **VNC Server**: リモートデスクトップのサーバー
- **Desktop Environment**: AI が操作する実際のデスクトップ
- **AI Control Layer**: Supabase からの指示を受けて自動操作

---

## Evolution Timeline - VirtualOffice から noVNC Gateway へ

```mermaid
timeline
    title bpmchat.com から AI Automation Platform への進化
    2013-2015 : VirtualOffice (人間用)
              : Google Meet + 画面共有
              : ビデオ会議・チャット
    2016-2020 : BPMS 統合
              : ProcessMaker + GAS + Lambda
              : SpreadSheet + JIRA
              : RPA (UiPath)
    2021-2023 : AI 実験
              : ChatGPT + Copilot
              : 対話的開発の萌芽
              : 統合地獄
    2024-2025 : AUTOCREATE
              : Supabase Realtime
              : SupabaseCopilotBridge.py
              : noVNC Gateway 発見 💡
    2026 : AI Automation Platform
         : GitHub Issue 駆動
         : noVNC = AI 専用 OS
         : AI がリモートワーカーに
```

---

## Tech Stack Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | GitHub Pages (Jekyll) | Documentation |
| **Issue Tracking** | GitHub Issues + Project #6 | Task Management |
| **Pipeline** | GitHub Actions | Automation |
| **Database** | Supabase PostgreSQL | Data Storage |
| **Realtime** | Supabase Realtime | WebSocket Sync |
| **Security** | Row Level Security (RLS) | Access Control |
| **AI Interface** | VS Code Copilot | AI Implementation |
| **Bridge** | Python (pyautogui) | Automation |
| **AI OS** | noVNC Gateway | Virtual Desktop |
| **Workflow** | n8n | External Integration |
| **Visualization** | dhtmlx, Mermaid | BPMN Diagrams |

---

[← Back to Docs](index)
