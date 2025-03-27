import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CheckInResponse} from '../models/ResponseModel/CheckInResponse';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  private apiUrl = 'http://localhost:8080/api/checkin'; // Adjust based on your backend endpoint

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
