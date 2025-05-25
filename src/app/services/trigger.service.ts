import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {TriggerResponse} from '../models/ResponseModel/triggerResponse';
import {TriggerRequest} from '../models/RequestModel/triggerRequest';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  private apiUrl = 'http://localhost:8080/api/trigger';

  constructor(private http: HttpClient) {
  }

  createTrigger(addictionId: number, trigger: TriggerRequest): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const params = new HttpParams()
      .set('addictionId', addictionId);

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


  fetchTriggers(addictionId:number): Observable<TriggerResponse[]> {
    const params = new HttpParams()
      .set('addictionId', addictionId);

    return this.http.get<TriggerResponse[]>(`${this.apiUrl}/getByAddiction/${addictionId}`, { params }).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  deleteTrigger(triggerName: string): Observable<void> {

    const params = new HttpParams().set('triggerName', triggerName);
    return this.http.delete<void>(`${this.apiUrl}/delete`, { params });
  }

  updateTrigger(triggerId: number, triggerRequest: TriggerRequest): Observable<TriggerResponse> {
    return this.http.put<TriggerResponse>(
      `${this.apiUrl}/update/${triggerId}`,
      triggerRequest,
    ).pipe(
      catchError(error => {
        console.error('Error updating trigger:', error);
        return throwError(() => new Error('Failed to update trigger'));
      })
    );
  }
}
