import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {ArticleResponse} from '../models/ResponseModel/articleResponse';
import {ArticleRequest} from '../models/RequestModel/ArticleRequest';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private readonly url:string = environment.API_BASE_URL;

  constructor(private http:HttpClient) { }

  addArticle(article: ArticleRequest): Observable<ArticleResponse> {
    return this.http.post<ArticleResponse>(`${this.url}/article`, article);
  }

  getArticles(category?: string): Observable<ArticleResponse[]> {
    // If category is provided, add it as a query parameter
    const params = category ? new HttpParams().set('category', category) : new HttpParams();

    return this.http.get<ArticleResponse[]>(`${this.url}/articles`, { params })
      .pipe(
        catchError(error => {
          console.error('Error fetching articles:', error);
          return of([]); // Return empty array on error
        })
      );
  }
}
