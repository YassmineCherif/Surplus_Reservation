import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NumSerie } from '../models/numSerie';

@Injectable({
  providedIn: 'root'
})
export class NumSerieService {
  private apiUrl = 'http://localhost:9090/numseries';
  private usersUrl = 'http://localhost:9090/operations/user';

  constructor(private http: HttpClient) { }

  getNumSeries(): Observable<NumSerie[]> {
    return this.http.get<NumSerie[]>(this.apiUrl).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error.message || 'An error occurred while fetching the serial numbers.'));
      })
    );
  }

  getNumSerieById(id: number): Observable<NumSerie> {
    return this.http.get<NumSerie>(`${this.apiUrl}/${id}`);
  }

  createNumSerie(numSerie: NumSerie): Observable<NumSerie> {
    return this.http.post<NumSerie>(this.apiUrl, numSerie).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error.message || 'The serial number already exists.'));
      })
    );
  }

  updateNumSerie(id: number, numSerie: NumSerie): Observable<NumSerie> {
    return this.http.put<NumSerie>(`${this.apiUrl}/${id}`, numSerie);
  }

  deleteNumSerie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUsers(): Observable<string[]> {
    return this.http.get<string[]>(this.usersUrl);
  }
}
