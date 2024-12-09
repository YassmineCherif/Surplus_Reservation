import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Surplus } from '../models/Surplus';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SurplusService {
  private apiUrl = 'http://localhost:9090/surplus';
  private usersUrl = 'http://localhost:9090/surplus/user';


  constructor(private http: HttpClient, private authService: AuthService) { }

  getSurpluses(): Observable<Surplus[]> {
    return this.http.get<Surplus[]>(this.apiUrl);
  }

  getSurplusesByUserId(userId: number): Observable<Surplus[]> {
    const url = `${this.apiUrl}/specificID`; // Use the endpoint you defined
    return this.http.get<Surplus[]>(url, { params: { userId: userId.toString() } });
  }

  

  getSurplusById(id: number): Observable<Surplus> {
    return this.http.get<Surplus>(`${this.apiUrl}/${id}`);
  }
  

  // Create a new surplus, including the logged-in user's login
  createSurplus(surplus: Surplus): Observable<Surplus> {
    const userLogin = this.authService.getCurrentUserLogin();
    
    if (!userLogin) {
      // Handle case when no user is logged in (add error handling or fallback)
      throw new Error('User not logged in.');
    }

    // Ensure the surplus object includes the logged-in user's login
    surplus.donateur = { login: userLogin }; // Don't fallback to an empty string
    
    return this.http.post<Surplus>(this.apiUrl, surplus);
  }



  updateSurplus(id: number, surplus: Surplus): Observable<Surplus> {
    return this.http.put<Surplus>(`${this.apiUrl}/${id}`, surplus);
  }

  deleteSurplus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



  getUsers(): Observable<string[]> {
    return this.http.get<string[]>(this.usersUrl);
  }

  
  getSurplusTitle(surplusId: number): Observable<Surplus> {
    return this.http.get<Surplus>(`${this.apiUrl}/surplus/${surplusId}`);
  }
  





}
