import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {TriggerResponse} from '../models/ResponseModel/triggerResponse';
import {TriggerRequest} from '../models/RequestModel/triggerRequest';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  private apiUrl = 'http://localhost:8080/api/trigger';
  constructor(private http:HttpClient) { }

  createTrigger(addictionName: string, trigger: TriggerRequest): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const params = new HttpParams()
      .set('addictionName', addictionName);

    // Combine headers and params into a single options object
    const options = {
      headers: headers,
      params: params
    };

    return this.http.post(`${this.apiUrl}/add`, trigger, options).pipe(
      tap(response => {
        console.log('Trigger created successfully:', response);
      }),
      catchError(error => {
        console.error('Error creating trigger:', error);
        return throwError(() => error);
      })
    );
  }


  fetchTriggers(): Observable<TriggerResponse[]> {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get<TriggerResponse[]>(`${this.apiUrl}/getAll`, {headers}).pipe(
      tap(response => {
        console.log('Triggers fetched successfully:', response);
      }),
      catchError(error => {
        console.error('Error fetching triggers:', error);
        return throwError(() => error);
      })
    );
  }
}
