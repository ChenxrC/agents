import { Agent } from './agent';
import { Task } from './task';

export class AgentManager {
  private agents: Agent[] = [];
  private tasks: Task[] = [];

  createAgent(role: string): Agent {
    const agent = new Agent(role);
    this.agents.push(agent);
    console.log(`创建智能体: ${role} (${agent.id})`);
    return agent;
  }

  listAgents(): Agent[] {
    return this.agents;
  }

  createTask(description: string): Task {
    const task = new Task(description);
    this.tasks.push(task);
    
    // 智能分配任务给最合适的智能体
    const bestAgent = this.findBestAgentForTask(description);
    if (bestAgent) {
      console.log(`任务 "${description}" 分配给智能体: ${bestAgent.role}`);
      bestAgent.runTask(task);
    } else {
      console.warn('没有找到合适的智能体执行任务');
    }
    
    return task;
  }

  listTasks(): Task[] {
    return this.tasks;
  }

  private findBestAgentForTask(taskDescription: string): Agent | null {
    if (this.agents.length === 0) {
      return null;
    }

    const lowerDescription = taskDescription.toLowerCase();
    let bestAgent: Agent | null = null;
    let bestScore = 0;

    for (const agent of this.agents) {
      const score = this.calculateTaskAgentMatch(taskDescription, agent);
      if (score > bestScore) {
        bestScore = score;
        bestAgent = agent;
      }
    }

    return bestAgent;
  }

  private calculateTaskAgentMatch(taskDescription: string, agent: Agent): number {
    const lowerDescription = taskDescription.toLowerCase();
    let score = 0;

    // 根据智能体角色匹配
    const roleKeywords: { [key: string]: string[] } = {
      '数据分析师': ['分析', '数据', '统计', '报告', 'excel', 'csv', 'database'],
      '搜索专家': ['搜索', '查找', '查询', '获取', '爬取', '收集', 'research'],
      '程序员': ['代码', '编程', '开发', '脚本', '程序', 'api', 'debug'],
      '设计师': ['设计', '图片', '图像', '生成', 'ui', 'ux', 'visual'],
      '研究员': ['研究', '调查', '分析', '报告', '总结', 'research']
    };

    const agentRole = agent.role.toLowerCase();
    const keywords = roleKeywords[agentRole] || [];
    
    for (const keyword of keywords) {
      if (lowerDescription.includes(keyword)) {
        score += 2;
      }
    }

    // 根据智能体能力匹配
    if (agent.capabilities.canSearch && this.containsSearchKeywords(lowerDescription)) {
      score += 3;
    }
    if (agent.capabilities.canAnalyze && this.containsAnalysisKeywords(lowerDescription)) {
      score += 3;
    }
    if (agent.capabilities.canCode && this.containsCodeKeywords(lowerDescription)) {
      score += 3;
    }
    if (agent.capabilities.canGenerateImages && this.containsImageKeywords(lowerDescription)) {
      score += 3;
    }

    return score;
  }

  private containsSearchKeywords(description: string): boolean {
    const keywords = ['搜索', '查找', '查询', '获取', '爬取', '收集', 'research', 'search', 'find'];
    return keywords.some(keyword => description.includes(keyword));
  }

  private containsAnalysisKeywords(description: string): boolean {
    const keywords = ['分析', '统计', '报告', '总结', '评估', 'analyze', 'analysis', 'report', 'summary'];
    return keywords.some(keyword => description.includes(keyword));
  }

  private containsCodeKeywords(description: string): boolean {
    const keywords = ['代码', '编程', '开发', '脚本', '程序', 'code', 'program', 'script', 'develop'];
    return keywords.some(keyword => description.includes(keyword));
  }

  private containsImageKeywords(description: string): boolean {
    const keywords = ['图片', '图像', '生成', '设计', 'image', 'picture', 'generate', 'design'];
    return keywords.some(keyword => description.includes(keyword));
  }

  // 获取系统状态
  getSystemStatus() {
    return {
      totalAgents: this.agents.length,
      totalTasks: this.tasks.length,
      completedTasks: this.tasks.filter(t => t.status === 'done').length,
      runningTasks: this.tasks.filter(t => t.status === 'running').length,
      pendingTasks: this.tasks.filter(t => t.status === 'pending').length,
      agents: this.agents.map(agent => ({
        id: agent.id,
        role: agent.role,
        capabilities: agent.capabilities,
        taskCount: agent.tasks.length
      }))
    };
  }
} 