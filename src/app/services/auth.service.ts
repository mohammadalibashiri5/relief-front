import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {IUserResponse} from '../models/ResponseModel/userResponse';
import {environment} from '../../environments/environment';

interface UserInfo {
  email: string;
  roles: string[];
}
interface JwtPayload {
  sub: string;        // User identifier (email/username)
  iat?: number;       // Issued at timestamp
  exp?: number;       // Expiration timestamp
  roles: string;      // Array of role strings
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = environment.API_BASE_URL;

  private tokenKey = 'jwt_token';
  private userKey = 'current_user';

  constructor(private http: HttpClient, private router: Router) {}


  loginUser(email: string, password: string): Observable<string> {
    return this.http.post<string>(
      `${this.url}/auth/login`,
      { email, password },
      { responseType: 'text' as 'json' }
    ).pipe(
      tap((token: string) => {
        this.storeToken(token);
        this.storeUserInfo(token);
      })
    );
  }

  private decodeTokenPayload(token: string): JwtPayload | null {
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      return JSON.parse(payloadJson) as JwtPayload;
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private storeUserInfo(token: string): void {
    const payload = this.decodeTokenPayload(token);
    if (payload) {
      const userInfo = {
        email: payload.sub,
        // Split the roles string into an array
        roles: payload.roles.split(',').map(role => role.trim())
      };
      localStorage.setItem(this.userKey, JSON.stringify(userInfo));
    }
  }

  getCurrentUser(): UserInfo | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles ? user.roles.includes(role) : false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']).then(() => {});
  }

  getUser(): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`${this.url}/users/getUser`)
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.url}/users/deleteUser`);
  }

  //isLoggedIn():boolean {
  //  return sessionStorage.getItem('token') != null;
  //}
}
