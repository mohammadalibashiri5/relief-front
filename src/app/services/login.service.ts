import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../models/user.model';
import {AuthenticationResponse} from '../models/authenticationResponse';

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

  isNotLoggedIn(): boolean {
    return !sessionStorage.getItem('token');
  }


  getUser(): Observable<IUser> {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    })
    return this.http.get<IUser>(`${this.url}/api/users/getUser`, {headers: headers})
  }
}
