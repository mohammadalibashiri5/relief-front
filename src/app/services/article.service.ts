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

  constructor(private readonly http:HttpClient) { }

  addArticle(article: ArticleRequest, category:string): Observable<ArticleResponse> {
    const params = category ? new HttpParams().set('categoryName', category) : new HttpParams();
    return this.http.post<ArticleResponse>(`${this.url}/article`, article, { params });
  }

  getArticlesByCategory(category: string): Observable<ArticleResponse[]> {
    const params:HttpParams = new HttpParams().set('category', category);
    return this.http.get<ArticleResponse[]>(`${this.url}/articlesByCategory`, { params })
      .pipe(
        catchError(error => {
          console.error('Error fetching articles:', error);
          return of([]);
        })
      );
  }
  getAllArticles(): Observable<ArticleResponse[]> {
    return this.http.get<ArticleResponse[]>(`${this.url}/articles`)
      .pipe(
        catchError(error => {
          console.error('Error fetching all articles:', error);
          return of([]);
        })
      );
  }

  getArticleById(id: number) {
    return this.http.get<ArticleResponse>(`${this.url}/article/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching article by ID:', error);
          return of(null);
        })
      );

  }
}
