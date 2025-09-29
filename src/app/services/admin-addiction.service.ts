import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdminAddictionResponse} from '../models/ResponseModel/adminAddiction';
import {AdminAddictionRequest} from '../models/RequestModel/AdminAddictionRequest';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAddictionService {
  private readonly url: string = environment.API_BASE_URL;

  constructor(private readonly http: HttpClient) {
  }

  createAddiction(
    addiction: AdminAddictionRequest,
    categoryTypeName: string
  ): Observable<AdminAddictionResponse> {
    // Create HttpParams to add the categoryTypeName as a query parameter
    const params = new HttpParams().set('categoryType', categoryTypeName);

    return this.http.post<AdminAddictionResponse>(
      `${this.url}/admin/addiction`,
      addiction,
      {params}
    );
  }

  getAllAddictions(): Observable<any> {
    return this.http.get(`${this.url}/admin/addiction`);

  }

  updateAddiction(currentAddictionId: number, addiction: AdminAddictionRequest): Observable<any> {
    const params = new HttpParams().set('addictionId', currentAddictionId);

    return this.http.put<AdminAddictionResponse>(`${this.url}/admin/addiction`, addiction, {params});

  }

  deleteAddiction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/addiction/${id}`);
  }
}
