import express from 'express';
import { AgentManager } from './agentManager';
import { config } from './config';

const app = express();
const port = config.server.port;
app.use(express.json());

const manager = new AgentManager();

// 获取所有智能体
app.get('/agents', (req, res) => {
  res.json(manager.listAgents());
});

// 创建智能体
app.post('/agents', (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ error: '角色不能为空' });
  }
  const agent = manager.createAgent(role);
  res.status(201).json(agent);
});

// 获取所有任务
app.get('/tasks', (req, res) => {
  res.json(manager.listTasks());
});

// 创建任务
app.post('/tasks', async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: '任务描述不能为空' });
  }
  const task = manager.createTask(description);
  res.status(201).json(task);
});

// 获取系统状态
app.get('/status', (req, res) => {
  res.json(manager.getSystemStatus());
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    config: {
      openaiConfigured: !!config.openai.apiKey,
      mcpEnabled: config.mcp.enabled
    }
  });
});

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('服务器错误:', err);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(port, () => {
  console.log(`🚀 多智能体后端服务启动成功！`);
  console.log(`📍 服务地址: http://localhost:${port}`);
  console.log(`🔧 OpenAI配置: ${config.openai.apiKey ? '✅ 已配置' : '❌ 未配置'}`);
  console.log(`🔧 MCP服务: ${config.mcp.enabled ? '✅ 已启用' : '❌ 未启用'}`);
  console.log(`📊 健康检查: http://localhost:${port}/health`);
}); 