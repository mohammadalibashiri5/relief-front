import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddictionRequest} from '../models/RequestModel/addictionRequest';
import {Observable} from 'rxjs';
import {CheckInResponse} from '../models/ResponseModel/CheckInResponse';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private http: HttpClient) {}

  private readonly url = "http://localhost:8080";

  performCheckin(checkin:CheckInResponse): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.url}/api/checkin`,checkin, {headers: headers})
  }
}
