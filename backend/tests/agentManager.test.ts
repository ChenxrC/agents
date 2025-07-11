import { AgentManager } from '../src/agentManager';

describe('AgentManager', () => {
  it('creates agents and tasks', async () => {
    const manager = new AgentManager();
    const agent = manager.createAgent('搜索者');
    expect(agent.role).toBe('搜索者');

    const task = manager.createTask('爬取网页');
    expect(task.description).toBe('爬取网页');

    // 等待任务完成
    await new Promise((r) => setTimeout(r, 1100));
    expect(task.status).toBe('done');
    expect(task.result).toBeDefined();
  });
}); 