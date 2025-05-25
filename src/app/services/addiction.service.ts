import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
    return this.http.get<AddictionResponse[]>(`${this.url}/addictions`);
  }

  deleteAddiction(name: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${name}`);
  }

// Add a new addiction
  addAddiction(addiction: AddictionRequest): Observable<AddictionResponse> {
    return this.http.post<AddictionResponse>(`${this.url}/add-addiction`, addiction);
  }

  updateAddiction(id: number, addiction: any) {
    return this.http.put<AddictionResponse>(`${this.url}/update/${id}`, addiction);

  }

  getAddictionById(addictionId: number) {
    return this.http.get<AddictionResponse>(`${this.url}/addiction/${addictionId}`);

  }

  getAddictionByName(addictionName: string) {

    const params = new HttpParams()
      .set('addictionName', addictionName);

    return this.http.get<AddictionResponse>(`${this.url}/addiction/${addictionName}`,  { params } );

  }
}
