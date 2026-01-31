import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../core/services/tasksService/task-service';
import { TaskCard } from '../task-card/task-card';
import { TaskFormComponent } from "../task-form/task-form";
import { Task, TaskRequest } from '../../../models/task.model';
import { ListComments } from '../../comments/list-comments/list-comments';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe, TaskCard, TaskFormComponent, ListComments, MatButtonModule, MatTooltipModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskList {
  projectId: number | null = null;
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;
  cameFromProject = signal<boolean>(false);
  showForm = signal(false);
  editingTask = signal<Task | null>(null);
  openedCommentsTaskId = signal<number | null>(null);

  ngOnInit() {
    const projectIdParam = this.route.snapshot.paramMap.get('projectId');
    this.projectId = projectIdParam ? Number(projectIdParam) : null;
    this.cameFromProject.set(!!this.projectId);
    this.taskService.getTasks(this.projectId).subscribe();
  }

  onEditTask(task: Task) {
    this.editingTask.set(task);
    this.showForm.set(true);
  }

  openAddForm() {
    this.editingTask.set(null);
    this.showForm.set(true);
  }

  createTask(req: TaskRequest) {
    this.taskService.createTask(req).subscribe(() => {
      this.closeForm();
    });
  }

  updateTask(event: { id: number; data: Partial<TaskRequest> }) {
    this.taskService.updateTask(event.id, event.data).subscribe(() => {
      this.closeForm();
    });
  }

  closeForm() {
    this.showForm.set(false);
    this.editingTask.set(null);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
      },
      error: err => {
        console.error('Delete failed', err);
      }
    })
  }

  openComments(taskId: number) {
    this.openedCommentsTaskId.set(taskId);
  }

  closeComments() {
    this.openedCommentsTaskId.set(null);
  }
}

