import {inject, Injectable, signal} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {IUserResponse} from '../models/ResponseModel/userResponse';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = signal<IUserResponse | null>(null);

  private readonly loginService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  constructor() {
    this.fetchUser().subscribe();
  }

  fetchUser(): Observable<IUserResponse | null> {
    return this.loginService.getUser().pipe(
      tap((user) => this.user.set(user)), // Set the signal directly
      catchError(() => {
        this.clearUser();
        return of(null);
      })
    );
  }

  clearUser(): void {
    this.user.set(null); // Update the signal!
    sessionStorage.removeItem('token'); // Clear storage here to be safe
  }

  logout(): void {
    this.clearUser();
    this.router.navigate(['/login']);
  }

  deleteUser(): Observable<any> {
    return this.loginService.deleteAccount().pipe(
      tap(() => this.logout()) // Re-use logout to clear state and redirect
    );
  }
}
