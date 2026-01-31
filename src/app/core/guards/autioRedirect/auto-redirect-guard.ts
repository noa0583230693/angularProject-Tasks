import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const autoRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = sessionStorage.getItem('user');

  if (user) {
    // If user is already logged in, redirect to dashboard
    return router.createUrlTree(['/dashboard']);
  }

  // Allow access to auth page if not logged in
  return true;
};
