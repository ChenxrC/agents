import { AgentManager } from '../src/agentManager';

describe('AgentManager', () => {
  it('creates agents and tasks with intelligent assignment', async () => {
    const manager = new AgentManager();
    
    // 创建不同类型的智能体
    const analyst = manager.createAgent('数据分析师');
    const searcher = manager.createAgent('搜索专家');
    const programmer = manager.createAgent('程序员');
    
    expect(analyst.role).toBe('数据分析师');
    expect(searcher.role).toBe('搜索专家');
    expect(programmer.role).toBe('程序员');

    // 创建不同类型的任务
    const analysisTask = manager.createTask('分析用户数据并生成报告');
    const searchTask = manager.createTask('搜索最新的AI技术发展');
    const codeTask = manager.createTask('编写一个Python脚本来处理数据');

    expect(analysisTask.description).toBe('分析用户数据并生成报告');
    expect(searchTask.description).toBe('搜索最新的AI技术发展');
    expect(codeTask.description).toBe('编写一个Python脚本来处理数据');

    // 等待任务完成
    await new Promise((r) => setTimeout(r, 2000));
    
    // 验证任务状态
    const tasks = manager.listTasks();
    expect(tasks.length).toBe(3);
    
    // 验证系统状态
    const status = manager.getSystemStatus();
    expect(status.totalAgents).toBe(3);
    expect(status.totalTasks).toBe(3);
  });

  it('handles empty agent list gracefully', () => {
    const manager = new AgentManager();
    const task = manager.createTask('测试任务');
    
    expect(task.status).toBe('pending');
    expect(manager.getSystemStatus().totalAgents).toBe(0);
  });
}); 