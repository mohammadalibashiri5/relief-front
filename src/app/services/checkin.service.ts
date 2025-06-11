import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CheckInResponse} from '../models/ResponseModel/CheckInResponse';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  private apiUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  performCheckin(addictionName: string, isClean: boolean): Observable<CheckInResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    const params = new HttpParams()
      .set('addictionName', addictionName)
      .set('isClean', isClean.toString()); // Convert boolean to string

    console.log(`Request URL: ${this.apiUrl}/register?${params.toString()}`);

    // ✅ Correct way: Attach query params directly in the URL
    return this.http.post<CheckInResponse>(`${this.apiUrl}/register?${params.toString()}`, null, { headers });
  }
}
