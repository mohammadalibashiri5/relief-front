import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from './services/login.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Allow navigation
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; // Block navigation
  }};
