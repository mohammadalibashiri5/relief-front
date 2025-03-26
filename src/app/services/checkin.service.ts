import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CheckInResponse} from '../models/ResponseModel/CheckInResponse';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  private apiUrl = 'http://localhost:8080/api/checkin'; // Adjust based on your backend endpoint

  constructor(private http: HttpClient) {}

  performCheckin(username: string, addictionName: string, isClean: boolean): Observable<CheckInResponse> {
    return this.http.post<CheckInResponse>(`${this.apiUrl}/register`, {
      username,
      addictionName,
      isClean
    });
  }
}
