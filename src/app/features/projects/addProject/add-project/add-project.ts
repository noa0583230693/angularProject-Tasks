import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../../core/services/projectsService/project-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectRequest } from '../../../../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  
  teamId: number | null = null;
  isLoading = false;
  
  addProjectForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(500)]]
  });

  ngOnInit(): void {
    const teamParamId = this.route.snapshot.paramMap.get('teamId');
    this.teamId = teamParamId ? Number(teamParamId) : null;
  }

  onSubmit(): void {
    if (this.addProjectForm.valid) {
      const projectData = {
        ...this.addProjectForm.value,
        teamId: this.teamId
      };
      this.isLoading = true;
      
      this.projectService.createProject(projectData as ProjectRequest).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.goBack();
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.goBack();
  }

  private goBack(): void {
    if (this.teamId) {
      this.router.navigate([`/dashboard/teams/${this.teamId}/projects`]);
    } else {
      this.router.navigate(['/dashboard/projects']);
    }
  }
}