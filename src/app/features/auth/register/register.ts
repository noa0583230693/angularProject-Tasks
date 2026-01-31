import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/authService/auth';
import { RegisterRequest } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor() {}
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  onSubmit() {
    if (this.registerForm.valid) {
      const registerRequest: RegisterRequest = this.registerForm.value as RegisterRequest;
      this.authService.register(registerRequest).subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard']);
        },  
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
  }

}
