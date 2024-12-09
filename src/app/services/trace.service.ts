
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trace } from '../models/trace';

@Injectable({
  providedIn: 'root'
})
export class TraceService {
  private apiUrl = 'http://localhost:9090/traces';
  private clientUrl = 'http://localhost:9090/traces/import';


  constructor(private http: HttpClient) {}

  getTraces(): Observable<Trace[]> {
    return this.http.get<Trace[]>(this.apiUrl);
  }


  createTraces(traces: Trace[]): Observable<void> {
    return this.http.post<void>(this.clientUrl, traces, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /** 

  getTraceById(id: number): Observable<Trace> {
    return this.http.get<Trace>(`${this.apiUrl}/${id}`);
  }

  updateTrace(id: number, trace: Trace): Observable<Trace> {
    return this.http.put<Trace>(`${this.apiUrl}/${id}`, trace);
  }

  */

  deleteTrace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
}
