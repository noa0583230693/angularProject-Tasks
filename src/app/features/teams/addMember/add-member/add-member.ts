import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserRole } from '../../../../models/user.model';
import { TeamsService } from '../../../../core/services/teamsService/teams-service';

@Component({
  selector: 'app-add-member',
  imports: [ReactiveFormsModule],
  templateUrl: './add-member.html',
  styleUrl: './add-member.css',
})
export class AddMember {
  private teamId!: number;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private teamsService = inject(TeamsService);

  roles: UserRole[] = ['ADMIN', 'MEMBER'];
  isLoading = false;

  formAddMember = this.fb.group({
    id: [0, [Validators.required]],
    role: ['', [Validators.required]]
  });

  ngOnInit(): void {
    const teamParamsId = this.route.snapshot.paramMap.get('teamId')!;
    if (teamParamsId) {
      this.teamId = Number(teamParamsId);
    }
  }

  onSubmit(): void {
    if (this.formAddMember.valid) {
      // this.isLoading = true;
      const userId = this.formAddMember.value.id!;
      const role = this.formAddMember.value.role;

      this.teamsService.addMemberToTeam(this.teamId, userId).subscribe({
        next: (response) => {
          // this.isLoading = false;
          this.router.navigate([`/dashboard/teams`]);
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
    }
  }
}
