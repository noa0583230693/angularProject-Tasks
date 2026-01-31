import { Component, inject, input, computed, output, effect, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Task, TaskPriority, TaskRequest, TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {

  private fb = inject(FormBuilder);

  task = input<Task | null>(null);
  projectId = input<number>();
  
  /** ⬅️ אירועים לאבא */
  create = output<TaskRequest>();
  update = output<{ id: number; data: Partial<TaskRequest> }>();
  cancel = output<void>();

  isEditMode = computed(() => !!this.task());

  statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];
  priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];
  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    status: ['TODO' as TaskStatus, Validators.required],
    priority: ['MEDIUM' as TaskPriority, Validators.required], 
    assigneeId: [null as number | null],
  });
constructor() {
  
  effect(() => {
    const task = this.task();
    
    if (task) {
      this.form.patchValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assigneeId: typeof task.assigneeId === 'number' ? task.assigneeId : (task.assigneeId as any)?.id || null,
      });
    } else {
     this.form.reset();
    }
  });
}

  submit() {
  if (this.form.invalid) return;
  const rawValue = this.form.getRawValue();
  const payload = Object.fromEntries(
    Object.entries(rawValue).filter(([key, v]) => {
      // Keep assigneeId even if null, filter other fields
      if (key === 'assigneeId') return true;
      return v != null && v !== '';
    })
  );

  console.log('Form submit payload:', payload);
  if (this.isEditMode()) {
    this.update.emit({ id: this.task()!.id, data: payload });
  } else {
    this.create.emit({ ...payload, projectId: this.projectId() } as TaskRequest);
  }
}
}

