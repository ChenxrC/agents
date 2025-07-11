# 多智能体构建应用

该项目演示如何快速搭建一个支持自定义智能体与任务执行的全栈应用。用户可以在前端界面创建不同角色的智能体，并为其分配任务，后端会管理智能体生命周期并执行任务。

## 🚀 核心功能

### 智能体系统
- **多角色智能体**: 支持数据分析师、搜索专家、程序员、设计师、研究员等角色
- **智能任务分配**: 根据任务类型和智能体能力自动分配最合适的智能体
- **AI驱动执行**: 集成OpenAI API，实现真正的AI任务执行
- **MCP工具调用**: 支持Model Context Protocol，可调用外部工具和服务

### 任务管理
- **智能分析**: 自动识别任务类型（搜索、分析、编程、设计等）
- **实时执行**: 任务状态实时更新，支持pending、running、done状态
- **结果展示**: 详细的任务执行结果和报告

### 技术架构
- **前端**: React + TypeScript + Vite，现代化UI设计
- **后端**: Express + TypeScript，RESTful API
- **AI集成**: OpenAI GPT模型，支持自然语言理解和生成
- **工具调用**: MCP协议，支持外部服务集成

## 📁 目录结构

```
├── backend        # Express + TypeScript 后端服务
│   ├── src
│   │   ├── services/         # 服务层
│   │   │   ├── openaiService.ts    # OpenAI API服务
│   │   │   └── mcpService.ts       # MCP工具调用服务
│   │   ├── agent.ts          # 智能体实体（增强版）
│   │   ├── agentManager.ts   # 智能体与任务管理器（增强版）
│   │   ├── task.ts           # 任务实体
│   │   ├── config.ts         # 配置管理
│   │   └── index.ts          # 入口文件
│   ├── tests                 # Jest 单元测试
│   ├── env.example           # 环境变量示例
│   ├── tsconfig.json
│   └── package.json
├── frontend       # React + Vite 前端应用
│   ├── src
│   │   ├── components        # 界面组件
│   │   ├── App.tsx
│   │   ├── App.css           # 现代化样式
│   │   └── main.tsx
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
├── shared         # 预留共享代码
├── package.json   # 顶层工作区
└── README.md
```

## 🛠️ 快速开始

### 1. 环境配置

复制环境变量示例文件：
```bash
cd backend
cp env.example .env
```

编辑 `.env` 文件，配置必要的API密钥：
```env
# OpenAI配置（必需）
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo

# MCP服务配置（可选）
MCP_ENABLED=false
MCP_SERVER_URL=http://localhost:3001

# 服务器配置
PORT=4000
```

### 2. 安装依赖

```bash
npm run install:all
```

### 3. 启动开发环境

```bash
npm run dev
```

其中：
- 后端服务默认运行在 `http://localhost:4000`
- 前端 Vite 服务运行在 `http://localhost:5173`，并通过代理与后端通信

### 4. 运行测试

```bash
npm test
```

## 🎯 使用指南

### 创建智能体
1. 在前端界面输入智能体角色（如：数据分析师、搜索专家、程序员等）
2. 点击"创建智能体"按钮
3. 系统会根据角色自动分配相应的能力

### 分配任务
1. 在任务面板输入任务描述
2. 系统会自动分析任务类型并分配给最合适的智能体
3. 实时查看任务执行状态和结果

### 支持的任务类型
- **搜索任务**: 包含"搜索"、"查找"、"查询"等关键词
- **分析任务**: 包含"分析"、"统计"、"报告"等关键词  
- **编程任务**: 包含"代码"、"编程"、"开发"等关键词
- **设计任务**: 包含"设计"、"图片"、"图像"等关键词

## 🔧 核心概念

### 1. Agent（智能体）
每个智能体拥有：
- 特定角色（数据分析师、搜索专家等）
- 独特的能力配置
- AI驱动的任务执行能力
- MCP工具调用支持

### 2. Task（任务）
任务包含：
- 描述信息
- 执行状态（pending/running/done）
- 执行结果
- 智能分配机制

### 3. AgentManager（智能体管理器）
负责：
- 智能体生命周期管理
- 智能任务分配算法
- 系统状态监控
- 任务执行协调

### 4. MCP集成
支持的工具调用：
- 网络搜索
- 文件读写
- 代码执行
- 数据库查询
- 图像生成

## 🚀 后续可扩展方向

- **WebSocket实时通信**: 向前端推送实时任务进度
- **队列系统**: 引入BullMQ、RabbitMQ进行复杂任务调度
- **多模型支持**: 集成Claude、Gemini等其他AI模型
- **数据持久化**: 接入PostgreSQL、MongoDB等数据库
- **权限系统**: 实现用户认证和角色权限管理
- **插件系统**: 支持自定义工具和能力的插件机制
- **协作机制**: 多智能体协作完成复杂任务
- **监控告警**: 任务执行监控和异常告警

## 📊 API接口

### 智能体管理
- `GET /agents` - 获取所有智能体
- `POST /agents` - 创建新智能体

### 任务管理  
- `GET /tasks` - 获取所有任务
- `POST /tasks` - 创建新任务

### 系统监控
- `GET /status` - 获取系统状态
- `GET /health` - 健康检查

---

🎉 祝你使用愉快！如有问题，请查看控制台日志或提交Issue。 