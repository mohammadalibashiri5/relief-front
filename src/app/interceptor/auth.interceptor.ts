import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token');
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const authReq = req.clone({headers});
  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 403) {
        sessionStorage.removeItem('token');
        router.navigate(['/login'], {
          queryParams: {sessionExpired: true}
        }).then(()=>{});
      }
      return throwError(() => error);
    })
  );

};
