import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ProjectService } from '../../../../core/services/projectsService/project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Project } from '../../../../models/project.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-project-list',
  imports: [AsyncPipe, DatePipe, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectList {
  teamId: number | null = null;
  private cameFromTeam: boolean = false;
  private projectsService = inject(ProjectService);
  projects$!: Observable<Project[]>;
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe();
    const teamParamsId = this.route.snapshot.paramMap.get('teamId');
    this.teamId = teamParamsId ? Number(teamParamsId) : null;
    this.cameFromTeam = !!this.teamId;

    this.projects$ = this.projectsService.projects$.pipe(
      map(projects => {
        if (this.cameFromTeam) {
          return projects.filter(p => {
            const pTeamId = p.teamId ?? (p as any).team_id;
            return Number(pTeamId) === this.teamId;
          });
        }
        return projects;
      })
    );
  }

  goToAddProject(): void {
    if (this.teamId) {
      this.router.navigate([`/dashboard/teams/${this.teamId}/projects/add`]);
    }
  }

  viewProjectTasks(projectId: number): void {
    this.router.navigate([`/dashboard/projects/${projectId}/tasks`]);
  }

  isCameFromTeam(): boolean {
    return this.cameFromTeam;
  }
}

