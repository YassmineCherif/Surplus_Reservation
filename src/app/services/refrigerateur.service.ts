import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Refrigerateur } from '../models/Refrigerateur';

@Injectable({
  providedIn: 'root'
})
export class RefrigerateurService {
  private apiUrl = 'http://localhost:9090/refrigerateurs'; // Backend endpoint
  private usersUrl = 'http://localhost:9090/refrigerateurs/user';


  constructor(private http: HttpClient) {}

  // Get all refrigerateurs
  getRefrigerateurs(): Observable<Refrigerateur[]> {
    return this.http.get<Refrigerateur[]>(this.apiUrl);
  }

  // Get refrigerateur by ID
  getRefrigerateurById(id: number): Observable<Refrigerateur> {
    return this.http.get<Refrigerateur>(`${this.apiUrl}/${id}`);
  }

  // Add a new refrigerateur
  addRefrigerateur(refrigerateur: Refrigerateur): Observable<Refrigerateur> {
    return this.http.post<Refrigerateur>(this.apiUrl, refrigerateur);
  }

  // Update a refrigerateur
  updateRefrigerateur(id: number, refrigerateur: Refrigerateur): Observable<Refrigerateur> {
    return this.http.put<Refrigerateur>(`${this.apiUrl}/${id}`, refrigerateur);
  }

  // Delete a refrigerateur
  deleteRefrigerateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get refrigerateurs by donateur ID (optional, based on your backend method)
  getRefrigerateursByDonateurId(donateurId: number): Observable<Refrigerateur[]> {
    return this.http.get<Refrigerateur[]>(`${this.apiUrl}?donateurId=${donateurId}`);
  }

  
  getUsers(): Observable<string[]> {
    return this.http.get<string[]>(this.usersUrl);
  }

}
