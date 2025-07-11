# 多智能体构建应用

该项目演示如何快速搭建一个支持自定义智能体与任务执行的全栈应用。用户可以在前端界面创建不同角色的智能体，并为其分配任务，后端会管理智能体生命周期并执行任务。

## 目录结构

```
├── backend        # Express + TypeScript 后端服务
│   ├── src
│   │   ├── agent.ts          # 智能体实体
│   │   ├── agentManager.ts   # 智能体与任务管理器
│   │   ├── task.ts           # 任务实体
│   │   └── index.ts          # 入口文件
│   ├── tests                 # Jest 单元测试
│   ├── tsconfig.json
│   └── package.json
├── frontend       # React + Vite 前端应用
│   ├── src
│   │   ├── components        # 界面组件
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
├── shared         # 预留共享代码
├── package.json   # 顶层工作区
└── README.md
```

## 快速开始

### 1. 安装依赖

```bash
npm run install:all
```

### 2. 启动开发环境

```bash
npm run dev
```

其中：
- 后端服务默认运行在 `http://localhost:4000`。
- 前端 Vite 服务运行在 `http://localhost:5173`，并通过代理与后端通信。

### 3. 运行测试

```bash
npm test
```

## 核心概念

1. **Agent（智能体）**  
   每个智能体拥有一个角色与独立 ID，可接收并执行任务。

2. **Task（任务）**  
   任务包含描述、状态与结果。状态包括 `pending`、`running`、`done`。

3. **AgentManager（智能体管理器）**  
   负责创建智能体、管理任务队列，并简单地将任务分配给第一个可用智能体（演示用，可扩展为更复杂的调度策略）。

## 后续可扩展方向

- 使用 WebSocket 向前端推送实时任务进度
- 引入队列系统（如 BullMQ、RabbitMQ）进行更复杂的任务调度
- 将智能体逻辑替换为真正的 AI 推理或外部 API 调用
- 数据持久化：接入数据库如 PostgreSQL / MongoDB
- 角色能力与权限系统

---

祝你玩得愉快！ 