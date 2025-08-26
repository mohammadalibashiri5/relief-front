import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AddictionRequest} from '../models/RequestModel/addictionRequest';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import {AddictionResponse} from '../models/ResponseModel/addictionResponse';
import {environment} from '../../environments/environment';
import {AdminAddictionResponse} from '../models/ResponseModel/adminAddiction';

@Injectable({
  providedIn: 'root'
})
export class AddictionService{

  private readonly url = `${environment.API_BASE_URL}/user-addictions`;

  private readonly addictionSubject: BehaviorSubject<AddictionResponse | null> = new BehaviorSubject<AddictionResponse | null>(null);
  private readonly addictionsSubject: BehaviorSubject<AddictionResponse[] | null> = new BehaviorSubject<AddictionResponse[] | null>(null);


  constructor(private readonly http: HttpClient) {}

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

  addAddiction( addiction: AddictionRequest, addictionName:string): Observable<AddictionResponse> {
    const params = new HttpParams().set('addictionName', addictionName ?? '');
    return this.http.post<AddictionResponse>(this.url, addiction, { params});
  }

  updateAddiction(id: number, addiction: any) {
    return this.http.put<AddictionResponse>(`${this.url}/${id}`, addiction);

  }

  getAddictionById(addictionId: number) {
    return this.http.get<AddictionResponse>(`${this.url}/${addictionId}`);

  }

  getAddictionByName(addictionName: string) {

    const params = new HttpParams()
      .set('addictionName', addictionName);

    return this.http.get<AddictionResponse>(`${this.url}/${addictionName}`,  { params } );

  }

  private clearAddictions() {
    this.addictionsSubject.next(null);
  }

  getAddictionByCategoryType(categoryType: string):Observable<AddictionResponse[]> {
    const params = new HttpParams()
      .set('categoryType', categoryType);
    return this.http.get<AddictionResponse[]>(`${this.url}/byCategoryType`,  { params } );
  }
}
