import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../models/RequestModel/userModel';
import {AuthenticationResponse} from '../models/ResponseModel/authenticationResponse';
import {IUserResponse} from '../models/ResponseModel/userResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:8080";


  constructor(private http: HttpClient) {
  }


  loginUser(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.url}/auth/login`, {email: email, password: password});
  }


  getUser(): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`${this.url}/api/users/getUser`)
  }

  isLoggedIn():boolean {
    return sessionStorage.getItem('token') != null;
  }
}
