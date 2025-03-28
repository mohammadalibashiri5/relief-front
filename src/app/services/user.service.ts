import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUserResponse} from '../models/ResponseModel/userResponse';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<IUserResponse | null> = new BehaviorSubject<IUserResponse | null>(null);

  constructor(private loginService: LoginService) {
    this.fetchUser(); // 🔥 Fetch user immediately on service initialization
  }
  fetchUser(): void {
    this.loginService.getUser().subscribe({
      next: (user) => {
        this.userSubject.next(user);
      },
      error: (err) => {
      }
    });
  }

  // Get the current user observable (this can be used in other components)
  getUser(): Observable<IUserResponse | null> {
    return this.userSubject.asObservable();
  }

  // Set the user data (to be called when you fetch the user data)
  setUser(user: IUserResponse): void {
    this.userSubject.next(user);
  }

  // Optionally, you can clear the user (for example, on logout)
  clearUser(): void {
    this.userSubject.next(null);
  }
}
