import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamsService } from '../../../../core/services/teamsService/teams-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team',
  imports: [ReactiveFormsModule],
  templateUrl: './add-team.html',
  styleUrl: './add-team.css',
})
export class AddTeam {
  private fb = inject(FormBuilder);
  private teamsService = inject(TeamsService);
  private router = inject(Router);
  
  isLoading = false;
  addTeamForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]]
  });

  onSubmit() {
    if (this.addTeamForm.valid) {
      const teamName = this.addTeamForm.get('name')?.value;
      this.isLoading = true;
      
      this.teamsService.createTeam(teamName!).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard/teams']);
        },
        error: (error) => {
          console.error('Failed to add team:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard/teams']);
  }
}
