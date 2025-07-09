import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {CategoryType} from '../models/enum/CategoryType';
import {HttpClient} from '@angular/common/http';
import {CategoryTypeRequest} from '../models/RequestModel/categoryTypeRequest';
import {Observable} from 'rxjs';
import {CategoryTypeResponse} from '../models/ResponseModel/categoryTypeResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryTypeService {
  private readonly url:string = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  createCategoryType(categoryType: CategoryTypeRequest):Observable<CategoryTypeResponse> {
    return this.http.post<CategoryTypeResponse>(`${this.url}/category`, categoryType);
  }

  getCategoryTypes(): Observable<CategoryTypeResponse[]> {
    return this.http.get<CategoryTypeResponse[]>(`${this.url}/category`);
  }
}
