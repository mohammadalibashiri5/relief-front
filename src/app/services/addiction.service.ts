import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddictionRequest} from '../models/RequestModel/addictionRequest';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddictionService {

  private readonly url = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  addAddiction(addiction:AddictionRequest): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.url}/add-addiction`, addiction, {headers: headers})
  }

}
