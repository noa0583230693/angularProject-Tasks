import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../../environments/environments';
import { Task, TaskRequest } from '../../../models/task.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}
  private http=inject(HttpClient);
  private  baseUrl=`${API_URL}/tasks`;
  private tasksSubject=new BehaviorSubject<Task[]>([]);
  tasks$=this.tasksSubject.asObservable();

  private parseTask(task: any): Task {
    return {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
      updatedAt: task.updatedAt ? new Date(task.updatedAt) : new Date(),
    };
  }

  getTasks(projectId:number|null)
  {
    if(projectId!=null){
      const url=`${this.baseUrl}?projectId=${projectId}`;
      return this.http.get<Task[]>(url).pipe(
        tap(tasks=>{
          const parsed = tasks.map(t => this.parseTask(t));
          this.tasksSubject.next(parsed);
        })
      );
    } 
    return this.http.get<Task[]>(this.baseUrl).pipe(
      tap(tasks=>{
        const parsed = tasks.map(t => this.parseTask(t));
        this.tasksSubject.next(parsed);
      })
    );
  }

  createTask(task:TaskRequest)
  {
    return this.http.post<Task>(this.baseUrl,task).pipe(tap(newTask=>{
      const currentTasks=this.tasksSubject.getValue();
      const parsed = this.parseTask(newTask);
      this.tasksSubject.next([...currentTasks, parsed]);
    }));
  }
  updateTask(taskId:number,task:Partial<TaskRequest>)
  {
    const url=`${this.baseUrl}/${taskId}`;
    return this.http.patch<Task>(url,task).pipe(tap(updatedTask=>{
      const currentTasks=this.tasksSubject.getValue();
      const parsed = this.parseTask(updatedTask);
      const updatedTasks=currentTasks.map(t=>t.id === taskId ? parsed : t);
      this.tasksSubject.next(updatedTasks);
    }));
  }
  deleteTask(taskId:number)
  {
    const url=`${this.baseUrl}/${taskId}`;
    return this.http.delete<void>(url).pipe(tap(()=>{
      const currentTasks=this.tasksSubject.getValue();
      const updatedTasks=currentTasks.filter(t=>t.id!==taskId);
      this.tasksSubject.next(updatedTasks);
    }));
  }
}
