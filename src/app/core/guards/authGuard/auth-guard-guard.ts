import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/authService/auth';

export const authGourdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = sessionStorage.getItem('user');

  if (user) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};

