import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../services/authService/auth';
import { inject } from '@angular/core';

export const interceptorAllInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  let  clonedReq = req;
  const authService = inject(Auth);

  if (req.url.includes('/auth') ) {
  return next(req);
}
  if (token) {
     clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
    return next(clonedReq).pipe(catchError((error:HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);

    }));

  
};
