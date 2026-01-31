import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHome {}
