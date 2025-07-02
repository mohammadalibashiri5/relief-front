import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AddictionRequest} from '../models/RequestModel/addictionRequest';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import {AddictionResponse} from '../models/ResponseModel/addictionResponse';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddictionService{

  private readonly url = `${environment.API_BASE_URL}/user/addictions`;

  private addictionSubject: BehaviorSubject<AddictionResponse | null> = new BehaviorSubject<AddictionResponse | null>(null);
  private addictionsSubject: BehaviorSubject<AddictionResponse[] | null> = new BehaviorSubject<AddictionResponse[] | null>(null);


  constructor(private http: HttpClient) {}

  getAddiction(): Observable<AddictionResponse | null> {
    return this.addictionSubject.asObservable();
  }

  fetchAddictions(): Observable<AddictionResponse[] | null> {
    return this.http.get<AddictionResponse[]>(this.url).pipe(tap({
      next:(addictions) => {
        this.addictionsSubject.next(addictions);
      },
      error:()=> {
        this.clearAddictions();
      }
    }),
      catchError(()=> of(null))
    );
  }

  deleteAddiction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  addAddiction(addiction: AddictionRequest): Observable<AddictionResponse> {
    return this.http.post<AddictionResponse>(`${this.url}`, addiction);
  }

  updateAddiction(id: number, addiction: any) {
    return this.http.put<AddictionResponse>(`${this.url}/${id}`, addiction);

  }

  getAddictionById(addictionId: number) {
    return this.http.get<AddictionResponse>(`${this.url}user/addiction/${addictionId}`);

  }

  getAddictionByName(addictionName: string) {

    const params = new HttpParams()
      .set('addictionName', addictionName);

    return this.http.get<AddictionResponse>(`${this.url}user/addictions/${addictionName}`,  { params } );

  }

  private clearAddictions() {
    this.addictionsSubject.next(null);
  }
}
