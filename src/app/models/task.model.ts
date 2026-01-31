import { title } from 'process';
import { User } from './user.model';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  projectId: number;
  assigneeId?: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface TaskRequest {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  projectId?: number;
  assigneeId?: number;
}

export type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'DONE';
export type TaskPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH';
