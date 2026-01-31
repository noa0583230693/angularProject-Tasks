import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/authService/auth';
import { LoginRequest } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
 private router = inject(Router);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value as LoginRequest;
      this.authService.login(loginRequest).subscribe({
        next: (response) => {

          
          this.router.navigate(['/dashboard']).then(success => {
          }).catch(err => {
          });
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }
  

}
