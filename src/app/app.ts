import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Login } from "./features/auth/login/login";
import { Register } from "./features/auth/register/register";
import { Dashbord } from "./features/dashboard/dashboard";
import { AddProject } from './features/projects/addProject/add-project/add-project';
import { AddTeam } from './features/teams/addTeam/add-team/add-team';
import { TaskCard } from './features/tasks/task-card/task-card';
import { TaskFormComponent } from './features/tasks/task-form/task-form';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
