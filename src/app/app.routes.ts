import { Routes } from '@angular/router';
import { authGourdGuard } from './core/guards/authGuard/auth-guard-guard';
import { autoRedirectGuard } from './core/guards/autioRedirect/auto-redirect-guard';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
    },
    {
    path:'auth',
    loadComponent: () => import('./features/auth/auth-all/auth-all').then(m => m.AuthAll),
    canActivate:[autoRedirectGuard],
     children: [
      {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login').then(m => m.Login)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register').then(m => m.Register)
      }
    ]
    },
    {
        path: 'dashboard',
        loadComponent: () =>    import('./features/dashboard/dashboard').then(m => m.Dashbord),
        canActivate: [authGourdGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/dashboard/dashboard-home/dashboard-home').then(m => m.DashboardHome)
          },
          {
            path: 'teams',
            loadComponent: () =>
              import('./features/teams/team-list/teams-list/teams-list').then(m => m.TeamsList)
          },
        {
            path: 'teams/add',
            loadComponent: () =>
              import('./features/teams/addTeam/add-team/add-team').then(m => m.AddTeam)
          },
        {
            path: 'teams/:teamId/projects',
            loadComponent: () =>
              import('./features/projects/project-list/project-list/project-list').then(m => m.ProjectList)
        },
        {
            path: 'teams/:teamId/projects/add',
            loadComponent: () =>
              import('./features/projects/addProject/add-project/add-project').then(m => m.AddProject)
        },
      {
        path:'projects',
        loadComponent: ()=>
        import('./features/projects/project-list/project-list/project-list').then(m=>m.ProjectList)
      },
      {
        path:'projects/add',
        loadComponent: ()=>
        import('./features/projects/addProject/add-project/add-project').then(m=>m.AddProject)
      },
    {
      path:'teams/:teamId/add-member',
      loadComponent: ()=>
      import('./features/teams/addMember/add-member/add-member').then(m=>m.AddMember)
    },
    {
      path: 'projects/:projectId/tasks',
      loadComponent: () =>
        import('./features/tasks/task-list/task-list').then(m => m.TaskList)
    },
    {
      path: 'tasks',
      loadComponent: () =>
        import('./features/tasks/task-list/task-list').then(m => m.TaskList)
    }
  ]
    },
    {
        path: '**',
        redirectTo: ''
    }

];
