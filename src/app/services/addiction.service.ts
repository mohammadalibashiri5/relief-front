import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddictionRequest} from '../models/RequestModel/addictionRequest';
import {Observable} from 'rxjs';
import {AddictionResponse} from '../models/ResponseModel/addictionResponse';
import {environment} from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AddictionService{

  private readonly url = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  fetchAddictions(): Observable<AddictionResponse[]> {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get<AddictionResponse[]>(`${this.url}/addictions`, { headers });
  }

  deleteAddiction(name: string): Observable<void> {
   const token = sessionStorage.getItem('token');
   const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`,
   });
    return this.http.delete<void>(`${this.url}/delete/${name}`, {headers: headers});
  }

// Add a new addiction
  addAddiction(addiction: AddictionRequest): Observable<AddictionResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<AddictionResponse>(`${this.url}/add-addiction`, addiction, { headers });
  }

  updateAddiction(id: number, addiction: any) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<AddictionResponse>(`${this.url}/update/${id}`, addiction , { headers });

  }
}
