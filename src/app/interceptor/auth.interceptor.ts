import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Get token through AuthService
  const token = authService.getToken();

  // Clone request
  let authReq = req.clone();

  // Add authorization header if token exists
  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        authService.logout(); // Use AuthService's logout method

        router.navigate(['/login'], {
          queryParams: {
            sessionExpired: true,
            redirectUrl: router.url
          }
        });
      }
      return throwError(() => error);
    })
  );
};
