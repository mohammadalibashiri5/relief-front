import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AdminAddictionResponse} from '../models/ResponseModel/adminAddiction';
import {AdminAddictionRequest} from '../models/RequestModel/AdminAddictionRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminAddictionService {
  private readonly url:string = environment.API_BASE_URL;

  constructor(private http:HttpClient) { }

  createAddiction(
    addiction: AdminAddictionRequest,
    categoryTypeName: string
  ): Observable<AdminAddictionResponse> {
    // Create HttpParams to add the categoryTypeName as a query parameter
    const params = new HttpParams().set('categoryType', categoryTypeName);

    return this.http.post<AdminAddictionResponse>(
      `${this.url}/admin/addiction`,
      addiction,
      { params }
    );
  }

  getAllAddictions():Observable<any> {
    return this.http.get(`${this.url}/admin/addiction`);

  }

  updateAddiction(currentAddictionId: number, requestDto: {name: any; description: any; imageUrl: any}, categoryTypeName: string): Observable<any> {
    return this.http.put(`${this.url}/admin/addiction/${currentAddictionId}`, requestDto);

  }

  deleteAddiction(id: string): Observable<any>{ {
    return this.http.delete(`${this.url}/admin/addiction/${id}`);
  }

  }
}
