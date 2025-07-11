import { v4 as uuidv4 } from 'uuid';

export type TaskStatus = 'pending' | 'running' | 'done';

export class Task {
  public readonly id: string;
  public status: TaskStatus = 'pending';
  public result?: string;

  constructor(public description: string) {
    this.id = uuidv4();
  }
} 