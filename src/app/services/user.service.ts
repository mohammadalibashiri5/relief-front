import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import {IUserResponse} from '../models/ResponseModel/userResponse';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<IUserResponse | null> = new BehaviorSubject<IUserResponse | null>(null);

  constructor(private loginService: LoginService,
              private router: Router) { }

  getUser(): Observable<IUserResponse | null> {
    return this.userSubject.asObservable();
  }

  fetchUser(): Observable<IUserResponse | null> {
    return this.loginService.getUser().pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
        },
        error: (err) => {
          this.clearUser();
        }
      }),
      catchError(() => of(null)) // Continue the observable chain even if there's an error
    );
  }

  setUser(user: IUserResponse): void {
    this.userSubject.next(user);
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  logout(): void {
    this.clearUser();
    this.router.navigate(['/login']).then(() => sessionStorage.removeItem('token'));
  }
}
