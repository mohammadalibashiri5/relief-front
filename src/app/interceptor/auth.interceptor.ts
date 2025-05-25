import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Add auth token and content-type
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const authReq = req.clone({ headers });
    return next(authReq);
  };
