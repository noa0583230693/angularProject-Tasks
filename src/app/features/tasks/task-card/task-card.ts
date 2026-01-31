import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../../models/task.model';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe, MatCardModule, MatButtonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCard {
  task = input.required<Task>();

  delete = output<number>();
  edit = output<Task>();

  onDelete() {
    this.delete.emit(this.task().id);
  }

  onEdit() {
    this.edit.emit(this.task());
  }
}
