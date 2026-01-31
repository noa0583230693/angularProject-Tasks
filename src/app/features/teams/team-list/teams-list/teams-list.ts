import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Team } from '../../../../models/team.model';
import { TeamsService } from '../../../../core/services/teamsService/teams-service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-teams-list',
  imports: [AsyncPipe, DatePipe, MatButtonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './teams-list.html',
  styleUrl: './teams-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsList {
  private teamsService = inject(TeamsService);
  private router = inject(Router);
  teams$: Observable<Team[]> = this.teamsService.teams$;

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe();
  }

  goToAddTeam() {
    this.router.navigate(['/dashboard/teams/add']);
  }

  viewTeamDetails(teamId: number) {
    this.router.navigate([`/dashboard/teams/${teamId}/projects`]);
  }

  addMember(teamId: number) {
    this.router.navigate([`/dashboard/teams/${teamId}/add-member`]);
  }
}
