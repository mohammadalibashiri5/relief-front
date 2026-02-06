import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AddictionRequest} from '../models/RequestModel/addictionRequest';
import {catchError, finalize, Observable, tap, throwError} from 'rxjs';
import {AddictionResponse} from '../models/ResponseModel/addictionResponse';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddictionService {

  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastrService);
  private readonly url = `${environment.API_BASE_URL}/user-addictions`;


  private readonly _addictions = signal<AddictionResponse[]>([]);
  private readonly _loading = signal<boolean>(false);

  public readonly addictions = this._addictions.asReadonly();
  public readonly loading = this._loading.asReadonly();

  public readonly hasAddictions = computed(() => this._addictions().length > 0);

  constructor() {
    this.refreshAddictions();
  }


  addAddiction(addiction: AddictionRequest, addictionName: string): Observable<AddictionResponse> {
    const params = new HttpParams().set('addictionName', addictionName ?? '');
    this._loading.set(true);

    return this.http.post<AddictionResponse>(this.url, addiction, { params }).pipe(
      tap((newAddiction) => {
        // Update state: Append new item to the list
        this._addictions.update(current => [...current, newAddiction]);
        this.toastr.success('Addiction created successfully!');
      }),
      catchError(error => this.handleError(error)),
      finalize(() => this._loading.set(false)) // Ensures loading stops on success OR error
    );
  }

  fetchAddictions(): Observable<AddictionResponse[]> {
    this._loading.set(true);

    return this.http.get<AddictionResponse[]>(this.url).pipe(
      tap(response => {
        // Set state: Replace entire list
        this._addictions.set(response);
      }),
      catchError(error => {
        this.toastr.error('Error fetching addictions');
        this._addictions.set([]); // Reset on error
        return throwError(() => error);
      }),
      finalize(() => this._loading.set(false))
    );
  }

  deleteAddiction(id: number): Observable<void> {
    this._loading.set(true);

    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => {
        // Update state: Filter out the deleted item
        this._addictions.update(current => current.filter(a => a.id !== id));
        this.toastr.success('Addiction deleted successfully');
      }),
      catchError(error => {
        this.toastr.error('Error deleting addiction');
        return throwError(() => error);
      }),
      finalize(() => this._loading.set(false))
    );
  }

  updateAddiction(id: number, addiction: AddictionRequest): Observable<AddictionResponse> {
    this._loading.set(true);

    return this.http.put<AddictionResponse>(`${this.url}/${id}`, addiction).pipe(
      tap((updatedAddiction) => {
        // Update state: Find and replace the specific item
        this._addictions.update(current =>
          current.map(a => a.id === id ? updatedAddiction : a)
        );
        this.toastr.success('Addiction updated successfully');
      }),
      catchError(error => {
        this.toastr.error('Error updating addiction');
        return throwError(() => error);
      }),
      finalize(() => this._loading.set(false))
    );
  }

  // --- GETTERS ---

  /**
   * Helper to find an addiction synchronously from the current signal state
   */
  getAddictionById(addictionId: number): AddictionResponse | undefined {
    return this._addictions().find(a => a.id === addictionId);
  }

  getAddictionByName(addictionName: string): Observable<AddictionResponse> {
    const params = new HttpParams().set('addictionName', addictionName);
    return this.http.get<AddictionResponse>(`${this.url}/by-name`, { params });
  }

  getAddictionByCategoryType(categoryType: string): Observable<AddictionResponse[]> {
    const params = new HttpParams().set('categoryType', categoryType);
    return this.http.get<AddictionResponse[]>(`${this.url}/byCategoryType`, { params });
  }

  refreshAddictions(): void {
    this.fetchAddictions().subscribe();
  }

  // Helper to reduce code duplication in catchError
  private handleError(error: any) {
    return throwError(() => error);
  }
}
