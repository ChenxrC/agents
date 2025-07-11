import express from 'express';
import { AgentManager } from './agentManager';

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

const manager = new AgentManager();

// 获取所有智能体
app.get('/agents', (req, res) => {
  res.json(manager.listAgents());
});

// 创建智能体
app.post('/agents', (req, res) => {
  const { role } = req.body;
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
  const task = manager.createTask(description);
  res.status(201).json(task);
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
}); 