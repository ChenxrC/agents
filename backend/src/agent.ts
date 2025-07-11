import { v4 as uuidv4 } from 'uuid';
import { Task } from './task';

export class Agent {
  public readonly id: string;
  public tasks: Task[] = [];

  constructor(public role: string) {
    this.id = uuidv4();
  }

  async runTask(task: Task): Promise<Task> {
    task.status = 'running';
    // 模拟执行耗时
    await new Promise((resolve) => setTimeout(resolve, 1000));
    task.status = 'done';
    task.result = `任务由角色 ${this.role} 的智能体 ${this.id} 完成`;
    return task;
  }
} 