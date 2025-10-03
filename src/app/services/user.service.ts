import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import {IUserResponse} from '../models/ResponseModel/userResponse';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<IUserResponse | null> = new BehaviorSubject<IUserResponse | null>(null);

  constructor(private loginService: AuthService,
              private router: Router) { }

  fetchUser(): Observable<IUserResponse | null> {
    return this.loginService.getUser().pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
        },
        error: () => {
          this.clearUser();
        }
      }),
      catchError(() => of(null))
    );
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  logout(): void {
    this.clearUser();
    this.router.navigate(['/login']).then(() => sessionStorage.removeItem('token'));
  }

  deleteUser() {
    return this.loginService.deleteAccount().pipe(
      tap(() => this.clearUser())
    );

  }
}
