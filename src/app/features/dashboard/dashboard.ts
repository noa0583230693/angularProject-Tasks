import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Auth } from '../../core/services/authService/auth';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { TeamsList } from "../teams/team-list/teams-list/teams-list";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashbord',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatToolbarModule, MatButtonModule, MatTooltipModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashbord {
  private authService: Auth = inject(Auth);
  private router: Router = inject(Router);
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

