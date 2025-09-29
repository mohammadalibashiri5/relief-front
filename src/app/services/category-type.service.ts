import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CategoryTypeRequest} from '../models/RequestModel/categoryTypeRequest';
import {Observable} from 'rxjs';
import {CategoryTypeResponse} from '../models/ResponseModel/categoryTypeResponse';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryTypeService {
  private readonly url:string = environment.API_BASE_URL;

  constructor(private readonly http: HttpClient) { }

  createCategoryType(categoryType: CategoryTypeRequest):Observable<CategoryTypeResponse> {
    return this.http.post<CategoryTypeResponse>(`${this.url}/category`, categoryType);
  }

  getCategoryTypes(): Observable<CategoryTypeResponse[]> {
    return this.http.get<CategoryTypeResponse[]>(`${this.url}/category`);
  }

  updateCategoryType(id: number, categoryType: CategoryTypeRequest): Observable<CategoryTypeResponse> {
    return this.http.put<CategoryTypeResponse>(`${this.url}/category/${id}`, categoryType);
  }
  deleteCategoryType(id: number): Observable<void> {
    const params = new HttpParams().set('categoryTypeId', id)
    return this.http.delete<void>(`${this.url}/category`,{ params });
  }
}
