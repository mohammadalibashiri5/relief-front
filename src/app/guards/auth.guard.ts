import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);
  const router:Router = inject(Router);
  const toastr:ToastrService = inject(ToastrService);

  if (authService.isAuthenticated() && authService.hasRole('ROLE_VISITOR')) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } }).then(() => { toastr.error('You have to log in first');});
    return false; // Block navigation
  }};
