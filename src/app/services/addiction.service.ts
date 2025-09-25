import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AddictionRequest} from '../models/RequestModel/addictionRequest';
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {AddictionResponse} from '../models/ResponseModel/addictionResponse';
import {environment} from '../../environments/environment';
import {AdminAddictionResponse} from '../models/ResponseModel/adminAddiction';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AddictionService{

  private readonly url = `${environment.API_BASE_URL}/user-addictions`;


  constructor(private readonly http: HttpClient, private readonly toastr:ToastrService) {}

  private readonly addictionsSubject = new BehaviorSubject<AddictionResponse[]>([]);

  public addictions$ = this.addictionsSubject.asObservable();

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  get currentAddictions(): AddictionResponse[] {
    return this.addictionsSubject.getValue();
  }

  addAddiction(addiction: AddictionRequest, addictionName:string): Observable<any> {
    const params = new HttpParams().set('addictionName', addictionName ?? '');
    this.loadingSubject.next(true);
    return this.http.post<AddictionResponse>(this.url, addiction, { params }).pipe(
      tap((newAddiction) => {
        const currentAddictions = this.currentAddictions;
        this.addictionsSubject.next([...currentAddictions, newAddiction]);
        this.toastr.success('Addiction created successfully!');
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        return throwError(()=>error);
      })
    );
  }

  fetchAddictions(): Observable<AddictionResponse[]> {
    this.loadingSubject.next(true);

    return this.http.get<AddictionResponse[]>(this.url).pipe(
      tap(response => {
        this.addictionsSubject.next(response);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.toastr.error('Error fetching addictions');
        this.loadingSubject.next(false);
        this.addictionsSubject.next([]);
        return throwError(() => error);
      })
    );
  }


  deleteAddiction(id: number): Observable<void> {
    this.loadingSubject.next(true);

    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => {
        // Remove the deleted addiction from the BehaviorSubject
        const currentAddictions = this.currentAddictions;
        const updatedAddictions = currentAddictions.filter(a => a.id !== id);
        this.addictionsSubject.next(updatedAddictions);
        this.toastr.success('Addiction deleted successfully');
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.toastr.error('Error deleting addiction');
        this.loadingSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  updateAddiction(id: number, addiction: AddictionRequest): Observable<AddictionResponse> {
    this.loadingSubject.next(true);

    return this.http.put<AddictionResponse>(`${this.url}/${id}`, addiction).pipe(
      tap((updatedAddiction) => {
        // Update the specific addiction in the BehaviorSubject
        const currentAddictions = this.currentAddictions;
        const index = currentAddictions.findIndex(a => a.id === id);
        if (index !== -1) {
          currentAddictions[index] = updatedAddiction;
          this.addictionsSubject.next([...currentAddictions]);
        }
        this.toastr.success('Addiction updated successfully');
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.toastr.error('Error updating addiction');
        this.loadingSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  getAddictionById(addictionId: number): Observable<AddictionResponse | undefined> {
    // Get from local state first, fetch if not found
    return this.addictions$.pipe(
      map(addictions => addictions.find(a => a.id === addictionId))
    );
  }

  getAddictionByName(addictionName: string): Observable<AddictionResponse> {
    const params = new HttpParams().set('addictionName', addictionName);
    return this.http.get<AddictionResponse>(`${this.url}/by-name`, { params });
  }

  getAddictionByCategoryType(categoryType: string): Observable<AddictionResponse[]> {
    const params = new HttpParams().set('categoryType', categoryType);
    return this.http.get<AddictionResponse[]>(`${this.url}/byCategoryType`, { params });
  }

  // Method to refresh addictions from server
  refreshAddictions(): void {
    this.fetchAddictions().subscribe();
  }

  /*

  addAddiction(addiction: AddictionRequest, addictionName:string): Observable<any> {
    const params = new HttpParams().set('addictionName', addictionName ?? '');
    return this.http.post(this.url, addiction, { params}).pipe(
      tap(() => {
        this.toastr.success('Addiction created successfully!');
      }),
      catchError(error => {
        this.toastr.error('Error creating addiction:');
        return of(error);
      })
    );
  }

  fetchAddictions(): Observable<AddictionResponse[]> {
    return this.http.get<AddictionResponse[]>(this.url).pipe(
      tap(response => {}),
      catchError(error => {
        return of([]);

      })
    );
  }

  deleteAddiction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
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

  getAddictionByCategoryType(categoryType: string):Observable<AddictionResponse[]> {
    const params = new HttpParams()
      .set('categoryType', categoryType);
    return this.http.get<AddictionResponse[]>(`${this.url}/byCategoryType`,  { params } );
  }
  */
}
