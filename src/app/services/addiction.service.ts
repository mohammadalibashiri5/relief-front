import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddictionRequest} from '../models/RequestModel/addictionRequest';
import {BehaviorSubject, catchError, Observable, of, pipe, tap, throwError} from 'rxjs';
import {AddictionResponse} from '../models/ResponseModel/addictionResponse';

@Injectable({
  providedIn: 'root'
})
export class AddictionService {

  private readonly url = "http://localhost:8080";
  private addictionsSubject = new BehaviorSubject<AddictionResponse[]>([]);

  constructor(private http: HttpClient) {}

// Get addictions as an observable
  getAddictions(): Observable<AddictionResponse[]> {
    return this.addictionsSubject.asObservable();
  }

// Fetch addictions from the server
  fetchAddictions(): Observable<AddictionResponse[]> {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    })
    return this.http.get<AddictionResponse[]>(`${this.url}/addictions`, {headers}).pipe(
      tap((addictions) => {
        this.addictionsSubject.next(addictions);
      }),
      catchError((err) => {
        console.error('Failed to fetch addictions:', err);
        return throwError(() => err); // Re-throw for components to handle
      })
    );
  }

// Manually set addictions (if needed)
  setAddictions(addictions: AddictionResponse[]): void {
    this.addictionsSubject.next(addictions);
  }

// Clear addictions
  clearAddictions(): void {
    this.addictionsSubject.next([]);
  }

// Delete an addiction
  deleteAddiction(name: string): Observable<void> {
   const token = sessionStorage.getItem('token');
   const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`,
   });
    return this.http.delete<void>(`${this.url}/delete/${name}`, {headers: headers}).pipe(
      tap(() => {
        const currentAddictions = this.addictionsSubject.getValue();
        const updatedAddictions = currentAddictions.filter(a => a.name !== name);
        this.addictionsSubject.next(updatedAddictions);
      }),
      catchError((err) => {
        console.error('Failed to delete addiction:', err);
        return throwError(() => err); // Let the component handle the error
      })
    );
  }

// Add a new addiction
  addAddiction(addiction: AddictionRequest): Observable<AddictionResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<AddictionResponse>(`${this.url}/add-addiction`, addiction, { headers }).pipe(
      tap((newAddiction) => {
        const currentAddictions = this.addictionsSubject.getValue();
        this.addictionsSubject.next([...currentAddictions, newAddiction]);
      }),
      catchError((err) => {
        console.error('Failed to add addiction:', err);
        return throwError(() => err); // Let the component handle the error
      })
    );
  }

  updateAddiction(id: number, addiction: any) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<AddictionResponse>(`${this.url}/update/${id}`, addiction , { headers });

  }
}
