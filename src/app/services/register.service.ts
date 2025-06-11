import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient) {
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>(`/users/check-username?username=${username}`);
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<boolean>(`/users/check-email?email=${email}`);
  }

}
