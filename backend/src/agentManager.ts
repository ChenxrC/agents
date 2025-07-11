import { Agent } from './agent';
import { Task } from './task';

export class AgentManager {
  private agents: Agent[] = [];
  private tasks: Task[] = [];

  createAgent(role: string): Agent {
    const agent = new Agent(role);
    this.agents.push(agent);
    return agent;
  }

  listAgents(): Agent[] {
    return this.agents;
  }

  createTask(description: string): Task {
    const task = new Task(description);
    this.tasks.push(task);
    // 分配给第一个可用智能体（演示用）
    if (this.agents.length > 0) {
      this.agents[0].runTask(task);
    }
    return task;
  }

  listTasks(): Task[] {
    return this.tasks;
  }
} 