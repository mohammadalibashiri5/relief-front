import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {TriggerResponse} from '../models/ResponseModel/triggerResponse';
import {TriggerRequest} from '../models/RequestModel/triggerRequest';
import {environment} from '../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  private apiUrl = `${environment.API_BASE_URL}/trigger`;

  constructor(private http: HttpClient, private toastr:ToastrService) {
  }

  createTrigger(addictionId: number, trigger: TriggerRequest): Observable<any> {

    const params = new HttpParams()
      .set('addictionId', addictionId);


    return this.http.post(`${this.apiUrl}/add`, trigger, {params}).pipe(
      tap(() => {
        this.toastr.success('Trigger created successfully!');
      }),
      catchError(error => {
        this.toastr.error('Error creating trigger:');
        return throwError(() => error);
      })
    );
  }


  fetchTriggers(addictionId:number): Observable<TriggerResponse[]> {
    return this.http.get<TriggerResponse[]>(`${this.apiUrl}/getByAddiction/${addictionId}`).pipe(
      tap(response => {}),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  deleteTrigger(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
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
