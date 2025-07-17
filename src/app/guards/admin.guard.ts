import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  const router:Router = inject(Router);
  const toastr:ToastrService = inject(ToastrService);

  if (authService.isAuthenticated() && authService.hasRole('ROLE_ADMIN')) {
    return true;
  } else {
    router.navigate(['/unauthorized'], { queryParams: { returnUrl: state.url } }).then(() => { toastr.error('You are not authorized to view this page');
    });
    return false;
  }
};
