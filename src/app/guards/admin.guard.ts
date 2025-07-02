import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService:LoginService = inject(LoginService);
  const router:Router = inject(Router);
  const toastr:ToastrService = inject(ToastrService);

  if (authService.isAuthenticated() && authService.hasRole('ROLE_ADMIN')) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } }).then(() => { toastr.error('You have to log in first');
    });
    return false; // Block navigation
  }
};
